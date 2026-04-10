import axios from "axios";


const API_BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});


const formatError = (error) => {
  if (error.response) {
    return {
      message: error.response.data?.message || "Server error",
      status: error.response.status,
    };
  } else if (error.request) {
    return {
      message: "No response from server",
      status: 500,
    };
  } else {
    return {
      message: "Unexpected error occurred",
      status: 500,
    };
  }
};


export const getPokemons = async (page = 0, size = 20) => {
  try {
    const response = await apiClient.get("/pokemons", {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getPokemonDetails = async (id) => {
  try {
    const response = await apiClient.get(`/pokemons/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};