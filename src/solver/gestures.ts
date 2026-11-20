import {
  childrenOf,
  describeExpr,
  describeMove,
  enumerateMoves,
  findById,
  findParent,
  hitTest,
  type Expr,
  type Judgment,
  type Layout,
  type LayoutRect,
  type Move,
  type NodeId,
} from "wyrm-math";
import { termAcross } from "./across.ts";
import { negateMoves } from "./negate.ts";
import { reorderMoves, reorderTerms, type ReorderParams } from "./reorder.ts";
import { divideAcross, multiplyAcross, transposeMoves } from "./transpose.ts";
import { combineMoves, expandMoves } from "./workOut.ts";

export type CaptionedMove = { move: Move; caption: string };
export type DropZone = CaptionedMove & {
  /** Where a drop counts for this zone; it is not drawn */
  rect: LayoutRect;
  /** The thin line that shows the place: where the piece would be inserted */
  marker: { x1: number; y1: number; x2: number; y2: number };
};

/** How far, in em, a drop zone reaches beyond its target, so small targets are easy to hit */
const REACH = 0.3;
/** Space, in em, a zone leaves around the piece that would land in it */
const PAD = 0.25;
/** Distance, in em, from a side of the equation to the marker beside or under it */
const GAP = 0.2;
/** Width, in em, of the place between two terms where a reordered term is dropped */
const BETWEEN = 0.7;
/** How far, in em, to each side of the join between two neighbours a press grabs the piece that holds both */
const JOIN = 0.15;
/** How close, in em, two boxes are when nothing is drawn between them */
const TOUCHING = 0.15;
/**
 * How close, in em, to a place the pointer has to be for a drop to count.
 * Small enough that under a side is not taken for beside it
 */
const NEAR = 0.25;

const isZero = (judgment: Judgment, id: NodeId) => {
  const node = findById(judgment.equation, id);
  return node?.kind === "int" && node.value === 0n;
};

/**
 * Every move made by dragging, and there are three: a term goes to the other
 * side, a factor goes to the other side, a term changes place on its own side.
 * Which terms may cross is the engine's knowledge; which factors may is one
 * general rule of ours; reordering is ours too, the engine has none.
 */
const dragMoves = (judgment: Judgment): Move[] => [
  ...enumerateMoves(judgment)
    .filter(
      (move) =>
        move.ruleId === "move-term-across" &&
        // Taking a zero across changes nothing
        !isZero(judgment, move.handle),
    )
    .map((move) => ({ ...move, ruleId: termAcross.id })),
  ...transposeMoves(judgment),
  ...reorderMoves(judgment),
];

const caption = (judgment: Judgment, move: Move): CaptionedMove => {
  const piece = findById(judgment.equation, move.handle);
  const name = piece && piece.kind !== "equation" ? describeExpr(piece) : "";
  return {
    move,
    caption:
      move.ruleId === divideAcross.id
        ? `Divide both sides by ${name}`
        : move.ruleId === multiplyAcross.id
          ? `Multiply both sides by ${name}`
          : move.ruleId === termAcross.id
            ? // Worded by the engine, whose move it is underneath
              (describeMove(judgment, {
                ...move,
                ruleId: "move-term-across",
              }) ?? move.ruleId)
            : (describeMove(judgment, move) ?? move.ruleId),
  };
};

/** The node under the point followed by its ancestors, deepest first */
export function chainAt(
  judgment: Judgment,
  layout: Layout,
  x: number,
  y: number,
): NodeId[] {
  const chain: NodeId[] = [];
  let id = hitTest(layout, x, y);
  while (id) {
    chain.push(id);
    id = findParent(judgment.equation, id)?.id;
  }
  return chain;
}

/**
 * The piece a press at this point grabs, which is the one that moves.
 * A symbol grabs the smallest piece it belongs to, and the join between two
 * neighbours grabs the piece that holds both: between the 2 and the x of "2x"
 * is "2x".
 */
