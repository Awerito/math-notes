import { ruleById, type Move, type Rule } from "wyrm-math";
import { termAcross } from "./across.ts";
import { factorOut } from "./factor.ts";
import { negateBothSides } from "./negate.ts";
import { reorderTerms } from "./reorder.ts";
import { divideAcross, multiplyAcross } from "./transpose.ts";
import { combineRule, expandRule } from "./workOut.ts";

/** Moves of ours, composed from or added to the engine's */
const OWN_RULES: Rule<never>[] = [
  termAcross,
  reorderTerms,
  divideAcross,
  multiplyAcross,
  combineRule,
  expandRule,
  factorOut,
  negateBothSides,
];

/** The rule a move applies, ours or the engine's */
export const ruleOf = (move: Move) =>
  OWN_RULES.find((rule) => rule.id === move.ruleId) ?? ruleById(move.ruleId);
