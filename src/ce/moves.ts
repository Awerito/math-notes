import { textOf } from "./judge.ts";
import {
  allNodes,
  node,
  number,
  parentOf,
  replaceNode,
  type Node,
} from "./tree.ts";

/** Where a dragged node is dropped, in terms of the nodes drawn on screen */
export type Slot =
  /** After the end of a side, behind a ghost sign: "−", "+" or "·" */
  | { kind: "end"; side: string; ghost: string }
  /** Under a side, below a ghost fraction bar */
  | { kind: "under"; side: string }
  /** Between the terms of its own sum, landing at this position */
  | { kind: "gap"; sum: string; index: number };

export type Move = {
  caption: string;
  slot: Slot;
  /** The equation after the move */
  result: Node;
};

const termsOf = (side: Node) => (side.head === "Add" ? side.args : [side]);
const factorsOf = (side: Node) =>
  side.head === "Multiply" ? side.args : [side];
const isZero = (tree: Node) => tree.leaf === 0;
const isOne = (tree: Node) => tree.leaf === 1;

/** A sum of these terms, keeping the id of the sum it comes from */
const sumOf = (terms: Node[], from?: Node): Node =>
  terms.length === 0
    ? number(0)
    : terms.length === 1
      ? terms[0]
      : { ...(from?.head === "Add" ? from : node("Add", [])), args: terms };

const productOf = (factors: Node[], from?: Node): Node =>
  factors.length === 0
    ? number(1)
    : factors.length === 1
      ? factors[0]
      : {
          ...(from?.head === "Multiply" ? from : node("Multiply", [])),
          args: factors,
        };

const without = (list: Node[], id: string) =>
  list.filter((item) => item.id !== id);

/** Every move that starts by grabbing this node */
export function movesFrom(equation: Node, id: string): Move[] {
  const moves: Move[] = [];
  const sides = equation.args;

  sides.forEach((own, index) => {
    const other = sides[1 - index];
    const rebuilt = (newOwn: Node, newOther: Node): Node => ({
      ...equation,
      args: index === 0 ? [newOwn, newOther] : [newOther, newOwn],
    });

    const term = termsOf(own).find((candidate) => candidate.id === id);
    if (term && !isZero(term)) {
      const negative = term.head === "Negate";
      const flipped = negative ? term.args[0] : node("Negate", [term]);
      moves.push({
        caption: `${negative ? "Add" : "Subtract"} ${textOf(negative ? term.args[0] : term)} ${negative ? "to" : "from"} both sides`,
        slot: { kind: "end", side: other.id, ghost: negative ? "+" : "−" },
        result: rebuilt(
          sumOf(without(termsOf(own), id), own),
          sumOf(
            [...(isZero(other) ? [] : termsOf(other)), ...termsOf(flipped)],
            other,
          ),
        ),
      });
    }

    // The side read as ± (factors above) / (factors below): −2x/3 is −, [2, x], [3]
    const negative = own.head === "Negate";
    const unsigned = negative ? own.args[0] : own;
    const top = unsigned.head === "Divide" ? unsigned.args[0] : unsigned;
    const bottom = unsigned.head === "Divide" ? unsigned.args[1] : undefined;
    const above = factorsOf(top);
    const below = bottom ? factorsOf(bottom) : [];
    const sideOf = (newAbove: Node[], newBelow: Node[]): Node => {
      const product = productOf(newAbove, top);
      const quotient =
        newBelow.length === 0
          ? product
          : node("Divide", [product, productOf(newBelow, bottom)]);
      return negative ? node("Negate", [quotient]) : quotient;
    };
    const divide = (divisor: Node, newOwn: Node) => {
      if (isZero(divisor) || isOne(divisor)) return;
      moves.push({
        caption: `Divide both sides by ${textOf(divisor)}`,
        slot: { kind: "under", side: other.id },
        result: rebuilt(newOwn, node("Divide", [other, divisor])),
      });
    };
    const multiply = (factors: Node[], by: Node) =>
      moves.push({
        caption: `Multiply both sides by ${textOf(by)}`,
        slot: { kind: "end", side: other.id, ghost: "·" },
        result: rebuilt(
          sideOf(
            above,
            below.filter((factor) => !factors.includes(factor)),
          ),
          productOf([...factorsOf(other), ...factors], other),
        ),
      });

    // Dividing by the whole side, by everything above the bar, or by one factor of it
    if (own.id === id) divide(own, number(1));
    else if (top.id === id) divide(top, sideOf([], below));
    else {
      const factor = above.find((candidate) => candidate.id === id);
      if (factor) divide(factor, sideOf(without(above, id), below));
    }

    // Multiplying by everything below the bar, or by one factor of it
    if (bottom?.id === id) multiply(below, bottom);
    else {
      const factor = below.find((candidate) => candidate.id === id);
      if (factor) multiply([factor], factor);
    }
  });

  // Terms of a sum and factors of a product change places among themselves
  const sum = parentOf(equation, id);
  if (sum?.head === "Add" || sum?.head === "Multiply") {
    const held = sum.args.find((term) => term.id === id)!;
    const others = without(sum.args, id);
    const current = sum.args.indexOf(held);
    others.concat(held).forEach((_, index) => {
      if (index === current) return;
      const reordered = [...others];
      reordered.splice(index, 0, held);
      moves.push({
        caption:
          index === 0
            ? `Move ${textOf(held)} to the front`
            : `Move ${textOf(held)} after ${textOf(others[index - 1])}`,
        slot: { kind: "gap", sum: sum.id, index },
        result: replaceNode(equation, sum.id, { ...sum, args: reordered }),
      });
    });
  }

  return moves;
}

/** The nodes a press can grab */
export const grabbable = (equation: Node): Set<string> =>
  new Set(
    [...allNodes(equation)]
      .filter((candidate) => movesFrom(equation, candidate.id).length > 0)
      .map((candidate) => candidate.id),
  );

/** The operations applied to the whole of both sides */
export const BOTH_SIDES: {
  label: string;
  caption: string;
  apply: (side: Node) => Node;
}[] = [
  {
    label: "( )²",
    caption: "Square both sides",
    apply: (side) => node("Power", [side, number(2)]),
  },
  {
    label: "√",
    caption: "Take the square root of both sides",
    apply: (side) => node("Sqrt", [side]),
  },
];

export const applyToBothSides = (
  equation: Node,
  apply: (side: Node) => Node,
): Node => ({ ...equation, args: equation.args.map(apply) });

export const swapSides = (equation: Node): Node => ({
  ...equation,
  args: [equation.args[1], equation.args[0]],
});