export function grabAt(
  judgment: Judgment,
  layout: Layout,
  x: number,
  y: number,
): NodeId | undefined {
  const draggable = dragHandles(judgment);
  const pieces = chainAt(judgment, layout, x, y).filter((id) => {
    if (!draggable.has(id)) return false;
    // A negated term is one object: the 3 of "−3" is never grabbed without its minus
    const parent = findParent(judgment.equation, id);
    return !(parent?.kind === "neg" && draggable.has(parent.id));
  });

  let level = 0;
  while (level < pieces.length - 1) {
    const own = layout.boxes.get(pieces[level])!.rect;
    const neighbours = childrenOf(findParent(judgment.equation, pieces[level])!)
      .filter((sibling) => sibling.id !== pieces[level])
      .map((sibling) => layout.boxes.get(sibling.id)!.rect);
    // A join is an edge another piece is drawn right against, with no sign in between
    const joins = (edge: number, facing: (other: LayoutRect) => number) =>
      Math.abs(x - edge) <= JOIN &&
      neighbours.some((other) => Math.abs(facing(other) - edge) <= TOUCHING);
    if (
      !joins(own.x, (other) => other.x + other.width) &&
      !joins(own.x + own.width, (other) => other.x)
    ) {
      break;
    }
    level++;
  }
  return pieces[level];
}

/**
 * Where the grabbed node can be dropped, and which move each place means.
 * Every place is where the piece would be written: at the end of the other
 * side, under it, between the terms of its own side, or on another piece.
 * A zone only marks the place; what the move makes of the equation is shown
 * by previewing its result.
 */
export function dropZones(
  judgment: Judgment,
  layout: Layout,
  handle: NodeId,
): DropZone[] {
  const rectOf = (id: NodeId) => layout.boxes.get(id)!.rect;
  // Only the moves of the piece in the hand: what is grabbed is what moves
  const moves = dragMoves(judgment).filter((move) => move.handle === handle);
  /** The moves that land at the end of the other side */
  const landsBeside = (move: Move) =>
    move.ruleId === termAcross.id || move.ruleId === multiplyAcross.id;

  // The middle of the relation sign: what is left of it is one side, what is right the other
  const sign = layout.glyphs.find(
    (glyph) => glyph.owner === judgment.equation.id,
  )!;
  const relation = sign.x + sign.width / 2;

  return moves.map((move): DropZone => {
    const held = rectOf(handle);
    const heldNode = findById(judgment.equation, handle)!;
    const target = rectOf(move.dropTarget!);
    const bottom = target.y + target.height;

    if (move.ruleId === reorderTerms.id) {
      const { index } = move.params as ReorderParams;
      const side = findById(judgment.equation, move.dropTarget!)!;
      const others = (side.kind === "sum" ? side.children : []).filter(
        (term) => term.id !== handle,
      );
      const rects = others.map((term) => layout.boxes.get(term.id)!.rect);
      const end = (rect: LayoutRect) => rect.x + rect.width;
      const x =
        index === 0
          ? rects[0].x - REACH - BETWEEN
          : index === rects.length
            ? end(rects[index - 1]) + REACH
            : (end(rects[index - 1]) + rects[index].x - BETWEEN) / 2;
      // A place among the terms of a side stays on that side of the relation sign
      const onRight = target.x >= relation;
      const left = onRight ? Math.max(x, relation) : x;
      const right = onRight ? x + BETWEEN : Math.min(x + BETWEEN, relation);
      return {
        move,
        caption:
          index === 0
            ? `Move ${describeExpr(heldNode as Expr)} to the front`
            : `Move ${describeExpr(heldNode as Expr)} after ${describeExpr(others[index - 1])}`,
        rect: {
          x: left,
          y: target.y - REACH,
          width: right - left,
          height: target.height + 2 * REACH,
        },
        marker: {
          x1: (left + right) / 2,
          y1: target.y,
          x2: (left + right) / 2,
          y2: bottom,
        },
      };
    }

    const captioned = caption(judgment, move);

    // At the end of the other side: a line where the piece would be written.
    // The end of the left side is the stretch up to the relation sign
    if (landsBeside(move)) {
      const x = target.x + target.width + GAP;
      const width =
        target.x < relation
          ? relation - target.x - target.width
          : held.width + 2 * PAD;
      return {
        ...captioned,
        rect: {
          x: target.x + target.width,
          y: target.y - PAD,
          width,
          height: target.height + 2 * PAD,
        },
        marker: { x1: x, y1: target.y, x2: x, y2: bottom },
      };
    }

    // Dividing, the one move left: under the other side, where the fraction
    // bar the piece would go below is drawn
    const width = Math.max(held.width, target.width) + 2 * PAD;
    const x = target.x + target.width / 2 - width / 2;
    return {
      ...captioned,
      rect: { x, y: bottom, width, height: held.height + 2 * PAD },
      marker: { x1: x, y1: bottom + GAP, x2: x + width, y2: bottom + GAP },
    };
  });
}

