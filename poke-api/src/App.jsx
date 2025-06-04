import Pokedex from "./componentes/Pokedex";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <h1 className="text-5xl font-bold text-center text-white mt-6 mb-4">Pokédex</h1>
      <Pokedex />
    </div>
  );
}