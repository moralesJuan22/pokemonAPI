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
    <div>
      <div className="flex justify-center mb-4">
        <Buscador value={search} onChange={setSearch} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {filtered.length === 0 && (
          <div className="col-span-4 text-center text-white">
            No se encontró ningún Pokémon.
          </div>
        )}
        {filtered.map((pokemon) => (
          <div
            key={pokemon.name}
            className="bg-white rounded shadow p-4 flex flex-col items-center cursor-pointer hover:bg-gray-200 transition"
            onClick={() => {
              console.log("Click en:", pokemon.name);
              setSelected(pokemon.name);
            }}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                pokemons.findIndex((p) => p.name === pokemon.name) + 1
              }.png`}
              alt={pokemon.name}
              className="w-20 h-20"
            />
            <span className="capitalize font-bold">{pokemon.name}</span>
          </div>
        ))}
      </div>
      {selected && (
        <>
          {console.log("Renderizando modal con:", selected)}
          <PokemonDetalle name={selected} onClose={() => setSelected(null)} />
        </>
      )}
    </div>
  );
}