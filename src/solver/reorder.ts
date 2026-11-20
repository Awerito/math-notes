import {
  sum,
  type Equation,
  type Judgment,
  type Move,
  type NodeId,
  type Rule,
  type Sum,
} from "wyrm-math";

export type ReorderParams = {
  termId: NodeId;
  /** Where the term ends up among the terms of its side */
  index: number;
};

/** The side of the equation that is a sum holding the term */
const sideOf = (equation: Equation, termId: NodeId) =>
  (["lhs", "rhs"] as const).find((side) => {
    const expr = equation[side];
    return (
      expr.kind === "sum" && expr.children.some((child) => child.id === termId)
    );
  });

/**
 * Commutativity of addition as a move: 2x + 3 becomes 3 + 2x.
 * The engine compares sums ignoring order and so has no rule for it.
 * ponytail: only a sum that is a whole side, the engine does not export its
 * helper to replace a node deeper in the tree
 */
export const reorderTerms: Rule<ReorderParams> = {
  id: "reorder-terms",
  description: "Change the order of the terms of a side.",

  precondition(judgment, location, { termId, index }) {
    const side = sideOf(judgment.equation, termId);
    if (location !== judgment.equation.id || !side) return false;
    const terms = (judgment.equation[side] as Sum).children;
    return index >= 0 && index < terms.length && terms[index].id !== termId;
  },

  apply(judgment, _location, { termId, index }) {
    const side = sideOf(judgment.equation, termId)!;
    const original = judgment.equation[side] as Sum;
    const term = original.children.find((child) => child.id === termId)!;
    const terms = original.children.filter((child) => child !== term);
    terms.splice(index, 0, term);
    return {
      equation: {
        ...judgment.equation,
        [side]: { ...sum(terms), id: original.id },
      },
      emits: [],
      diff: { created: [], removed: [], merged: [], moved: [] },
    };
  },
};

/** Every reordering available: each term of a side to each other position */
export function reorderMoves({ equation }: Judgment): Move[] {
  return [equation.lhs, equation.rhs].flatMap((side) =>
    side.kind !== "sum"
      ? []
      : side.children.flatMap((term, current) =>
          side.children
            .map((_, index) => index)
            .filter((index) => index !== current)
            .map((index) => ({
              ruleId: reorderTerms.id,
              location: equation.id,
              params: { termId: term.id, index },
              handle: term.id,
              dropTarget: side.id,
            })),
        ),
  );
}
