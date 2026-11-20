import { ComputeEngine } from "@cortex-js/compute-engine";
import {
  allNodes,
  fromJson,
  sameShape,
  toJson,
  type Json,
  type Node,
} from "./tree.ts";

const ce = new ComputeEngine();

export const parseEquation = (latex: string): Node =>
  fromJson(ce.parse(latex, { form: "raw" }).json as Json);

type Input = Parameters<typeof ce.box>[0];

/** The tree as an expression of the engine */
const box = (tree: Node) => ce.box(toJson(tree) as Input);

/** The expression as plain text, written as it is in the tree, for captions */
export const textOf = (tree: Node): string =>
  ce.box(toJson(tree) as Input, { form: "raw" }).toString();

/** The number an expression stands for, written the way solutions are */
export const valueOf = (tree: Node): string => box(tree).toString();

/** The name of the variable being solved for */
export const unknownOf = (equation: Node) =>
  String([...allNodes(equation)].find((n) => n.head === "Symbol")?.leaf);

/** The solutions of the equation as text, or undefined when the engine cannot solve it */
export function solutionsOf(equation: Node): string[] | undefined {
  try {
    const found = box(equation).solve(unknownOf(equation));
    return Array.isArray(found)
      ? found.map((solution) => String(solution)).sort()
      : undefined;
  } catch {
    return undefined;
  }
}

export type Verdict = { lost: string[]; gained: string[] };

/** What a step did to the solutions: which ones it dropped and which it let in */
export function judgeStep(before: Node, after: Node): Verdict | undefined {
  const was = solutionsOf(before);
  const is = solutionsOf(after);
  if (!was || !is) return undefined;
  return {
    lost: was.filter((solution) => !is.includes(solution)),
    gained: is.filter((solution) => !was.includes(solution)),
  };
}

/**
 * The expression worked out by the engine: simplified, or expanded when there
 * was nothing to simplify. Undefined when neither changes it.
 */
export function workOut(tree: Node): Node | undefined {
  const boxed = box(tree);
  for (const result of [
    boxed.simplify(),
    ce.function("Expand", [boxed]).evaluate(),
  ]) {
    const worked = fromJson(result.json as Json);
    if (!sameShape(worked, tree)) return worked;
  }
  return undefined;
}
