import React from "react";
import PokemonList from "../components/PokemonList";

const Home = () => {
  return (
    <div style={containerStyle}>
      
      {/* Header */}
      <header style={headerStyle}>
        <p style={{ margin: 0, fontSize: "14px", color: "#555" }}>
          Explore Pokémon with power
        </p>
      </header>

      <main>
        <PokemonList />
      </main>

    </div>
  );
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
};

const headerStyle = {
  textAlign: "center",
  padding: "20px",
};

export default Home;