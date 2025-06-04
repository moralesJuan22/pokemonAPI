export default function Buscador({ value, onChange }) {
  return (
    <input
      style={{
        borderRadius: 12,
        padding: "12px 18px",
        width: "100%",
        maxWidth: 260,
        color: "#19376d",
        background: "#e0f2ff",
        border: "2px solid #274690",
        fontFamily: "'Press Start 2P', monospace",
        fontSize: 16,
        boxShadow: "0 2px 8px 0 rgba(0,0,0,0.10)",
        outline: "none"
      }}
      type="text"
      placeholder="Buscar Pokémon..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}