import { useReducer, useState } from "react";
import { Derivation, layoutNode, parseEquation, ruleById } from "wyrm-math";
import { EquationView } from "./EquationView.tsx";
import type { CaptionedMove } from "./gestures.ts";
import { useTermDrag } from "./useTermDrag.ts";

/** Pixels per em of the equation being worked on */
const SIZE = 44;

export function Solver() {
  const [derivation] = useState(
    () => new Derivation(parseEquation("2x + 3 = 11")),
  );
  // The derivation is mutable, so applying a move needs an explicit re-render
  const [, refresh] = useReducer((count: number) => count + 1, 0);
  const [rejections, reject] = useReducer((count: number) => count + 1, 0);

  const judgment = derivation.current;
  const layout = layoutNode(judgment.equation);

  const apply = ({ move }: CaptionedMove) => {
    derivation.apply(ruleById(move.ruleId), move.location, move.params);
    refresh();
  };

  const { handlers, lifted, zones, active } = useTermDrag({
    judgment,
    layout,
    size: SIZE,
    onMove: apply,
    onReject: reject,
    onTap: () => {},
  });

  return (
    <section className="flex flex-col items-center border-[3px] border-ink bg-surface p-6 shadow-hard">
      {/* Remounting on each rejection restarts the shake animation */}
      <div
        key={rejections}
        className={rejections > 0 ? "animate-shake" : undefined}
      >
        <EquationView
          layout={layout}
          size={SIZE}
          lifted={lifted}
          className="cursor-grab touch-none select-none"
          {...handlers}
        >
          {zones.map((zone) => (
            <rect
              key={zone.caption}
              {...zone.rect}
              fill={zone === active ? "var(--color-pink)" : "none"}
              fillOpacity={0.18}
              stroke="var(--color-pink)"
              strokeWidth={0.04}
              strokeDasharray="0.16 0.12"
            />
          ))}
        </EquationView>
      </div>

      <p className="h-6 text-sm text-muted">
        {active
          ? active.caption
          : "Drag a term onto the other side, or under it to divide"}
      </p>
    </section>
  );
}
