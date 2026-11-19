import { Solver } from "./solver/Solver.tsx";

function App() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-16 pb-24">
      <h1 className="mb-12 text-4xl leading-none font-bold">Math notes</h1>

      <h2 className="mb-6 inline-block border-b-4 border-pink pb-1 text-xl font-bold">
        Solver
      </h2>

      <Solver />
    </main>
  );
}

export default App;
