import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function GameBoard() {
  const { id } = useParams(); // Game ID from URL
  const [game, setGame] = useState(null);
  const [message, setMessage] = useState("");

  const fetchGame = async () => {
    try {
      const res = await api.get(`/games/${id}`);
      setGame(res.data);
    } catch (err) {
      console.error("Failed to fetch game:", err);
    }
  };

  const handleRollDice = async () => {
    if (!game) return;
    try {
      const res = await api.post(`/games/${id}/roll`);
      const updatedGame = res.data;

      // Update player positions and turn
      setGame(prev => ({
        ...prev,
        current_turn: updatedGame.current_turn,
        players: prev.players.map(p =>
          p.id === updatedGame.player.id
            ? { ...p, position: updatedGame.player.position }
            : p
        ),
      }));

      setMessage(`🎲 You rolled a ${res.data.dice}!`);
    } catch (err) {
      console.error("Failed to roll dice:", err);
      setMessage("❌ Failed to roll dice");
    }
  };

  useEffect(() => {
    fetchGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!game) return <h2>Loading game...</h2>;

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h1>🎲 Snakes & Ladders</h1>
      <h3>Current Turn: Player {game.current_turn}</h3>

      {message && <p style={{ color: "green" }}>{message}</p>}

      <button
        onClick={handleRollDice}
        style={{
          padding: "10px 20px",
          backgroundColor: "#2196F3",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        Roll Dice
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 40px)",
          justifyContent: "center",
          gap: "4px",
          marginTop: "2rem",
        }}
      >
        {Array.from({ length: 100 }, (_, i) => {
          const number = 100 - i;
          const playerHere = game.players.find(p => p.position === number);
          return (
            <div
              key={number}
              style={{
                width: "40px",
                height: "40px",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: playerHere ? "#FFD700" : "white",
                fontWeight: playerHere ? "bold" : "normal",
              }}
              title={playerHere ? `Player ${playerHere.id}` : ""}
            >
              {number}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default GameBoard;








