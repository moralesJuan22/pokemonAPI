import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function PokemonDetalle({ name, onClose }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then(data => {
        setPokemon(data);
        setLoading(false);
      })
      .catch(() => {
        setPokemon(null);
        setLoading(false);
      });
  }, [name]);

  if (loading) {
    return createPortal(
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999]">
        <div className="bg-white p-8 rounded shadow text-black">Cargando...</div>
      </div>,
      document.body
    );
  }

  if (!pokemon) {
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
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999
    }}>
      <div className="bg-white p-8 rounded shadow-lg max-w-md w-full flex flex-col items-center relative min-h-[400px]">
        <button
          className="absolute top-4 right-4 text-xl font-bold bg-black text-white rounded-full w-8 h-8 flex items-center justify-center z-10"
          onClick={onClose}
          aria-label="Cerrar"
        >✖</button>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-32 h-32 mb-4 mt-12"
        />
        <h2 className="text-2xl capitalize font-bold mb-4">{pokemon.name}</h2>
        <p className="mb-2"><strong>ID:</strong> {pokemon.id}</p>
        <p className="mb-2"><strong>Peso:</strong> {pokemon.weight / 10} kg</p>
        <p className="mb-2"><strong>Altura:</strong> {pokemon.height / 10} m</p>
        <p className="mb-2"><strong>Tipo(s):</strong> {pokemon.types.map(t => t.type.name).join(", ")}</p>
        <p className="mb-2"><strong>Habilidades:</strong> {pokemon.abilities.map(a => a.ability.name).join(", ")}</p>
      </div>
    </div>,
    document.body
  );
}