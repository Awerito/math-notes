import {
  describeMove,
  enumerateMoves,
  findParent,
  hitTest,
  type Judgment,
  type Layout,
  type LayoutRect,
  type Move,
  type NodeId,
} from "wyrm-math";

export type CaptionedMove = { move: Move; caption: string };
export type DropZone = CaptionedMove & { rect: LayoutRect };

/** How far, in em, a drop zone reaches beyond its target, so small targets are easy to hit */
const REACH = 0.3;
/** Height, in em, of the strip under a target where a drop means "divide" */
const UNDER_STRIP = 1.1;

const caption = (judgment: Judgment, move: Move): CaptionedMove => ({
  move,
  caption: describeMove(judgment, move) ?? move.ruleId,
});

/** The node under the point followed by its ancestors, deepest first */
function chainAt(
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
 * The node a press at this point grabs.
 * ponytail: the deepest draggable node wins, so a product that makes up a whole
 * side ("2x" in "2x = 8") cannot be grabbed as one term, only its factors.
 * A press-and-hold to climb to the parent would lift that limit.
 */
export function grabbableAt(
  judgment: Judgment,
  layout: Layout,
  x: number,
  y: number,
): NodeId | undefined {
  const draggable = new Set(
    enumerateMoves(judgment)
      .filter((move) => move.dropTarget)
      .map((move) => move.handle),
  );
  return chainAt(judgment, layout, x, y).find((id) => draggable.has(id));
}

/**
 * Where the grabbed node can be dropped, and which move each place means.
 * A term can reach the same target by two moves, crossing over or dividing:
 * dropping on the target crosses, dropping under it divides.
 */
export function dropZones(
  judgment: Judgment,
  layout: Layout,
  handle: NodeId,
): DropZone[] {
  const moves = enumerateMoves(judgment).filter(
    (move) => move.handle === handle && move.dropTarget,
  );

  return moves.map((move) => {
    const target = layout.boxes.get(move.dropTarget!)!.rect;
    const on = {
      x: target.x - REACH,
      y: target.y - REACH,
      width: target.width + 2 * REACH,
      height: target.height + 2 * REACH,
    };
    const under = {
      ...on,
      y: target.y + target.height + REACH,
      height: UNDER_STRIP,
    };

    const divides = move.ruleId === "divide-both-sides";
    const shared = moves.some(
      (other) => other !== move && other.dropTarget === move.dropTarget,
    );
    const rect = !divides
      ? on
      : shared
        ? under
        : { ...on, height: on.height + UNDER_STRIP };
    return { ...caption(judgment, move), rect };
  });
}

/** The zone under the point; when zones overlap the smallest one wins */
export function zoneAt(
  zones: DropZone[],
  x: number,
  y: number,
): DropZone | undefined {
  return zones
    .filter(
      ({ rect }) =>
        x >= rect.x &&
        x <= rect.x + rect.width &&
        y >= rect.y &&
        y <= rect.y + rect.height,
    )
    .sort(
      (a, b) => a.rect.width * a.rect.height - b.rect.width * b.rect.height,
    )[0];
}

/** The moves a tap at this point offers: those of the deepest node that has any */
export function tapMovesAt(
  judgment: Judgment,
  layout: Layout,
  x: number,
  y: number,
): CaptionedMove[] {
  const taps = enumerateMoves(judgment).filter((move) => !move.dropTarget);
  for (const id of chainAt(judgment, layout, x, y)) {
    const here = taps.filter((move) => move.handle === id);
    if (here.length > 0) return here.map((move) => caption(judgment, move));
  }
  return [];
}
