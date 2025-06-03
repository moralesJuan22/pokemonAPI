import { useEffect, useState } from "react"

export default function Pokedex() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then(res => res.json())
      .then(data => setPokemons(data.results))
  }, [])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {pokemons.map((pokemon, idx) => (
        <div key={pokemon.name} className="bg-white rounded shadow p-4 flex flex-col items-center">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx + 1}.png`}
            alt={pokemon.name}
            className="w-20 h-20"
          />
          <span className="capitalize font-bold">{pokemon.name}</span>
        </div>
      ))}
    </div>
  )
}
