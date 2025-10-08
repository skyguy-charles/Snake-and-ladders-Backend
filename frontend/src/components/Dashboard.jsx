import React, { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";

function Dashboard() {
  const [games, setGames] = useState([]);

  const fetchGames = async () => {
    try {
      const res = await api.get("/games");
      setGames(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>Dashboard</h1>
      <Link to="/game/1">
        <button>Go to Game 1</button>
      </Link>
      <div>
        <h3>Available Games:</h3>
        {games.length === 0 ? (
          <p>No games yet.</p>
        ) : (
          games.map(game => (
            <p key={game.id}>
              Game {game.id}: <Link to={`/game/${game.id}`}>Play</Link>
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;












































