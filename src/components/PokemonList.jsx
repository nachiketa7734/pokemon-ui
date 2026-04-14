import React, { useEffect, useState } from "react";
import { getPokemons } from "../services/pokemonService";
import PokemonCard from "./PokemonCard";
import PokemonModal from "./PokemonModal";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);

  const isFetchingRef = React.useRef(false);

  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);  
  const [hasMore, setHasMore] = useState(true);


  const loadMore = async () => {
  if (isFetchingRef.current || !hasMore) return;

  isFetchingRef.current = true; // 

  try {
    setLoading(true);
    setError(null);

    const currentPage = page; 

    console.log("Fetching page:", currentPage);

    const res = await getPokemons(currentPage, 20);

    if (!res || res.length === 0) {
      setHasMore(false);
      return;
    }

    setPokemons((prev) => [...prev, ...res]);

    setPage((prev) => prev + 1);

  } catch (err) {
    setError(err.message || "Failed to load data");
  } finally {
    setLoading(false);
    isFetchingRef.current = false;
  }
};

  useEffect(() => {
    loadMore();
  }, []);


 useEffect(() => {
  let timeout;

  const handleScroll = () => {
    if (timeout) return;

    timeout = setTimeout(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMore();
      }
      timeout = null;
    }, 200); // 🔥 throttle
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, [page, hasMore]);


  return (
    <div style={{ padding: "20px" }}>
      <h1>Bolttedex</h1>

      {error && (
        <div style={errorStyle}>
          <p>{error}</p>
          <button onClick={loadMore}>Retry</button>
        </div>
      )}

      <div style={gridStyle}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={setSelectedId}
          />
        ))}
      </div>
      {loading && <p style={loadingStyle}>Loading...</p>}

      {!hasMore && <p style={endStyle}>No more Pokémon</p>}

      <PokemonModal
        pokemonId={selectedId}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "15px",
};

const loadingStyle = {
  textAlign: "center",
  margin: "20px",
};

const errorStyle = {
  textAlign: "center",
  color: "red",
  marginBottom: "20px",
};

const endStyle = {
  textAlign: "center",
  margin: "20px",
  color: "#777",
};

export default PokemonList;