import {
  moveTermAcross,
  sum,
  type Expr,
  type MoveTermAcrossParams,
  type Rule,
} from "wyrm-math";

/** A sum without the zeros a term left behind, or arrived next to: 0 + 3 is 3 */
function withoutZeros(side: Expr): Expr {
  if (side.kind !== "sum") return side;
  const terms = side.children.filter(
    (term) => !(term.kind === "int" && term.value === 0n),
  );
  return terms.length === side.children.length ? side : sum(terms);
}

/**
 * A term taken to the other side with its sign changed: the engine's own move,
 * followed by dropping the zero of a side that was 0, so x − 3 = 0 becomes
 * x = 3 and not x = 0 + 3.
 */
export const termAcross: Rule<MoveTermAcrossParams> = {
  id: "term-across",
  description: "Move a term to the other side, changing its sign.",

  precondition: (judgment, location, params) =>
    moveTermAcross.precondition(judgment, location, params),

  apply(judgment, location, params) {
    const moved = moveTermAcross.apply(judgment, location, params);
    return {
      ...moved,
      equation: {
        ...moved.equation,
        lhs: withoutZeros(moved.equation.lhs),
        rhs: withoutZeros(moved.equation.rhs),
      },
    };
  },
};