/** How far the point is from the rectangle, 0 when it is inside */
const distance = (rect: LayoutRect, x: number, y: number) =>
  Math.hypot(
    Math.max(rect.x - x, 0, x - (rect.x + rect.width)),
    Math.max(rect.y - y, 0, y - (rect.y + rect.height)),
  );

/**
 * The zone a drop at this point goes to: the nearest one, without having to
 * land inside it. When the point is inside several, the smallest wins.
 */
export function zoneAt(
  zones: DropZone[],
  x: number,
  y: number,
): DropZone | undefined {
  return zones
    .filter(({ rect }) => distance(rect, x, y) <= NEAR)
    .sort(
      (a, b) =>
        distance(a.rect, x, y) - distance(b.rect, x, y) ||
        a.rect.width * a.rect.height - b.rect.width * b.rect.height,
    )[0];
}

/** Every node a press can grab */
export const dragHandles = (judgment: Judgment): Set<NodeId> =>
  new Set(dragMoves(judgment).map((move) => move.handle));

/**
 * What a click does to each expression that reacts to one: like terms are
 * combined, a power of numbers is computed, a power of letters is expanded,
 * (x − 3)² at once and x² into x·x.
 */
export function clickMoves(judgment: Judgment): CaptionedMove[] {
  const ours = [...combineMoves(judgment), ...expandMoves(judgment)];
  const handled = new Set(ours.map(({ move }) => move.handle));
  const engine = enumerateMoves(judgment);
  return [
    ...ours,
    ...engine
      .filter(
        (move) => move.ruleId === "expand-power" && !handled.has(move.handle),
      )
      .map((move) => caption(judgment, move)),
    // Fractions with different denominators are joined by the engine, two at
    // a time: the click is on the sum that holds them
    ...engine
      .filter((move) => move.ruleId === "combine-fractions")
      .map((move) => ({
        ...caption(judgment, move),
        move: {
          ...move,
          handle: findParent(judgment.equation, move.handle)!.id,
        },
      }))
      .filter(({ move }) => !handled.has(move.handle)),
  ];
}

/** What a click on these nodes does: the smallest of them that reacts to one */
export function clickMoveAt(
  judgment: Judgment,
  ids: NodeId[],
): CaptionedMove | undefined {
  const clicks = clickMoves(judgment);
  for (const id of ids) {
    const here = clicks.find(({ move }) => move.handle === id);
    if (here) return here;
  }
  return undefined;
}

/**
 * The operations that are not a gesture on a piece: both sides squared or
 * swapped, a product set to zero factor by factor, the quadratic formula.
 */
export const operationMoves = (judgment: Judgment): CaptionedMove[] => [
  ...enumerateMoves(judgment)
    .filter((move) => !move.dropTarget && move.ruleId !== "expand-power")
    .map((move) => caption(judgment, move)),
  ...negateMoves(judgment),
];
