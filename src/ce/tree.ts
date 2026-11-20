/**
 * The equation as the student wrote it: a tree that changes only when a move
 * changes it. Leaves are numbers (never negative, a minus is a Negate node)
 * and symbols; every node has an id of its own to grab it by.
 */
export type Node = {
  id: string;
  /** "Number", "Symbol", or the MathJSON operator: Equal, Add, Multiply, Negate, Divide, Power, Sqrt… */
  head: string;
  args: Node[];
  leaf?: number | string;
};

/** MathJSON as the engine reads and writes it */
export type Json = number | string | { num?: string; sym?: string } | Json[];

let count = 0;

export const node = (head: string, args: Node[]): Node => ({
  id: `n${++count}`,
  head,
  args,
});

export const number = (value: number): Node =>
  value < 0
    ? node("Negate", [number(-value)])
    : { ...node("Number", []), leaf: value };

export const symbol = (name: string): Node => ({
  ...node("Symbol", []),
  leaf: name,
});

/** Add and Multiply hold all their operands directly, never a nested one of the same kind */
const flat = (head: string, args: Node[]): Node =>
  node(
    head,
    args.flatMap((arg) => (arg.head === head ? arg.args : [arg])),
  );

export function fromJson(json: Json): Node {
  if (typeof json === "number") return number(json);
  if (typeof json === "string") return symbol(json);
  if (!Array.isArray(json)) {
    return json.num !== undefined
      ? number(Number(json.num))
      : symbol(json.sym ?? "?");
  }

  const [head, ...rest] = json as [string, ...Json[]];
  const args = rest.map(fromJson);
  // Parentheses are not kept: the printer puts them back where they are needed
  if (head === "Delimiter") return args[0];
  if (head === "InvisibleOperator" || head === "Multiply") {
    // −6·x is written −(6x), so a sum prints it as "− 6x"
    const [first, ...others] = args;
    return first.head === "Negate"
      ? node("Negate", [flat("Multiply", [first.args[0], ...others])])
      : flat("Multiply", args);
  }
  if (head === "Add") return flat("Add", args);
  if (head === "Subtract")
    return flat("Add", [args[0], node("Negate", [args[1]])]);
  if (head === "Rational") return node("Divide", args);
  return node(head, args);
}

export const toJson = (tree: Node): Json =>
  tree.leaf !== undefined ? tree.leaf : [tree.head, ...tree.args.map(toJson)];

export function* allNodes(tree: Node): Generator<Node> {
  yield tree;
  for (const arg of tree.args) yield* allNodes(arg);
}

export const findNode = (tree: Node, id: string) =>
  [...allNodes(tree)].find((candidate) => candidate.id === id);

export const parentOf = (tree: Node, id: string) =>
  [...allNodes(tree)].find((candidate) =>
    candidate.args.some((arg) => arg.id === id),
  );

/** A copy of the tree with one node swapped for another; the rest keeps its ids */
export const replaceNode = (tree: Node, id: string, replacement: Node): Node =>
  tree.id === id
    ? replacement
    : {
        ...tree,
        args: tree.args.map((arg) => replaceNode(arg, id, replacement)),
      };

/** Two trees that say the same up to the order of terms and factors */
export function sameShape(a: Node, b: Node): boolean {
  const key = (tree: Node): string => {
    if (tree.leaf !== undefined) return String(tree.leaf);
    const parts = tree.args.map(key);
    if (tree.head === "Add" || tree.head === "Multiply") parts.sort();
    return `${tree.head}(${parts.join(",")})`;
  };
  return key(a) === key(b);
}

const isLeaf = (tree: Node) => tree.leaf !== undefined;

/** The first leaf of the expression as printed, to know when a product needs a dot */
const firstLeaf = (tree: Node): Node =>
  isLeaf(tree) ? tree : firstLeaf(tree.args[0]);

/**
 * The tree as LaTeX. With `tagged`, each node is wrapped in \htmlId so the
 * renderer gives it an element of its own, carrying the node id.
 */
export function toLatex(tree: Node, tagged: boolean): string {
  // `binary` is set for a negated term that follows another: its minus is spaced as an operator
  const print = (current: Node, binary = false): string => {
    const wrap = (latex: string) =>
      tagged ? `\\htmlId{${current.id}}{${latex}}` : latex;
    // The minus gets a class of its own so it can be hidden while its term is dragged
    const minus = tagged ? `\\htmlClass{minus}{-}` : "-";
    const parens = (child: Node, needed: boolean) =>
      needed ? `\\left(${print(child)}\\right)` : print(child);
    const [first, second] = current.args;

    switch (current.head) {
      case "Number":
      case "Symbol":
        return wrap(String(current.leaf));
      case "Equal":
        return wrap(`${print(first)}=${print(second)}`);
      case "Add":
        return wrap(
          current.args
            .map((term, index) =>
              index === 0
                ? print(term)
                : term.head === "Negate"
                  ? print(term, true)
                  : `+${print(term)}`,
            )
            .join(""),
        );
      case "Negate":
        return wrap(
          (binary ? `{}\\mathbin{${minus}}` : minus) +
            parens(first, first.head === "Add"),
        );
      case "Multiply":
        return wrap(
          current.args
            .map((factor, index) => {
              const dot =
                index > 0 && firstLeaf(factor).head === "Number"
                  ? "\\cdot "
                  : "";
              return (
                dot +
                parens(
                  factor,
                  factor.head === "Add" ||
                    (factor.head === "Negate" && index > 0),
                )
              );
            })
            .join(""),
        );
      case "Divide":
        return wrap(`\\frac{${print(first)}}{${print(second)}}`);
      case "Power":
        return wrap(`{${parens(first, !isLeaf(first))}}^{${print(second)}}`);
      case "Sqrt":
        return wrap(`\\sqrt{${print(first)}}`);
      case "Abs":
        return wrap(`\\left|${print(first)}\\right|`);
      default:
        return wrap(
          `\\operatorname{${current.head}}\\left(${current.args.map((arg) => print(arg)).join(",")}\\right)`,
        );
    }
  };
  return print(tree);
}
