import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function PokemonDetalle({ name, onClose }) {
  console.log("Nombre recibido en el modal:", name);

  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        console.log("Respuesta de la API:", res);
        return res.json();
      })
      .then(data => {
        console.log("Datos recibidos:", data);
        setPokemon(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar el Pokémon:", err);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
        <div className="bg-white p-8 rounded shadow text-black">Cargando......</div>
      </div>,
      document.body
    );
  }

  if (!pokemon && !loading) {
    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
        <div className="bg-white p-8 rounded shadow text-black">
          Error al cargar el Pokémon.
          <button className="ml-4" onClick={onClose}>Cerrar</button>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
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
    </div>,
    document.body
  );
}