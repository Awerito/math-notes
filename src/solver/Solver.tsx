import { useReducer, useState } from "react";
import {
  branchingRuleById,
  checkSolution,
  Derivation,
  describeExpr,
  layoutNode,
  parseEquation,
  Rational,
  ruleById,
  type Assumption,
  type Equation,
  type Expr,
  type Judgment,
} from "wyrm-math";
import { EquationView } from "./EquationView.tsx";
import { EXERCISES } from "./exercises.ts";
import type { CaptionedMove } from "./gestures.ts";
import { useTermDrag } from "./useTermDrag.ts";

/** Pixels per em of the equation being worked on, and of the earlier lines */
const SIZE = 44;
const HISTORY_SIZE = 20;

type Session = {
  derivation: Derivation;
  /** What the student did to reach each derivation node, by node id */
  captions: Map<string, string>;
};

type Menu = { moves: CaptionedMove[]; x: number; y: number };

const startSession = (source: string): Session => ({
  derivation: new Derivation(parseEquation(source)),
  captions: new Map(),
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
  const [menu, setMenu] = useState<Menu | null>(null);
  // The derivation is mutable, so changing it needs an explicit re-render
  const [, refresh] = useReducer((count: number) => count + 1, 0);
  const [rejections, reject] = useReducer((count: number) => count + 1, 0);

  const { derivation, captions } = session;
  const judgment = derivation.current;
  const layout = layoutNode(judgment.equation);
  const path = derivation.path;

  // The arms of the most recent "±" or zero-product split on the way here
  const fork = path.findLast((node) => node.kind === "branch");
  const arms = fork
    ? derivation.childrenOf(fork.parentId!).map((id) => derivation.node(id))
    : [];

  const choose = (next: string) => {
    setSource(next);
    setSession(startSession(next));
    setMenu(null);
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
      const node = derivation.apply(
        ruleById(move.ruleId),
        move.location,
        move.params,
      );
      captions.set(node.id, caption);
    }
    setMenu(null);
    refresh();
  };

  const { handlers, lifted, zones, active } = useTermDrag({
    judgment,
    layout,
    size: SIZE,
    onMove: apply,
    onReject: reject,
    onTap: (moves, at) => setMenu(moves.length > 0 ? { moves, ...at } : null),
  });

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

      <section className="flex flex-col items-center border-[3px] border-ink bg-surface p-6 shadow-hard">
        {path.slice(0, -1).map((node, index) => (
          <div key={node.id} className="flex flex-col items-center text-muted">
            <EquationView
              layout={layoutNode(node.judgment.equation)}
              size={HISTORY_SIZE}
            />
            <p className="text-sm">
              <span className="font-bold text-pink">↓</span>{" "}
              {captions.get(path[index + 1].id)}
            </p>
          </div>
        ))}

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
            : "Drag a term across, or under the other side. Tap for more"}
        </p>

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
            setMenu(null);
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

      {menu && (
        <ul
          className="fixed z-10 border-[3px] border-ink bg-surface shadow-hard"
          style={{ left: menu.x, top: menu.y + 12 }}
        >
          {menu.moves.map((item) => (
            <li key={item.caption}>
              <button
                type="button"
                onClick={() => apply(item)}
                className="block w-full cursor-pointer px-3 py-2 text-left text-sm hover:bg-pink hover:text-bg"
              >
                {item.caption}
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
