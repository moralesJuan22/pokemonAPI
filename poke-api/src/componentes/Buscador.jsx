export default function Buscador({ value, onChange }) {
  return (
    <input
      className="rounded px-4 py-2 w-64 text-black"
      type="text"
      placeholder="Buscar Pokémon..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}