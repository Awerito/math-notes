import {
  divideBothSides,
  fraction,
  multiplyBothSides,
  neg,
  product,
  type Equation,
  type Expr,
  type Judgment,
  type Move,
  type NodeId,
  type Rule,
} from "wyrm-math";

/** Something that changes sides as one piece: a factor, or a product with all its factors */
type Piece = { node: Expr; factors: Expr[] };

/**
 * A side read as ± (factors above) / (factors below): −2x/3 is −, [2, x], [3].
 * Every side has this shape, a plain term being one factor above and none below,
 * so one rule moves any factor of any side.
 */
type Shape = {
  negative: boolean;
  above: Expr[];
  below: Expr[];
  /** The products met on the way, each with its factors: the 2x of 2x/3 */
  products: Map<NodeId, Piece>;
};

function shapeOf(side: Expr): Shape {
  let negative = false;
  const products = new Map<NodeId, Piece>();
  const factorsOf = (parts: readonly Expr[]): Expr[] =>
    parts.flatMap((part) => {
      // The minus of a product is the sign of the side: −2x is −, [2, x].
      // The minus of anything else stays with it and travels with it: −3, −x
      if (part.kind === "neg" && part.child.kind === "product") {
        negative = !negative;
        return factorsOf([part.child]);
      }
      if (part.kind !== "product") return [part];
      const factors = factorsOf(part.children);
      products.set(part.id, { node: part, factors });
      return factors;
    });

  // The minus in front of a fraction is the sign of the side too
  const signed = side.kind === "neg" && side.child.kind === "fraction";
  const body = signed ? side.child : side;
  if (signed) negative = true;
  return body.kind === "fraction"
    ? {
        above: factorsOf(body.num),
        below: factorsOf(body.den),
        negative,
        products,
      }
    : { above: factorsOf([body]), below: [], negative, products };
}

function sideOf({ negative, above, below }: Shape): Expr {
  const body = below.length > 0 ? fraction(above, below) : product(above);
  return negative ? neg(body) : body;
}

const isUnit = (expr: Expr) => expr.kind === "int" && expr.value <= 1n;

type Level = "above" | "below";

/** The piece of that id on a level of a side: one of its factors, or a product whose factors are all there */
function pieceOf(shape: Shape, level: Level, id: NodeId): Piece | undefined {
  const factor = shape[level].find((candidate) => candidate.id === id);
  if (factor) return { node: factor, factors: [factor] };
  const whole = shape.products.get(id);
  return whole?.factors.every((part) => shape[level].includes(part))
    ? whole
    : undefined;
}

/**
 * The piece taken from one level of its side to the opposite level of the
 * other side: from above to below is dividing, from below to above multiplying.
 */
function crossed(equation: Equation, id: NodeId, from: Level) {
  const to: Level = from === "above" ? "below" : "above";
  const lhs = shapeOf(equation.lhs);
  const rhs = shapeOf(equation.rhs);
  for (const [own, other, onLeft] of [
    [lhs, rhs, true],
    [rhs, lhs, false],
  ] as const) {
    const piece = pieceOf(own, from, id);
    if (!piece) continue;
    const stays = sideOf({
      ...own,
      [from]: own[from].filter((factor) => !piece.factors.includes(factor)),
    });
    // A side that was 1 becomes the piece itself, not 1·(x − 3)
    const there = other[to].filter(
      (factor) => !(factor.kind === "int" && factor.value === 1n),
    );
    const receives = sideOf({
      ...other,
      // A number goes first, the way a denominator is written: 3/(6x)
      [to]:
        to === "below" && piece.node.kind === "int"
          ? [piece.node, ...there]
          : [...there, piece.node],
    });
    return {
      moved: piece.node,
      equation: onLeft
        ? { ...equation, lhs: stays, rhs: receives }
        : { ...equation, lhs: receives, rhs: stays },
    };
  }
  return undefined;
}

export type TransposeParams = {
  /** The piece that changes sides */
  termId: NodeId;
};

/**
 * "Pass it dividing": a piece above the bar of one side goes below the bar of
 * the other. 2x = 8 becomes x = 8/2, and 3/x = 6 becomes 1/x = 6/3.
 * The engine's division of both sides says what the step assumes (divisor ≠ 0).
 */
export const divideAcross: Rule<TransposeParams> = {
  id: "divide-across",
  description: "Divide both sides by a factor, which leaves its own side.",

  precondition(judgment, location, { termId }) {
    const divisor = crossed(judgment.equation, termId, "above")?.moved;
    return (
      !!divisor &&
      !isUnit(divisor) &&
      divideBothSides.precondition(judgment, location, { divisor })
    );
  },

  apply(judgment, location, { termId }) {
    const { moved: divisor, equation } = crossed(
      judgment.equation,
      termId,
      "above",
    )!;
    return {
      equation,
      emits: divideBothSides.apply(judgment, location, { divisor }).emits,
      diff: { created: [], removed: [], merged: [], moved: [] },
    };
  },
};

/**
 * "Pass it multiplying": a piece below the bar of one side goes above the bar
 * of the other. 3/x = 6 becomes 3 = 6x.
 * The engine's multiplication of both sides says what the step has to check.
 */
export const multiplyAcross: Rule<TransposeParams> = {
  id: "multiply-across",
  description:
    "Multiply both sides by a denominator, which leaves its own side.",

  precondition(judgment, location, { termId }) {
    const factor = crossed(judgment.equation, termId, "below")?.moved;
    return (
      !!factor &&
      !isUnit(factor) &&
      multiplyBothSides.precondition(judgment, location, { factor })
    );
  },

  apply(judgment, location, { termId }) {
    const { moved: factor, equation } = crossed(
      judgment.equation,
      termId,
      "below",
    )!;
    return {
      equation,
      emits: multiplyBothSides.apply(judgment, location, { factor }).emits,
      diff: { created: [], removed: [], merged: [], moved: [] },
    };
  },
};

/** Every piece of both sides that can change sides, with the move that takes it */
export function transposeMoves(judgment: Judgment): Move[] {
  const { equation } = judgment;
  return [
    [equation.lhs, equation.rhs],
    [equation.rhs, equation.lhs],
  ].flatMap(([side, other]) => {
    const shape = shapeOf(side);
    const ids = [
      ...shape.above,
      ...shape.below,
      ...[...shape.products.values()].map((whole) => whole.node),
    ].map((piece) => piece.id);
    return [divideAcross, multiplyAcross].flatMap((rule) =>
      ids
        .map((id) => ({
          ruleId: rule.id,
          location: equation.id,
          params: { termId: id },
          handle: id,
          dropTarget: other.id,
        }))
        .filter((move) =>
          rule.precondition(judgment, move.location, move.params),
        ),
    );
  });
}
