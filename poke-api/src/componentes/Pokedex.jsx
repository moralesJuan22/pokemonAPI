import { useEffect, useState } from "react";
import PokemonDetalle from "./PokemonDetalle";
import Buscador from "./Buscador";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => res.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const filtered = pokemons.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        fontFamily: "'Press Start 2P', monospace",
        color: "#e0f2ff",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: 32,
        }}
      >
        <Buscador value={search} onChange={setSearch} />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 28,
          padding: "0 12px",
        }}
      >
        {filtered.length === 0 && (
          <div
            style={{
              gridColumn: "1/-1",
              textAlign: "center",
              color: "#e0f2ff",
              fontSize: 18,
            }}
          >
            No se encontró ningún Pokémon.
          </div>
        )}
        {filtered.map((pokemon) => (
          <div
            key={pokemon.name}
            style={{
              background: "linear-gradient(135deg, #19376d 60%, #0a2342 100%)",
              borderRadius: 18,
              boxShadow: "0 4px 24px 0 rgba(0,0,0,0.25)",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              border: "2px solid #274690",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onClick={() => setSelected(pokemon.name)}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0,0,0,0.35)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 24px 0 rgba(0,0,0,0.25)";
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemons.findIndex((p) => p.name === pokemon.name) + 1
              }.png`}
              alt={pokemon.name}
              style={{
                width: 70,
                height: 70,
                filter: "drop-shadow(0 2px 8px #0008)",
              }}
            />
            <span
              style={{
                textTransform: "capitalize",
                fontWeight: "bold",
                color: "#e0f2ff",
                fontSize: 15,
                marginTop: 12,
                textShadow: "2px 2px 8px #000a",
              }}
            >
              {pokemon.name}
            </span>
          </div>
        ))}
      </div>
      {selected && (
        <PokemonDetalle name={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}