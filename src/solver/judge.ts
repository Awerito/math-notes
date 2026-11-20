import { ComputeEngine } from "@cortex-js/compute-engine";
import {
  allNodes,
  cloneFresh,
  eq,
  neg,
  product,
  sum,
  variablesIn,
  type Equation,
  type Expr,
  type Node,
  type Sum,
} from "wyrm-math";
import { fromJson, toJson, type Json } from "./bridge.ts";

const ce = new ComputeEngine();

/** The tree as an expression of Compute Engine */
const box = (node: Node) =>
  ce.box(toJson(node) as Parameters<typeof ce.box>[0]);

/** The solutions of the equation as text, or undefined when they cannot be found */
export function solutionsOf(equation: Equation): string[] | undefined {
  const [unknown] = variablesIn(equation);
  if (!unknown) return undefined;
  try {
    const found = box(equation).solve(unknown);
    return Array.isArray(found)
      ? found.map((solution) => String(solution)).sort()
      : undefined;
  } catch {
    return undefined;
  }
}

export type Verdict = { lost: string[]; gained: string[] };

/** What a step did to the solutions: which ones it dropped and which it let in */
export function judgeStep(
  before: Equation,
  after: Equation,
): Verdict | undefined {
  const was = solutionsOf(before);
  const is = solutionsOf(after);
  if (!was || !is) return undefined;
  return {
    lost: was.filter((solution) => !is.includes(solution)),
    gained: is.filter((solution) => !was.includes(solution)),
  };
}

/** What the engine made of the expression, when that is something else we can draw */
function changed(expr: Expr, json: Json): Expr | undefined {
  const result = fromJson(json);
  return result && !eq(result, expr) ? result : undefined;
}

const size = (expr: Expr) => [...allNodes(expr)].length;
const termsIn = (expr: Expr) =>
  expr.kind === "sum" ? expr.children.length : 1;
const holdsSum = (expr: Expr): boolean =>
  expr.kind === "sum" || (expr.kind === "neg" && holdsSum(expr.child));

/**
 * Like terms put together, which is what a click on an expression does:
 * 2x + 3x is 5x, 11 − 3 is 8, 8/2 is 4, x·x is x², x(3 + 2x)/x is 2x + 3.
 * Undefined when the expression has nothing alike to join. It never
 * distributes: 3(x + 2) stays as it is, opening it is a move of the student's.
 */
export function combine(expr: Expr): Expr | undefined {
  // A number alone, a letter alone, or a minus sign in front of something
  if (expr.kind === "int" || expr.kind === "var" || expr.kind === "neg") {
    return undefined;
  }
  // A power of an expression with letters is expanded, not combined
  if (expr.kind === "pow" && variablesIn(expr).size > 0) {
    return expr.base.kind === "sqrt" ? simplified(expr) : undefined;
  }
  if (expr.kind === "product" && expr.children.some(holdsSum)) return undefined;

  const result = simplified(expr);
  if (!result) return undefined;
  // A sum is combined only when it ends with fewer terms, a fraction only
  // when it ends smaller: otherwise the engine merely rewrote it
  if (expr.kind === "sum" && termsIn(result) >= termsIn(expr)) return undefined;
  // (a fraction of plain numbers always reduces: 3/6 is 1/2, the same size)
  if (
    expr.kind === "fraction" &&
    variablesIn(expr).size > 0 &&
    size(result) >= size(expr)
  ) {
    return undefined;
  }
  return result;
}

const simplified = (expr: Expr) =>
  changed(expr, box(expr).simplify().json as Json);

/**
 * Parentheses opened: a power of a sum, (x − 3)² into x² − 6x + 9, a product
 * that holds a sum, x(3 + 5x) into 3x + 5x², or a sum with a minus in front,
 * −(x − 2) into −x + 2. Undefined for anything else.
 */
export function expand(expr: Expr): Expr | undefined {
  const multipliedOut = () =>
    changed(expr, ce.function("Expand", [box(expr)]).evaluate().json as Json);

  if (expr.kind === "neg") {
    // Every term changes its sign where it stands
    return expr.child.kind === "sum"
      ? sum(expr.child.children.map(neg))
      : undefined;
  }
  if (expr.kind === "pow") {
    return expr.base.kind === "sum" ? multipliedOut() : undefined;
  }
  if (expr.kind !== "product") return undefined;
  const sums = expr.children.filter((factor) => factor.kind === "sum");
  if (sums.length !== 1) return sums.length === 0 ? undefined : multipliedOut();

  // One sum times the rest: each term is multiplied where it stands, so the
  // terms keep the order they were written in
  const [inner] = sums;
  const others = expr.children.filter((factor) => factor !== inner);
  return sum(
    (inner as Sum).children.map((term) => {
      const multiplied = product([...others.map(cloneFresh), term]);
      // Written the usual way, number first: 3x and not x·3
      return fromJson(box(multiplied).simplify().json as Json) ?? multiplied;
    }),
  );
}

/**
 * What is left of a term when a factor is taken out of it: 2x² without its x
 * is 2x. Undefined when the term does not have the factor, which shows as a
 * division left over.
 */
export function quotientBy(term: Expr, factor: Expr): Expr | undefined {
  const quotient = fromJson(
    ce
      .box(["Divide", toJson(term), toJson(factor)] as Parameters<
        typeof ce.box
      >[0])
      .simplify().json as Json,
  );
  const exact =
    quotient &&
    ![...allNodes(quotient)].some(
      (node) =>
        node.kind === "fraction" ||
        (node.kind === "pow" && node.exp.kind === "neg"),
    );
  return exact ? quotient : undefined;
}
