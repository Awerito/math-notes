import { useEffect, useReducer, useState } from "react";
import {
  allNodes,
  applyRule,
  branchingRuleById,
  checkSolution,
  Derivation,
  describeExpr,
  findById,
  layoutNode,
  parseEquation,
  Rational,
  variablesIn,
  type Assumption,
  type Equation,
  type Expr,
  type Judgment,
  type Move,
  type NodeId,
} from "wyrm-math";
import { EquationView } from "./EquationView.tsx";
import { EXERCISES } from "./exercises.ts";
import { factorOut, factorTarget, type FactorTarget } from "./factor.ts";
import { clickMoveAt, operationMoves, type CaptionedMove } from "./gestures.ts";
import { judgeStep, type Verdict } from "./judge.ts";
import { ruleOf } from "./rules.ts";
import { useTermDrag } from "./useTermDrag.ts";

/** Pixels per em of the equation being worked on, and of the earlier lines */
const SIZE = 44;
const HISTORY_SIZE = 20;
/** Time, in ms, the pointer rests on an expression before what a click would do is shown */
const DWELL = 350;

type Session = {
  derivation: Derivation;
  /** What the student did to reach each derivation node, by node id */
  captions: Map<string, string>;
  /** What that step did to the solutions, by node id */
  verdicts: Map<string, Verdict>;
};

/** The equation a move would leave, or undefined when the engine refuses it */
function resultOf(judgment: Judgment, move: Move): Equation | undefined {
  try {
    return applyRule(judgment, ruleOf(move), move.location, move.params)
      .judgment.equation;
  } catch {
    return undefined;
  }
}

const startSession = (source: string): Session => ({
  derivation: new Derivation(parseEquation(source)),
  captions: new Map(),
  verdicts: new Map(),
});

const equationText = (equation: Equation) =>
  `${describeExpr(equation.lhs)} ${equation.relation} ${describeExpr(equation.rhs)}`;

const assumptionText = (assumption: Assumption) => {
  if (assumption.kind === "restriction") {
    return `${describeExpr(assumption.expr)} ≠ ${assumption.value}`;
  }
  if (assumption.kind === "extension") {
    return `check answers in ${equationText(assumption.originalEquation)}`;
  }
  return `${assumption.variable} = ${assumption.value}`;
};

/** The exact value of a fully simplified number: 4, −4 or 3/2 */
function literal(expr: Expr): Rational | undefined {
  if (expr.kind === "int") return Rational.of(expr.value);
  if (expr.kind === "neg") return literal(expr.child)?.neg();
  if (
    expr.kind === "fraction" &&
    expr.num.length === 1 &&
    expr.den.length === 1
  ) {
    const num = literal(expr.num[0]);
    const den = literal(expr.den[0]);
    if (!num || !den) return undefined;
    const value = num.div(den);
    // Rational is always in lowest terms: an unchanged denominator means the
    // written fraction already was, so 3/2 counts and 8/2 does not
    return value.den === den.num ? value : undefined;
  }
  return undefined;
}

/** The answer the equation states, once it reads "variable = number" */
function answer(equation: Equation) {
  if (equation.relation !== "=" || equation.lhs.kind !== "var")
    return undefined;
  const value = literal(equation.rhs);
  return value && { name: equation.lhs.name, value };
}

function Result({ judgment }: { judgment: Judgment }) {
  const found = answer(judgment.equation);
  if (!found) return null;

  const { verdict } = checkSolution(
    judgment,
    new Map([[found.name, found.value]]),
  );
  const excluded = judgment.assumptions.filter(
    (assumption) =>
      assumption.kind === "restriction" && assumption.status === "active",
  );

  return (
    <div
      className={`mt-4 w-full border-[3px] p-4 text-center ${
        verdict === "verified" ? "border-green bg-green-bg" : "border-pink"
      }`}
    >
      <span
        className={`inline-block px-3 py-1 text-xs font-bold tracking-widest text-bg uppercase ${
          verdict === "verified" ? "bg-green" : "bg-pink"
        }`}
      >
        {verdict === "verified" ? "Solution" : "Extraneous"}
      </span>
      <p className="mt-2">
        {found.name} = {String(found.value)}{" "}
        {verdict === "verified"
          ? "satisfies the original equation"
          : "does not satisfy the original equation"}
      </p>
      {excluded.map((assumption) => (
        <p key={assumption.id} className="mt-1 text-sm text-muted">
          Not covered: {assumptionText(assumption).replace("≠", "=")}, a
          division excluded it. Check it separately
        </p>
      ))}
    </div>
  );
}

