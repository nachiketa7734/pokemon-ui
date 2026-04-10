import React from "react";

const PokemonCard = ({ pokemon, onClick }) => {
  return (
    <div
      onClick={() => onClick(pokemon.id)}
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "10px",
        cursor: "pointer",
        textAlign: "center",
        transition: "transform 0.2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        style={{ width: "100px", height: "100px" }}
      />

      <h3>{pokemon.name}</h3>

      <div>
        {pokemon.types.map((type) => (
          <span
            key={type}
            style={{
              margin: "0 5px",
              padding: "3px 8px",
              background: "#eee",
              borderRadius: "5px",
              fontSize: "12px",
            }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;