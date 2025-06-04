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

  // Colores y fuente
  const azulOscuro = "#0a2342";
  const azulMedio = "#19376d";
  const azulClaro = "#e0f2ff";
  const azulBorde = "#274690";
  const fuentePixel = "'Press Start 2P', monospace";

  if (loading) {
    return createPortal(
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999
      }}>
        <div style={{
          background: azulMedio,
          color: azulClaro,
          padding: 32,
          borderRadius: 24,
          fontWeight: "bold",
          fontSize: 22,
          fontFamily: fuentePixel,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.4)"
        }}>
          Cargando...
        </div>
      </div>,
      document.body
    );
  }

  if (!pokemon) {
    return createPortal(
      <div style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
        display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99999
      }}>
        <div style={{
          background: azulMedio,
          color: azulClaro,
          padding: 32,
          borderRadius: 24,
          fontFamily: fuentePixel,
          boxShadow: "0 8px 32px 0 rgba(0,0,0,0.4)",
          textAlign: "center"
        }}>
          Error al cargar el Pokémon.
          <br />
          <button
            style={{
              marginTop: 24,
              padding: "10px 24px",
              background: azulBorde,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              fontFamily: fuentePixel,
              fontWeight: "bold",
              fontSize: 16,
              cursor: "pointer",
              boxShadow: "0 2px 8px 0 rgba(0,0,0,0.2)"
            }}
            onClick={onClose}
          >Cerrar</button>
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
      <div style={{
        background: `linear-gradient(135deg, ${azulMedio} 60%, ${azulOscuro} 100%)`,
        border: `3px solid ${azulBorde}`,
        borderRadius: 24,
        boxShadow: "0 8px 32px 0 rgba(0,0,0,0.5)",
        padding: 36,
        maxWidth: 380,
        width: "95vw",
        fontFamily: fuentePixel,
        color: azulClaro,
        position: "relative",
        textAlign: "center"
      }}>
        <button
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: azulBorde,
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 40,
            height: 40,
            fontSize: 22,
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 2px 8px 0 rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
          onClick={onClose}
          aria-label="Cerrar"
        >✖</button>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          style={{
            width: 110,
            height: 110,
            margin: "32px auto 18px auto",
            display: "block",
            filter: "drop-shadow(0 4px 16px #0008)"
          }}
        />
        <h2 style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 28,
          color: azulClaro,
          textShadow: "2px 2px 8px #000a",
          textTransform: "capitalize"
        }}>{pokemon.name}</h2>
        <div style={{fontSize: 16, color: azulClaro, textAlign: "left", margin: "0 auto", maxWidth: 300}}>
          <p><span style={{fontWeight: "bold"}}>ID:</span> {pokemon.id}</p>
          <p><span style={{fontWeight: "bold"}}>Peso:</span> {pokemon.weight / 10} kg</p>
          <p><span style={{fontWeight: "bold"}}>Altura:</span> {pokemon.height / 10} m</p>
          <p>
            <span style={{fontWeight: "bold"}}>Tipo(s):</span> {pokemon.types.map(t => t.type.name).join(", ")}
          </p>
          <p>
            <span style={{fontWeight: "bold"}}>Habilidades:</span> {pokemon.abilities.map(a => a.ability.name).join(", ")}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}