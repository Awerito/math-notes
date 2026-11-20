import {
  allNodes,
  cloneFresh,
  findById,
  findParent,
  product,
  sum,
  type Expr,
  type Judgment,
  type NodeId,
  type Rule,
} from "wyrm-math";
import { quotientBy } from "./judge.ts";
import { replace } from "./workOut.ts";

export type FactorParams = {
  /** The letter, power or number to take out, any one of its occurrences in the sum */
  factorId: NodeId;
};

/** A letter, a power of a letter, or a number worth taking out */
const isFactor = (node: Expr) =>
  node.kind === "var" ||
  (node.kind === "pow" &&
    node.base.kind === "var" &&
    node.exp.kind === "int") ||
  (node.kind === "int" && node.value > 1n);

/** Whether `node` is a place where `factor` shows in a term, to mark it */
const shows = (node: Expr, factor: Expr) =>
  (factor.kind === "var" && node.kind === "var" && node.name === factor.name) ||
  (factor.kind === "int" &&
    node.kind === "int" &&
    node.value === factor.value) ||
  // A power comes out of every power of the same letter: x² out of x³ and x⁴
  (factor.kind === "pow" &&
    node.kind === "pow" &&
    node.base.kind === "var" &&
    factor.base.kind === "var" &&
    node.base.name === factor.base.name);

/** The sum with the factor taken out of every term, or undefined when some term lacks it */
function factored(
  { equation }: Judgment,
  location: NodeId,
  { factorId }: FactorParams,
): Expr | undefined {
  const whole = findById(equation, location);
  const factor = findById(equation, factorId);
  if (whole?.kind !== "sum" || !factor || factor.kind === "equation") {
    return undefined;
  }
  if (!isFactor(factor)) return undefined;
  const rest: Expr[] = [];
  for (const term of whole.children) {
    const left = quotientBy(term, factor);
    if (!left) return undefined;
    rest.push(left);
  }
  return product([cloneFresh(factor), sum(rest)]);
}

/**
 * A common factor taken out of a sum, each term keeping its place:
 * 3x + 2x² becomes x(3 + 2x). Compute Engine does the divisions, and a term
 * that does not divide evenly makes the move illegal.
 */
export const factorOut: Rule<FactorParams> = {
  id: "factor-out-of-sum",
  description: "Take a common factor out of every term of a sum.",

  precondition: (judgment, location, params) =>
    !!factored(judgment, location, params),

  apply: (judgment, location, params) => ({
    equation: replace(
      judgment.equation,
      location,
      factored(judgment, location, params)!,
    ),
    emits: [],
    diff: { created: [], removed: [], merged: [], moved: [] },
  }),
};

export type FactorTarget = {
  /** The sum the factor comes out of */
  sum: NodeId;
  factor: NodeId;
  /** Every occurrence of the factor in that sum, to mark them */
  marks: NodeId[];
};

/**
 * What pointing at these nodes (deepest first) would factor: the letter or
 * number under the pointer, out of the nearest sum around it that has it in
 * every term.
 */
export function factorTarget(
  judgment: Judgment,
  ids: NodeId[],
): FactorTarget | undefined {
  const under = ids[0] && findById(judgment.equation, ids[0]);
  if (!under || under.kind === "equation") return undefined;
  const isExponent = (node: Expr) => {
    const parent = findParent(judgment.equation, node.id);
    return parent?.kind === "pow" && parent.exp.id === node.id;
  };
  // Pointing at an exponent means the whole power: the 2 of x² is x²
  const pointed = isExponent(under)
    ? (findParent(judgment.equation, under.id) as Expr)
    : under;
  if (!isFactor(pointed)) return undefined;

  for (const id of ids.slice(1)) {
    const around = findById(judgment.equation, id);
    if (around?.kind !== "sum") continue;
    if (!factored(judgment, id, { factorId: pointed.id })) continue;
    return {
      sum: id,
      factor: pointed.id,
      marks: [...allNodes(around)]
        .filter(
          (node) =>
            node.kind !== "equation" &&
            shows(node, pointed) &&
            !isExponent(node),
        )
        .map((node) => node.id),
    };
  }
  return undefined;
}
