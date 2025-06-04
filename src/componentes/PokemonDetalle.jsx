import { useEffect, useState } from "react";

export default function PokemonDetalle({ name, onClose }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [name]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
        <div className="bg-white p-8 rounded shadow text-black">Cargando...</div>
      </div>
    );
  }

  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full relative text-black">
        <button
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={onClose}
        >✖</button>
        <div className="flex flex-col items-center">
          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            className="w-32 h-32"
          />
          <h2 className="text-2xl capitalize font-bold mb-2">{pokemon.name}</h2>
          <p><strong>ID:</strong> {pokemon.id}</p>
          <p><strong>Peso:</strong> {pokemon.weight} kg</p>
          <p><strong>Altura:</strong> {pokemon.height} m</p>
          <p><strong>Tipo(s):</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
}