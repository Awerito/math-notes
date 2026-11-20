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
  chainAt,
  dropZones,
  grabAt,
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
  /** The piece the press grabbed, if it hit one: the only thing a drag moves */
  handle?: NodeId;
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
  /** A press released without moving: the nodes under it, deepest first */
  onTap: (ids: NodeId[]) => void;
  /** The pointer moved with nothing pressed: the nodes under it, none when it left */
  onPoint: (ids: NodeId[]) => void;
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
  onPoint,
}: Options) {
  const [press, setPress] = useState<Press | null>(null);
  const [hover, setHover] = useState<NodeId>();

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
      const handle = grabAt(judgment, layout, em.x, em.y);
      setPress({
        client: { x: event.clientX, y: event.clientY },
        em,
        handle,
        zones: handle ? dropZones(judgment, layout, handle) : [],
        dx: 0,
        dy: 0,
        moved: false,
      });
    },

    onPointerMove(event: PointerEvent<SVGSVGElement>) {
      if (!press) {
        const em = toEm(event);
        setHover(grabAt(judgment, layout, em.x, em.y));
        onPoint(chainAt(judgment, layout, em.x, em.y));
        return;
      }
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

    onPointerUp() {
      if (!press) return;
      setPress(null);
      if (!press.moved) {
        onTap(chainAt(judgment, layout, press.em.x, press.em.y));
      } else if (press.active) {
        onMove(press.active);
      } else if (press.handle) {
        onReject();
      }
    },

    onPointerCancel() {
      setPress(null);
    },

    onPointerLeave() {
      setHover(undefined);
      onPoint([]);
    },
  };

  const dragging = press !== null && press.moved && !!press.handle;
  const lifted: Lifted | undefined = dragging
    ? {
        ids: new Set(
          [...allNodes(findById(judgment.equation, press.handle!)!)].map(
            (node) => node.id,
          ),
        ),
        dx: press.dx,
        dy: press.dy,
      }
    : undefined;

  return {
    handlers,
    lifted,
    /** Whether the pointer is down on the equation */
    pressing: press !== null,
    /** The node a press would grab right now, while nothing is pressed */
    hover: press ? undefined : hover,
    zones: dragging ? press.zones : [],
    active: dragging ? press.active : undefined,
  };
}
