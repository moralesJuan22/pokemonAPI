import Pokedex from "./componentes/Pokedex";

export default function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "'Press Start 2P', monospace",
        color: "#e0f2ff",
        background:
          "linear-gradient(135deg, #0a2342 0%, #19376d 60%, #274690 100%)",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          textAlign: "center",
          margin: "2rem 0 1.5rem 0",
          fontWeight: "bold",
          textShadow: "2px 2px 8px #000a",
        }}
      >
        Pokédex
      </h1>
      <Pokedex />
    </div>
  );
}