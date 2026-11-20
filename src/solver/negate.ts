import { neg, type Judgment, type Move, type Rule } from "wyrm-math";

/**
 * Both sides multiplied by −1: −x = 8 becomes x = −8. Nothing is assumed and
 * nothing is lost, −1 is never zero. A sum keeps its parentheses, −(x − 2),
 * for the student to open.
 */
export const negateBothSides: Rule<unknown> = {
  id: "negate-both-sides",
  description: "Multiply both sides by −1.",

  precondition: (judgment, location) =>
    location === judgment.equation.id && judgment.equation.relation === "=",

  apply: (judgment) => ({
    equation: {
      ...judgment.equation,
      lhs: neg(judgment.equation.lhs),
      rhs: neg(judgment.equation.rhs),
    },
    emits: [],
    diff: { created: [], removed: [], merged: [], moved: [] },
  }),
};

export const negateMoves = (
  judgment: Judgment,
): { move: Move; caption: string }[] =>
  negateBothSides.precondition(judgment, judgment.equation.id, {})
    ? [
        {
          caption: "Multiply both sides by −1",
          move: {
            ruleId: negateBothSides.id,
            location: judgment.equation.id,
            params: {},
            handle: judgment.equation.id,
          },
        },
      ]
    : [];
