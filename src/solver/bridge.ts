import {
  fraction,
  int,
  neg,
  pow,
  product,
  root,
  sqrt,
  sum,
  variable,
  type Expr,
  type Node,
} from "wyrm-math";

/** MathJSON, the format Compute Engine reads and writes */
export type Json = number | string | { num?: string; sym?: string } | Json[];

const RELATIONS = {
  "=": "Equal",
  "<": "Less",
  "≤": "LessEqual",
  ">": "Greater",
  "≥": "GreaterEqual",
};

/** A list of factors as one MathJSON expression; the empty list is 1 */
const productJson = (factors: readonly Expr[]): Json =>
  factors.length === 0
    ? 1
    : factors.length === 1
      ? toJson(factors[0])
      : ["Multiply", ...factors.map(toJson)];

/** The engine's tree as MathJSON */
export function toJson(node: Node): Json {
  switch (node.kind) {
    case "equation":
      return [RELATIONS[node.relation], toJson(node.lhs), toJson(node.rhs)];
    case "int":
      return { num: String(node.value) };
    case "var":
      return node.name;
    case "sum":
      return ["Add", ...node.children.map(toJson)];
    case "product":
      return ["Multiply", ...node.children.map(toJson)];
    case "neg":
      return ["Negate", toJson(node.child)];
    case "fraction":
      return ["Divide", productJson(node.num), productJson(node.den)];
    case "pow":
      return ["Power", toJson(node.base), toJson(node.exp)];
    case "sqrt":
      return ["Sqrt", toJson(node.child)];
    case "root":
      return ["Root", toJson(node.radicand), Number(node.index)];
  }
}

const factorsOf = (expr: Expr) =>
  expr.kind === "product" ? expr.children : [expr];

const integer = (text: string) =>
  /^-?\d+$/.test(text) ? int(BigInt(text)) : undefined;

/**
 * MathJSON as a tree of the engine, with new ids. Undefined when it holds
 * something the engine has no node for: a decimal, a named function, a constant.
 */
export function fromJson(json: Json): Expr | undefined {
  if (typeof json === "number") return integer(String(json));
  if (typeof json === "string") {
    return /^[a-z]$/i.test(json) ? variable(json) : undefined;
  }
  if (!Array.isArray(json)) {
    return json.num !== undefined
      ? integer(json.num)
      : fromJson(json.sym ?? "");
  }

  const [head, ...rest] = json as [string, ...Json[]];
  const args: Expr[] = [];
  for (const part of rest) {
    const arg = fromJson(part);
    if (!arg) return undefined;
    args.push(arg);
  }
  const [first, second] = args;

  switch (head) {
    case "Add":
      return sum(args);
    case "Subtract":
      return sum([first, neg(second)]);
    case "Multiply":
      // −6·x is written −(6x), the way the engine writes a negative term
      return first.kind === "neg"
        ? neg(product([first.child, ...args.slice(1)]))
        : product(args);
    case "Negate":
      return neg(first);
    case "Divide":
    case "Rational":
      return fraction(factorsOf(first), factorsOf(second));
    case "Power":
      return pow(first, second);
    case "Sqrt":
      return sqrt(first);
    case "Root":
      return second.kind !== "int"
        ? undefined
        : second.value === 2n
          ? sqrt(first)
          : root(second.value, first);
    default:
      return undefined;
  }
}
