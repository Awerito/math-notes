import { useState, type PointerEvent } from "react";
import {
  allNodes,
  findById,
  type Judgment,
  type Layout,
  type NodeId,
} from "wyrm-math";
import { MARGIN, type Lifted } from "./EquationView.tsx";
import {
  dropZones,
  grabbableAt,
  tapMovesAt,
  zoneAt,
  type CaptionedMove,
  type DropZone,
} from "./gestures.ts";

/** Pointer travel, in px, below which a press counts as a tap */
const TAP_SLOP = 5;

type Point = { x: number; y: number };

type Press = {
  /** Where the press started: client px, and em inside the equation */
  client: Point;
  em: Point;
  /** The grabbed subtree, empty when the press hit nothing draggable */
  ids: ReadonlySet<NodeId>;
  zones: DropZone[];
  /** Drag offset in em */
  dx: number;
  dy: number;
  moved: boolean;
  active?: DropZone;
};

type Options = {
  judgment: Judgment;
  layout: Layout;
  /** Pixels per em */
  size: number;
  onMove: (move: CaptionedMove) => void;
  onReject: () => void;
  onTap: (moves: CaptionedMove[], client: Point) => void;
};

/**
 * Drag and tap on an equation with Pointer Events, one path for mouse, touch and pen.
 * Spread `handlers` on the EquationView and pass it `lifted`.
 */
export function useTermDrag({
  judgment,
  layout,
  size,
  onMove,
  onReject,
  onTap,
}: Options) {
  const [press, setPress] = useState<Press | null>(null);

  const toEm = (event: PointerEvent<SVGSVGElement>): Point => {
    const box = event.currentTarget.getBoundingClientRect();
    return {
      x: (event.clientX - box.left) / size - MARGIN,
      y: (event.clientY - box.top) / size - MARGIN,
    };
  };

  const handlers = {
    onPointerDown(event: PointerEvent<SVGSVGElement>) {
      // Capture keeps the drag alive when the pointer leaves the equation
      event.currentTarget.setPointerCapture(event.pointerId);
      const em = toEm(event);
      const handle = grabbableAt(judgment, layout, em.x, em.y);
      const subtree = handle
        ? [...allNodes(findById(judgment.equation, handle)!)]
        : [];
      setPress({
        client: { x: event.clientX, y: event.clientY },
        em,
        ids: new Set(subtree.map((node) => node.id)),
        zones: handle ? dropZones(judgment, layout, handle) : [],
        dx: 0,
        dy: 0,
        moved: false,
      });
    },

    onPointerMove(event: PointerEvent<SVGSVGElement>) {
      if (!press) return;
      const dx = event.clientX - press.client.x;
      const dy = event.clientY - press.client.y;
      const moved = press.moved || Math.hypot(dx, dy) > TAP_SLOP;
      const em = toEm(event);
      setPress({
        ...press,
        dx: dx / size,
        dy: dy / size,
        moved,
        active: moved ? zoneAt(press.zones, em.x, em.y) : undefined,
      });
    },

    onPointerUp(event: PointerEvent<SVGSVGElement>) {
      if (!press) return;
      setPress(null);
      if (!press.moved) {
        onTap(tapMovesAt(judgment, layout, press.em.x, press.em.y), {
          x: event.clientX,
          y: event.clientY,
        });
      } else if (press.active) {
        onMove(press.active);
      } else if (press.ids.size > 0) {
        onReject();
      }
    },

    onPointerCancel() {
      setPress(null);
    },
  };

  const dragging = press !== null && press.moved && press.ids.size > 0;
  const lifted: Lifted | undefined = dragging
    ? { ids: press.ids, dx: press.dx, dy: press.dy }
    : undefined;

  return {
    handlers,
    lifted,
    zones: dragging ? press.zones : [],
    active: dragging ? press.active : undefined,
  };
}
