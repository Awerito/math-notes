import "katex/dist/katex.min.css";
import type { ComponentProps, ReactNode } from "react";
import type { Layout, NodeId, PlacedGlyph } from "wyrm-math";

/** Space around the equation, in em, where a dragged piece and a preview can extend */
export const MARGIN = 2.2;

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
  /** Space around the equation, in em */
  margin?: number;
  /**
   * The layout whose size the drawing keeps while another one is shown in
   * it: a preview is drawn over the equation it comes from without moving it
   */
  frame?: Layout;
  lifted?: Lifted;
  /** The nodes drawn as a ghost: what a pending move would add or bring */
  ghost?: (owner: NodeId) => boolean;
  /** Overlay drawn under the glyphs, in the same em coordinates */
  children?: ReactNode;
} & Omit<ComponentProps<"svg">, "children">;

const isLetter = (char: string) => /[a-z]/i.test(char);

function Glyph({
  glyph,
  lifted,
  ghost,
}: {
  glyph: PlacedGlyph;
  lifted?: Lifted;
  ghost: boolean;
}) {
  const held = lifted?.ids.has(glyph.owner);
  const dx = held ? lifted!.dx : 0;
  const dy = held ? lifted!.dy : 0;
  // A held glyph follows the pointer exactly; any other slides to its place
  const transition = held ? "none" : "transform 250ms ease-out";
  const fill = ghost ? "var(--color-pink)" : "currentColor";

  if (glyph.kind === "bar") {
    return (
      <rect
        width={glyph.width}
        height={glyph.thickness}
        fill={fill}
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
      fill={fill}
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
  margin = MARGIN,
  frame = layout,
  lifted,
  ghost,
  children,
  ...svgProps
}: Props) {
  const width = frame.width + 2 * margin;
  const height = frame.height + 2 * margin;
  const seen = new Map<NodeId, number>();

  return (
    <svg
      width={width * size}
      height={height * size}
      viewBox={`${-margin} ${-margin} ${width} ${height}`}
      // A dragged term and a preview may leave the box
      overflow="visible"
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
            ghost={ghost?.(glyph.owner) ?? false}
          />
        );
      })}
    </svg>
  );
}
