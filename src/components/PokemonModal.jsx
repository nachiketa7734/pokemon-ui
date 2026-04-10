import React, { useEffect, useState } from "react";
import { getPokemonDetails } from "../services/pokemonService";

const PokemonModal = ({ pokemonId, onClose }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const res = await getPokemonDetails(pokemonId);
        setData(res);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (pokemonId) fetchDetails();
  }, [pokemonId]);

  if (!pokemonId) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <button onClick={onClose} style={{ float: "right" }}>
          X
        </button>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{data.name}</h2>

            <div style={{ display: "flex", gap: "20px" }}>
              <img src={data.frontImage} alt="front" />
              <img src={data.backImage} alt="back" />
            </div>

            <p><b>Types:</b> {data.types.join(", ")}</p>
            <p><b>Region:</b> {data.region}</p>
            <p><b>Weaknesses:</b> {data.weaknesses.join(", ")}</p>
          </>
        )}
      </div>
    </div>
  );
};

// Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
};

const modalStyle = {
  background: "white",
  padding: "20px",
  margin: "100px auto",
  width: "400px",
  borderRadius: "10px",
};

export default PokemonModal;