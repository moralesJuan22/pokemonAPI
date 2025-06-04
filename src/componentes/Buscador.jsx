export default function Buscador({ value, onChange }) {
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="p-2 rounded border border-gray-400 w-64 text-black"
      />
    </div>
  );
}