export function Solver() {
  const [source, setSource] = useState(EXERCISES[0]);
  const [session, setSession] = useState(() => startSession(EXERCISES[0]));
  /** Factor mode: a click takes the letter or number under it out of its sum */
  const [factoring, setFactoring] = useState(false);
  /** The nodes under the pointer, deepest first */
  const [pointed, setPointed] = useState<NodeId[]>([]);
  // The derivation is mutable, so changing it needs an explicit re-render
  const [, refresh] = useReducer((count: number) => count + 1, 0);
  const [rejections, reject] = useReducer((count: number) => count + 1, 0);

  /** The pointed nodes the pointer last rested on, as one string */
  const [rested, setRested] = useState("");

  // F turns factor mode on and off, Escape leaves it
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "f" || event.key === "F") setFactoring((on) => !on);
      if (event.key === "Escape") setFactoring(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const { derivation, captions, verdicts } = session;
  const judgment = derivation.current;
  const layout = layoutNode(judgment.equation);
  const path = derivation.path;
  const [unknown] = variablesIn(judgment.equation);

  // The arms of the most recent "±" or zero-product split on the way here
  const fork = path.findLast((node) => node.kind === "branch");
  const arms = fork
    ? derivation.childrenOf(fork.parentId!).map((id) => derivation.node(id))
    : [];

  const choose = (next: string) => {
    setSource(next);
    setSession(startSession(next));
    setFactoring(false);
  };

  const apply = ({ move, caption }: CaptionedMove) => {
    if (move.branching) {
      const rule = branchingRuleById(move.ruleId);
      for (const node of derivation.applyBranching(
        rule,
        move.location,
        move.params,
      )) {
        captions.set(node.id, caption);
      }
    } else {
      const before = judgment.equation;
      const node = derivation.apply(ruleOf(move), move.location, move.params);
      captions.set(node.id, caption);
      // A split into cases shares the solutions among its arms, so only a
      // single-line step is judged
      const verdict = judgeStep(before, node.judgment.equation);
      if (verdict) verdicts.set(node.id, verdict);
    }
    setFactoring(false);
    refresh();
  };

  /** What a click on these nodes would take out as a common factor, in factor mode */
  const factorAt = (ids: NodeId[]) =>
    factoring ? factorTarget(judgment, ids) : undefined;

  const factorMove = (target: FactorTarget): CaptionedMove => ({
    caption: `Factor out ${describeExpr(findById(judgment.equation, target.factor) as Expr)}`,
    move: {
      ruleId: factorOut.id,
      location: target.sum,
      params: { factorId: target.factor },
      handle: target.sum,
    },
  });

  // What the pointer points at counts as chosen once it has rested there
  const pointedKey = pointed.join(" ");
  useEffect(() => {
    const timer = setTimeout(() => setRested(pointedKey), DWELL);
    return () => clearTimeout(timer);
  }, [pointedKey]);
  const resting = rested === pointedKey ? pointed : [];

  const { handlers, lifted, hover, zones, active, pressing } = useTermDrag({
    judgment,
    layout,
    size: SIZE,
    onMove: apply,
    onReject: reject,
    onPoint: setPointed,
    onTap(ids) {
      const target = factorAt(ids);
      if (target) {
        apply(factorMove(target));
      } else if (factoring) {
        reject();
      } else {
        // A click combines like terms, computes or expands a power, at once
        const click = clickMoveAt(judgment, ids);
        if (click) apply(click);
      }
    },
  });
  // The move about to be made: the one of the zone a dragged piece is near,
  // or the one a click would make, in factor mode at once and otherwise when
  // the pointer rests. Its result is shown in place of the equation, as a
  // ghost, until it is made or abandoned
  const pointedFactor = factorAt(pointed);
  const pending =
    active?.move ??
    (pointedFactor
      ? factorMove(pointedFactor).move
      : !factoring && !pressing && resting.length > 0
        ? clickMoveAt(judgment, resting)?.move
        : undefined);
  const preview = pending && resultOf(judgment, pending);
  const known = new Set(
    [...allNodes(judgment.equation)].map((node) => node.id),
  );
  /** What the pending move adds, and the dragged piece it brings, are drawn as a ghost */
  const isGhost = (id: NodeId) =>
    !known.has(id) || (lifted?.ids.has(id) ?? false);

  const hovered =
    !factoring && !preview && hover && layout.boxes.get(hover)?.rect;
  const operations = operationMoves(judgment);

  return (
    <>
      <nav className="mb-4 flex flex-wrap gap-2">
        {EXERCISES.map((exercise) => (
          <button
            key={exercise}
            type="button"
            onClick={() => choose(exercise)}
            className={`cursor-pointer border-2 px-3 py-1 text-sm ${
              exercise === source ? "border-pink" : "border-line text-muted"
            }`}
          >
            {exercise}
          </button>
        ))}
      </nav>

      <section
        className={`flex flex-col items-center border-[3px] bg-surface p-6 shadow-hard ${
          factoring ? "border-pink" : "border-ink"
        }`}
      >
        {path.slice(0, -1).map((node, index) => (
          <div key={node.id} className="flex flex-col items-center text-muted">
            <EquationView
              layout={layoutNode(node.judgment.equation)}
              size={HISTORY_SIZE}
              margin={0.6}
            />
            <p className="text-sm">
              <span className="font-bold text-pink">↓</span>{" "}
              {captions.get(path[index + 1].id)}
              {verdicts.get(path[index + 1].id)?.lost.map((solution) => (
                <span key={`lost ${solution}`} className="text-pink">
                  {" "}
                  · lost {unknown} = {solution}
                </span>
              ))}
              {verdicts.get(path[index + 1].id)?.gained.map((solution) => (
                <span key={`gained ${solution}`} className="text-pink">
                  {" "}
                  · let in {unknown} = {solution}
                </span>
              ))}
            </p>
          </div>
        ))}

        {/* Remounting on each rejection restarts the shake animation */}
        <div
          key={rejections}
          // Above the rest of the page, so a term dragged out stays visible
          className={`relative z-10 ${rejections > 0 ? "animate-shake" : ""}`}
        >
          <EquationView
            // The preview is drawn in the frame of the equation it comes from,
            // so nothing under the pointer shifts while it is shown
            layout={preview ? layoutNode(preview) : layout}
            frame={layout}
            size={SIZE}
            lifted={preview ? undefined : lifted}
            ghost={preview ? isGhost : undefined}
            className={`touch-none select-none ${
              pointedFactor ? "cursor-pointer" : hovered ? "cursor-grab" : ""
            }`}
            {...handlers}
          >
            {hovered && (
              <rect
                {...hovered}
                fill="var(--color-ink)"
                fillOpacity={0.12}
                stroke="var(--color-ink)"
                strokeWidth={0.03}
              />
            )}
            {/* While dragging, a thin line at each place the piece can go */}
            {!preview &&
              zones.map((zone) => (
                <line
                  key={zone.caption}
                  {...zone.marker}
                  stroke="var(--color-pink)"
                  strokeWidth={0.07}
                  strokeLinecap="round"
                />
              ))}
          </EquationView>
        </div>

        <p className="h-6 text-sm text-muted">
          {active
            ? active.caption
            : factoring
              ? "Factor mode: click a letter or number to take it out. F or Esc to leave"
              : "Drag to move, click to combine or expand, F to factor"}
        </p>

        {/* ponytail: a plain list until the operations get a design of their own */}
        <details className="mt-2 text-center text-sm">
          <summary className="cursor-pointer text-muted">Operations</summary>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {operations.map((operation) => (
              <button
                key={`${operation.move.handle} ${operation.caption}`}
                type="button"
                onClick={() => apply(operation)}
                className="cursor-pointer border-2 border-line px-3 py-1 hover:border-ink"
              >
                {operation.caption}
              </button>
            ))}
          </div>
        </details>

        {arms.length > 0 && (
          <div className="mt-3 flex gap-2">
            {arms.map((arm) => (
              <button
                key={arm.id}
                type="button"
                // ponytail: switching arms lands on the arm's first line, work done
                // further down that arm is reachable only by redoing it
                onClick={() => {
                  derivation.goto(arm.id);
                  refresh();
                }}
                className={`cursor-pointer border-2 px-3 py-1 text-sm ${
                  arm.id === fork!.id ? "border-pink" : "border-line text-muted"
                }`}
              >
                {arm.kind === "branch" ? arm.label : arm.id}
              </button>
            ))}
          </div>
        )}

        <Result judgment={judgment} />
      </section>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          disabled={!derivation.canUndo()}
          onClick={() => {
            derivation.undo();
            setFactoring(false);
            refresh();
          }}
          className="cursor-pointer border-2 border-ink px-3 py-1 text-sm disabled:cursor-default disabled:border-line disabled:text-line"
        >
          Undo
        </button>

        {/* "2 ≠ 0" and other conditions on plain numbers are true by themselves */}
        {judgment.assumptions
          .filter((assumption) => assumption.dischargedBy !== "constant")
          .map((assumption) => (
            <span
              key={assumption.id}
              className={`border-2 px-3 py-1 text-sm ${
                assumption.status === "active"
                  ? "border-ink"
                  : "border-line text-muted line-through"
              }`}
            >
              {assumptionText(assumption)}
            </span>
          ))}
      </div>
    </>
  );
}
