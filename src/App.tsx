import { layoutNode, parseEquation } from "wyrm-math";
import { EquationView } from "./solver/EquationView.tsx";

const SAMPLES = [
  "2x + 3 = 11",
  "3(x + 2) = 12",
  "x^2 = 3x",
  "sqrt(x + 1) = 3",
  "x^2/x = (3x)/x",
  "(sqrt(x + 1))^2 = 3^2 - 1/2",
];

function App() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <h1 className="mb-12 text-4xl leading-none font-bold">Math notes</h1>

      <h2 className="mb-6 inline-block border-b-4 border-pink pb-1 text-xl font-bold">
        Solver
      </h2>

      <section className="flex flex-col items-center border-[3px] border-ink bg-surface p-6 shadow-hard">
        {SAMPLES.map((source) => (
          <EquationView
            key={source}
            layout={layoutNode(parseEquation(source))}
            size={36}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
