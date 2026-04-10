import React, { useEffect, useState } from "react";
import { getPokemons } from "../services/pokemonService";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const loadMore = async () => {
    try {
      const res = await getPokemons(page, 20);
      setPokemons((prev) => [...prev, ...res]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div style={{ padding: "20px" }}>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "15px",
        }}
      >
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={setSelectedId}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", margin: "20px" }}>
        <button onClick={loadMore}>Load More</button>
      </div>

      <PokemonModal
        pokemonId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
};

export default PokemonList;