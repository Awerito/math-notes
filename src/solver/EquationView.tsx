import "katex/dist/katex.min.css";
import type { ComponentProps, ReactNode } from "react";
import type { Layout, NodeId, PlacedGlyph } from "wyrm-math";

/** Space around the equation, in em, where drop zones can extend */
export const MARGIN = 1.4;

export type Lifted = {
  /** Every node of the subtree being dragged */
  ids: ReadonlySet<NodeId>;
  /** Drag offset in em */
  dx: number;
  dy: number;
};

type Props = {
  layout: Layout;
  /** Pixels per em */
  size: number;
  lifted?: Lifted;
  /** Overlay drawn under the glyphs, in the same em coordinates */
  children?: ReactNode;
} & Omit<ComponentProps<"svg">, "children">;

const isLetter = (char: string) => /[a-z]/i.test(char);

function Glyph({ glyph, lifted }: { glyph: PlacedGlyph; lifted?: Lifted }) {
  const held = lifted?.ids.has(glyph.owner);
  const dx = held ? lifted!.dx : 0;
  const dy = held ? lifted!.dy : 0;
  // A held glyph follows the pointer exactly; a released one slides to its place
  const transition = held ? "none" : "transform 250ms ease-out";

  if (glyph.kind === "bar") {
    return (
      <rect
        width={glyph.width}
        height={glyph.thickness}
        fill="currentColor"
        style={{
          transform: `translate(${glyph.x + dx}px, ${glyph.y - glyph.thickness / 2 + dy}px)`,
          transition,
        }}
      />
    );
  }

  return (
    <text
      textAnchor="middle"
      fontSize={glyph.scale}
      fontFamily={isLetter(glyph.char) ? "KaTeX_Math" : "KaTeX_Main"}
      fontStyle={isLetter(glyph.char) ? "italic" : "normal"}
      fill="currentColor"
      opacity={held ? 0.6 : 1}
      style={{
        transform: `translate(${glyph.x + glyph.width / 2 + dx}px, ${glyph.baseline + dy}px)`,
        transition,
      }}
    >
      {glyph.char}
    </text>
  );
}

/**
 * Draws an engine layout as SVG. Glyphs are keyed by the node that owns them,
 * and node ids survive rewrites, so a term that changes place slides there.
 */
export function EquationView({
  layout,
  size,
  lifted,
  children,
  ...svgProps
}: Props) {
  const width = layout.width + 2 * MARGIN;
  const height = layout.height + 2 * MARGIN;
  const seen = new Map<NodeId, number>();

  return (
    <svg
      width={width * size}
      height={height * size}
      viewBox={`${-MARGIN} ${-MARGIN} ${width} ${height}`}
      {...svgProps}
    >
      {children}
      {layout.glyphs.map((glyph) => {
        const index = seen.get(glyph.owner) ?? 0;
        seen.set(glyph.owner, index + 1);
        return (
          <Glyph
            key={`${glyph.owner}:${index}`}
            glyph={glyph}
            lifted={lifted}
          />
        );
      })}
    </svg>
  );
}
