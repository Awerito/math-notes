import {
  allNodes,
  describeExpr,
  findById,
  variablesIn,
  type Expr,
  type Judgment,
  type Move,
  type NodeId,
  type Rule,
} from "wyrm-math";
import { combine, expand } from "./judge.ts";

/** A copy of the tree with the node of that id swapped for another */
export function replace<T>(tree: T, id: NodeId, replacement: Expr): T {
  if (Array.isArray(tree)) {
    return tree.map((item) => replace(item, id, replacement)) as T;
  }
  if (typeof tree !== "object" || tree === null) return tree;
  if ((tree as { id?: NodeId }).id === id) return replacement as T;
  return Object.fromEntries(
    Object.entries(tree).map(([key, value]) => [
      key,
      replace(value, id, replacement),
    ]),
  ) as T;
}

/**
 * A tap that replaces an expression by what Compute Engine makes of it: the
 * rule the derivation applies, and the moves that offer it wherever
 * `rewrite` has something to give.
 */
function rewriting(
  id: string,
  description: string,
  verb: (expr: Expr) => string,
  rewrite: (expr: Expr) => Expr | undefined,
) {
  const at = (judgment: Judgment, location: NodeId) => {
    const node = findById(judgment.equation, location);
    return node && node.kind !== "equation" ? rewrite(node) : undefined;
  };

  const rule: Rule<unknown> = {
    id,
    description,
    precondition: (judgment, location) => !!at(judgment, location),
    apply: (judgment, location) => ({
      equation: replace(judgment.equation, location, at(judgment, location)!),
      emits: [],
      diff: { created: [], removed: [], merged: [], moved: [] },
    }),
  };

  const moves = ({ equation }: Judgment): { move: Move; caption: string }[] =>
    [...allNodes(equation)].flatMap((node) => {
      const result = node.kind === "equation" ? undefined : rewrite(node);
      if (!result) return [];
      return [
        {
          move: { ruleId: id, location: node.id, params: {}, handle: node.id },
          caption: `${verb(node as Expr)} ${describeExpr(node as Expr)}`,
        },
      ];
    });

  return { rule, moves };
}

/** Like terms put together: 2x + 3x, 11 − 3, 8/2, x·x */
export const { rule: combineRule, moves: combineMoves } = rewriting(
  "combine",
  "Put like terms or like factors together.",
  // Plain numbers are computed, anything with a letter is combined
  (expr) => (variablesIn(expr).size > 0 ? "Combine" : "Work out"),
  combine,
);

/** (x − 3)² multiplied out in one step instead of four distributions */
export const { rule: expandRule, moves: expandMoves } = rewriting(
  "expand",
  "Multiply out a power of a sum.",
  () => "Expand",
  expand,
);
