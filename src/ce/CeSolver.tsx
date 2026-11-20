import "katex/dist/katex.min.css";
import katex from "katex";
import {
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import {
  judgeStep,
  parseEquation,
  solutionsOf,
  textOf,
  unknownOf,
  valueOf,
  workOut,
  type Verdict,
} from "./judge.ts";
import {
  applyToBothSides,
  BOTH_SIDES,
  grabbable,
  movesFrom,
  swapSides,
  type Move,
} from "./moves.ts";
import {
  allNodes,
  findNode,
  parentOf,
  replaceNode,
  toLatex,
  type Node,
} from "./tree.ts";

const EXERCISES = [
  { label: "2x + 3 = 11", latex: "2x + 3 = 11" },
  { label: "3(x + 2) = 12", latex: "3(x + 2) = 12" },
  { label: "x² = 3x", latex: "x^2 = 3x" },
  { label: "√(x + 1) = 3", latex: "\\sqrt{x + 1} = 3" },
  { label: "√(x + 3) = x − 3", latex: "\\sqrt{x + 3} = x - 3" },
];

/** Font size, in px, of the equation being worked on */
const SIZE = 44;
/** Space between a slot's border and the term dropped in it */
const PAD = 0.25 * SIZE;
/** Width a slot reserves for its ghost sign */
const SIGN = 0.9 * SIZE;
/** Distance from a side of the equation to the slot beside or under it */
const GAP = 0.4 * SIZE;
/** Width of the place between two terms where a reordered term is dropped */
const BETWEEN = 0.7 * SIZE;
/** How far a between-terms slot reaches above and below the sum */
const REACH = 0.3 * SIZE;
/** How far to each side of the join between two neighbours a press grabs the piece that holds both */
const JOIN = 0.2 * SIZE;
/** How close to a slot the pointer has to be for a drop to count */
const NEAR = 0.6 * SIZE;
/** Pointer travel below which a press counts as a tap */
const TAP_SLOP = 5;
/** Time, in ms, a press is held still before it grabs the next larger piece */
const HOLD = 450;

type Step = {
  equation: Node;
  /** What the student did to get here, and what it did to the solutions */
  caption?: string;
  verdict?: Verdict;
};

type Rect = { x: number; y: number; width: number; height: number };

type PlacedSlot = {
  /** The piece that goes to this slot: the pressed one, or a larger one around it */
  piece: string;
  move: Move;
  rect: Rect;
  ghost?: { char: string; x: number; y: number };
  bar?: { x: number; y: number; width: number };
};

type Press = {
  /** What the press can grab, smallest first: x, then 3x, then the whole side */
  grabs: string[];
  /** Which of them is grabbed now; holding the press still climbs to the next */
  level: number;
  /** The nodes under the press, deepest first, for a tap */
  under: string[];
  start: { x: number; y: number };
  /** The pointer now, relative to the equation box */
  at: { x: number; y: number };
  dx: number;
  dy: number;
  moved: boolean;
};

const render = (equation: Node, tagged: boolean) =>
  katex.renderToString(toLatex(equation, tagged), {
    trust: true,
    strict: false,
  });

/** How far the point is from the rectangle, 0 when it is inside */
const distance = (rect: Rect, { x, y }: { x: number; y: number }) =>
  Math.hypot(
    Math.max(rect.x - x, 0, x - (rect.x + rect.width)),
    Math.max(rect.y - y, 0, y - (rect.y + rect.height)),
  );

function Notes({ verdict, name }: { verdict?: Verdict; name: string }) {
  if (!verdict) return null;
  return (
    <>
      {verdict.lost.map((solution) => (
        <span key={`lost ${solution}`} className="text-pink">
          {" "}
          · lost {name} = {solution}
        </span>
      ))}
      {verdict.gained.map((solution) => (
        <span key={`gained ${solution}`} className="text-pink">
          {" "}
          · let in {name} = {solution}
        </span>
      ))}
    </>
  );
}

function Result({ steps, name }: { steps: Step[]; name: string }) {
  const [lhs, rhs] = steps.at(-1)!.equation.args;
  const settled =
    lhs.head === "Symbol" &&
    ![...allNodes(rhs)].some((part) => part.head === "Symbol") &&
    !workOut(rhs);
  const original = solutionsOf(steps[0].equation);
  if (!settled || !original) return null;

  const value = valueOf(rhs);
  const verified = original.includes(value);
  const others = original.filter((solution) => solution !== value);

  return (
    <div
      className={`mt-4 w-full border-[3px] p-4 text-center ${
        verified ? "border-green bg-green-bg" : "border-pink"
      }`}
    >
      <span
        className={`inline-block px-3 py-1 text-xs font-bold tracking-widest text-bg uppercase ${
          verified ? "bg-green" : "bg-pink"
        }`}
      >
        {verified ? "Solution" : "Extraneous"}
      </span>
      <p className="mt-2">
        {name} = {value}{" "}
        {verified
          ? "satisfies the original equation"
          : "does not satisfy the original equation"}
      </p>
      {others.map((solution) => (
        <p key={solution} className="mt-1 text-sm text-muted">
          Not covered: {name} = {solution}
        </p>
      ))}
    </div>
  );
}

export function CeSolver() {
  const [source, setSource] = useState(EXERCISES[0]);
  const [steps, setSteps] = useState<Step[]>(() => [
    { equation: parseEquation(EXERCISES[0].latex) },
  ]);
  const [press, setPress] = useState<Press | null>(null);
  const [slots, setSlots] = useState<PlacedSlot[]>([]);
  /** How far the held term was pushed when room was opened for a slot */
  const [drift, setDrift] = useState(0);
  const [hover, setHover] = useState<Rect | null>(null);
  const [rejections, reject] = useReducer((count: number) => count + 1, 0);
  const box = useRef<HTMLDivElement>(null);

  const equation = steps.at(-1)!.equation;
  const name = unknownOf(equation);
  const grabbed = press?.grabs[press.level];
  const held = press?.moved ? grabbed : undefined;
  // The slot nearest the pointer wins, without having to land inside it; when
  // the pointer is inside several, the smallest
  const active = press
    ? slots
        .filter((slot) => distance(slot.rect, press.at) <= NEAR)
        .sort(
          (a, b) =>
            distance(a.rect, press.at) - distance(b.rect, press.at) ||
            a.rect.width * a.rect.height - b.rect.width * b.rect.height,
        )[0]
    : undefined;

  const element = (id: string) =>
    box.current!.querySelector<HTMLElement>(`#${id}`)!;

  const rectOf = (id: string): Rect => {
    const origin = box.current!.getBoundingClientRect();
    const rect = element(id).getBoundingClientRect();
    return {
      x: rect.left - origin.left,
      y: rect.top - origin.top,
      width: rect.width,
      height: rect.height,
    };
  };

  /** The node ids under an event target, deepest first */
  const chainAt = (target: EventTarget): string[] => {
    const ids: string[] = [];
    let current = target instanceof Element ? target.closest("[id]") : null;
    while (
      current &&
      current !== box.current &&
      box.current!.contains(current)
    ) {
      ids.push(current.id);
      current = current.parentElement?.closest("[id]") ?? null;
    }
    return ids;
  };

  /** Everything a press on these ids can grab, smallest first */
  const grabsAt = (ids: string[]) => {
    const grabs = grabbable(equation);
    return ids.filter((id) => {
      if (!grabs.has(id)) return false;
      // A negated term is one object: the 3 of "−3" is never grabbed without its minus
      const parent = parentOf(equation, id);
      return !(parent?.head === "Negate" && grabs.has(parent.id));
    });
  };

  /**
   * What a press at this point grabs, smallest first. A symbol grabs the
   * smallest piece it belongs to, and the join between two neighbours grabs
   * the piece that holds both: between the 2 and the x of "2x" is "2x".
   */
  const piecesAt = (event: PointerEvent): string[] => {
    const pieces = grabsAt(chainAt(event.target));
    const { x } = relative(event);
    let level = 0;
    while (level < pieces.length - 1) {
      const own = rectOf(pieces[level]);
      const neighbours = (parentOf(equation, pieces[level])?.args ?? [])
        .filter((arg) => arg.id !== pieces[level])
        .map((arg) => rectOf(arg.id));
      // A join is an edge another piece is drawn right against, with nothing in between
      const joins = (edge: number, touching: (other: Rect) => number) =>
        Math.abs(x - edge) <= JOIN &&
        neighbours.some((other) => Math.abs(touching(other) - edge) <= 2);
      if (
        !joins(own.x, (other) => other.x + other.width) &&
        !joins(own.x + own.width, (other) => other.x)
      ) {
        break;
      }
      level++;
    }
    return pieces.slice(level);
  };

  const commit = (next: Node, caption: string) =>
    setSteps([
      ...steps,
      { equation: next, caption, verdict: judgeStep(equation, next) },
    ]);

  // A press held still climbs from the piece under it to the larger one that contains it
  const pressing = press !== null && !press.moved;
  const level = press?.level;
  useEffect(() => {
    if (!pressing) return;
    const timer = setTimeout(
      () =>
        setPress((current) =>
          current && !current.moved && current.level < current.grabs.length - 1
            ? { ...current, level: current.level + 1 }
            : current,
        ),
      HOLD,
    );
    return () => clearTimeout(timer);
  }, [pressing, level]);

  // The outline shows what is grabbed, until it is lifted
  useLayoutEffect(() => {
    if (!press) return;
    setHover(pressing && grabbed ? rectOf(grabbed) : null);
    // Measured again only when the grabbed piece changes
  }, [pressing, grabbed]);

  // When a drag starts: open room where the term can land, and place the slots
  useLayoutEffect(() => {
    if (!held || !press) return;
    // Where it is dropped settles what is dragged: the pressed piece, or a
    // larger one around it when that is the one a slot takes. Pressing the 3
    // of "3x" and dropping across the equals sign moves the whole 3x.
    const pieces = press.grabs.slice(press.level);
    // Kept for the cleanup, which can run after the equation box is gone
    const elements = pieces.map(element);
    const sizes = new Map(
      pieces.map((id) => [id, element(id).getBoundingClientRect()]),
    );
    const taken = new Set<string>();
    const offers = pieces.flatMap((piece) =>
      movesFrom(equation, piece)
        .filter(({ slot }) => {
          // One slot per place; the smallest piece that can go there gets it
          const place =
            slot.kind === "gap"
              ? `gap ${slot.sum} ${slot.index}`
              : `${slot.kind} ${slot.side}`;
          if (taken.has(place)) return false;
          taken.add(place);
          return true;
        })
        .map((move) => ({ piece, move })),
    );

    const left = equation.args[0];
    const slotWidthOf = (piece: string) =>
      SIGN + sizes.get(piece)!.width + 2 * PAD;
    // A term landing at the end of the left side needs room next to the equals sign
    const landing = offers.find(
      ({ move: { slot } }) => slot.kind === "end" && slot.side === left.id,
    );
    const room = landing ? slotWidthOf(landing.piece) + GAP : 0;
    const leftElement = element(left.id);
    leftElement.style.paddingRight = `${room}px`;

    setDrift(
      element(held).getBoundingClientRect().left - sizes.get(held)!.left,
    );
    setSlots(
      offers.map(({ piece, move }): PlacedSlot => {
        const { slot } = move;
        const before = sizes.get(piece)!;
        const slotWidth = slotWidthOf(piece);
        if (slot.kind === "gap") {
          const sum = findNode(equation, slot.sum)!;
          const others = sum.args
            .filter((arg) => arg.id !== piece)
            .map((arg) => rectOf(arg.id));
          const end = (rect: Rect) => rect.x + rect.width;
          const whole = rectOf(sum.id);
          const x =
            slot.index === 0
              ? others[0].x - REACH - BETWEEN
              : slot.index === others.length
                ? end(others[slot.index - 1]) + REACH
                : (end(others[slot.index - 1]) +
                    others[slot.index].x -
                    BETWEEN) /
                  2;
          return {
            piece,
            move,
            rect: {
              x,
              y: whole.y - REACH,
              width: BETWEEN,
              height: whole.height + 2 * REACH,
            },
          };
        }

        const side = rectOf(slot.side);
        // The room opened on the left side is not part of what is written there
        const written = side.width - (slot.side === left.id ? room : 0);
        if (slot.kind === "under") {
          const width = Math.max(before.width, written) + 2 * PAD;
          const x = side.x + written / 2 - width / 2;
          const bottom = side.y + side.height;
          return {
            piece,
            move,
            rect: {
              x,
              y: bottom + GAP,
              width,
              height: before.height + 2 * PAD,
            },
            bar: { x, y: bottom + GAP / 2, width },
          };
        }

        const height = Math.max(before.height, side.height) + 2 * PAD;
        const x = side.x + written + GAP;
        const y = side.y + side.height / 2 - height / 2;
        return {
          piece,
          move,
          rect: { x, y, width: slotWidth, height },
          ghost: { char: slot.ghost, x: x + PAD + SIGN / 2, y: y + height / 2 },
        };
      }),
    );

    return () => {
      leftElement.style.paddingRight = "";
      for (const lifted of elements) lifted.removeAttribute("style");
    };
    // The slots are placed once per drag, from the equation as it was drawn
  }, [held]);

  // While dragging: the piece the slot under the pointer takes follows the pointer
  useLayoutEffect(() => {
    if (!held || !press) return;
    const carried = active?.piece ?? held;
    for (const id of press.grabs.slice(press.level)) {
      const style = element(id).style;
      style.position = id === carried ? "relative" : "";
      style.zIndex = id === carried ? "10" : "";
      style.opacity = id === carried ? "0.6" : "";
      style.transform =
        id === carried ? `translate(${press.dx - drift}px, ${press.dy}px)` : "";
    }
    // Over a slot with a ghost "+", a negative term drops its own minus
    for (const minus of box.current!.querySelectorAll<HTMLElement>(".minus")) {
      minus.style.visibility =
        active?.ghost?.char === "+" && element(carried).contains(minus)
          ? "hidden"
          : "";
    }
  });

  const relative = (event: PointerEvent) => {
    const origin = box.current!.getBoundingClientRect();
    return { x: event.clientX - origin.left, y: event.clientY - origin.top };
  };

  const handlers = {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      const under = chainAt(event.target);
      // Capture keeps the drag alive when the pointer leaves the equation
      event.currentTarget.setPointerCapture(event.pointerId);
      setPress({
        grabs: piecesAt(event),
        level: 0,
        under,
        start: { x: event.clientX, y: event.clientY },
        at: relative(event),
        dx: 0,
        dy: 0,
        moved: false,
      });
    },

    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      if (!press) {
        const [id] = piecesAt(event);
        setHover(id ? rectOf(id) : null);
        return;
      }
      const dx = event.clientX - press.start.x;
      const dy = event.clientY - press.start.y;
      setPress({
        ...press,
        at: relative(event),
        dx,
        dy,
        moved: press.moved || Math.hypot(dx, dy) > TAP_SLOP,
      });
    },

    onPointerUp() {
      if (!press) return;
      setPress(null);
      setSlots([]);
      setDrift(0);
      if (!press.moved) {
        // A press held long enough to climb was choosing what to grab, not tapping
        if (press.level > 0) return;
        // A tap works out the smallest expression under it that can be worked out
        for (const id of press.under) {
          const target =
            id === equation.id ? undefined : findNode(equation, id);
          const worked = target && workOut(target);
          if (worked) {
            commit(
              replaceNode(equation, id, worked),
              `Work out ${textOf(target)}`,
            );
            return;
          }
        }
      } else if (active) {
        commit(active.move.result, active.move.caption);
      } else if (grabbed) {
        reject();
      }
    },

    onPointerCancel() {
      setPress(null);
      setSlots([]);
      setDrift(0);
    },

    onPointerLeave() {
      setHover(null);
    },
  };

  const choose = (exercise: (typeof EXERCISES)[number]) => {
    setSource(exercise);
    setSteps([{ equation: parseEquation(exercise.latex) }]);
  };

  return (
    <>
      <nav className="mb-4 flex flex-wrap gap-2">
        {EXERCISES.map((exercise) => (
          <button
            key={exercise.label}
            type="button"
            onClick={() => choose(exercise)}
            className={`cursor-pointer border-2 px-3 py-1 text-sm ${
              exercise === source ? "border-pink" : "border-line text-muted"
            }`}
          >
            {exercise.label}
          </button>
        ))}
      </nav>

      <section className="flex flex-col items-center border-[3px] border-ink bg-surface p-6 shadow-hard">
        {steps.slice(0, -1).map((step, index) => (
          <div key={index} className="flex flex-col items-center text-muted">
            <div
              className="text-xl"
              dangerouslySetInnerHTML={{ __html: render(step.equation, false) }}
            />
            <p className="text-sm">
              <span className="font-bold text-pink">↓</span>{" "}
              {steps[index + 1].caption}
              <Notes verdict={steps[index + 1].verdict} name={name} />
            </p>
          </div>
        ))}

        {/* Remounting on each rejection restarts the shake animation */}
        <div
          key={rejections}
          // Above the rest of the page, so a term dragged out stays visible
          className={`relative z-10 mt-20 mb-28 ${rejections > 0 ? "animate-shake" : ""}`}
        >
          <div
            ref={box}
            // Every node is a box of its own, so its measured size covers fractions and roots.
            // The drawn radical sign lies over what is under the root, so it lets presses through
            className={`relative touch-none select-none [&_[id]]:inline-block [&_svg]:pointer-events-none [&_.hide-tail]:pointer-events-none ${hover ? "cursor-grab" : ""}`}
            style={{ fontSize: SIZE }}
            {...handlers}
          >
            <div dangerouslySetInnerHTML={{ __html: render(equation, true) }} />

            {hover && (
              <div
                className="pointer-events-none absolute border border-ink bg-ink/10"
                style={{
                  left: hover.x,
                  top: hover.y,
                  width: hover.width,
                  height: hover.height,
                }}
              />
            )}

            {slots.map((slot) => (
              <div key={slot.move.caption} className="pointer-events-none">
                <div
                  className={`absolute border-2 border-dashed border-pink ${
                    slot === active ? "bg-pink/20" : ""
                  }`}
                  style={{
                    left: slot.rect.x,
                    top: slot.rect.y,
                    width: slot.rect.width,
                    height: slot.rect.height,
                  }}
                />
                {slot.ghost && (
                  <span
                    className="absolute -translate-x-1/2 -translate-y-1/2 leading-none text-pink"
                    style={{ left: slot.ghost.x, top: slot.ghost.y }}
                  >
                    {slot.ghost.char}
                  </span>
                )}
                {slot.bar && (
                  <div
                    className="absolute h-0.5 bg-pink"
                    style={{
                      left: slot.bar.x,
                      top: slot.bar.y,
                      width: slot.bar.width,
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <p className="h-6 text-sm text-muted">
          {active
            ? active.move.caption
            : "Drag a piece to a slot. Tap an expression to work it out"}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs tracking-widest text-muted uppercase">
            Both sides
          </span>
          {BOTH_SIDES.map((operation) => (
            <button
              key={operation.label}
              type="button"
              onClick={() =>
                commit(
                  applyToBothSides(equation, operation.apply),
                  operation.caption,
                )
              }
              className="cursor-pointer border-2 border-ink px-3 py-1 text-sm"
            >
              {operation.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => commit(swapSides(equation), "Swap the two sides")}
            className="cursor-pointer border-2 border-ink px-3 py-1 text-sm"
          >
            ⇄
          </button>
        </div>

        <Result steps={steps} name={name} />
      </section>

      <div className="mt-6">
        <button
          type="button"
          disabled={steps.length === 1}
          onClick={() => setSteps(steps.slice(0, -1))}
          className="cursor-pointer border-2 border-ink px-3 py-1 text-sm disabled:cursor-default disabled:border-line disabled:text-line"
        >
          Undo
        </button>
      </div>
    </>
  );
}
