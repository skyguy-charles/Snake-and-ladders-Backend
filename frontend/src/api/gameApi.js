import axios from "axios";

const API_BASE = "http://localhost:5000"; // adjust if your Flask backend runs elsewhere

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json", // ensures JSON is sent
  },
});

// --- GAMES ---
export const getGames = async () => {
  const res = await api.get("/games");
  return res.data;
};

export const createGame = async (name) => {
  const res = await api.post("/games", { name });
  return res.data;
};

// --- PLAYERS ---
export const getPlayers = async (gameId) => {
  const res = await api.get(`/games/${gameId}/players`);
  return res.data;
};

export const addPlayer = async (name, gameId) => {
  const res = await api.post("/players", { name, game_id: gameId });
  return res.data;
};

// --- SNAKES ---
export const getSnakes = async (gameId) => {
  const res = await api.get(`/snakes?game_id=${gameId}`);
  return res.data;
};

export const addSnake = async (start, end, gameId) => {
  const res = await api.post("/snakes", { start, end, game_id: gameId });
  return res.data;
};

// --- LADDERS ---
export const getLadders = async (gameId) => {
  const res = await api.get(`/ladders?game_id=${gameId}`);
  return res.data;
};

export const addLadder = async (start, end, gameId) => {
  const res = await api.post("/ladders", { start, end, game_id: gameId });
  return res.data;
};
















