import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

export default function GameBoard() {
  const { id } = useParams(); // Game ID if passed
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [snakes, setSnakes] = useState([]);
  const [ladders, setLadders] = useState([]);
  const [diceResult, setDiceResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch game state
  const fetchGame = async () => {
    try {
      const res = id
        ? await api.get(`/games/${id}`)
        : await api.get(`/games`); // fallback for multiple games
      const gameData = res.data.game || res.data[0]; // first game if array
      if (!gameData) {
        setGame(null);
        setLoading(false);
        return;
      }

      setGame(gameData);
      setPlayers(res.data.players || []);
      setSnakes(res.data.snakes || []);
      setLadders(res.data.ladders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new game
  const createGame = async () => {
    try {
      const res = await api.post("/games", { name: "New Game" });
      setGame(res.data);
      fetchGame();
    } catch (err) {
      console.error("Failed to create game:", err);
    }
  };

  // Roll dice for current player
  const rollDice = async (playerId) => {
    try {
      const res = await api.post(`/games/${game.id}/roll/${playerId}`);
      setDiceResult(res.data.dice);
      fetchGame();
    } catch (err) {
      console.error("Failed to roll dice:", err);
    }
  };

  useEffect(() => {
    fetchGame();
  }, []);

  if (loading) return <h2>Loading game...</h2>;

  // Convert square number to x, y coordinates for SVG lines
  const getCoords = (num) => {
    const row = Math.floor((num - 1) / 10);
    const col = row % 2 === 0 ? (num - 1) % 10 : 9 - ((num - 1) % 10);
    const x = col * 40 + 20;
    const y = (9 - row) * 40 + 20;
    return [x, y];
  };

  const squares = [];
  for (let i = 100; i >= 1; i--) squares.push(i);

  const getPlayersOnSquare = (pos) => players.filter((p) => p.position === pos);

  return (
    <div style={{ textAlign: "center", marginTop: "1rem" }}>
      <h2>🎲 Snakes & Ladders</h2>

      {!game && (
        <div>
          <p>No game found. Create one to start!</p>
          <button
            onClick={createGame}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Create Game
          </button>
        </div>
      )}

      {game && (
        <div>
          <h3>Game: {game.name}</h3>
          <p>Current Turn: Player {game.current_turn}</p>

          {players.map((p) => (
            <div key={p.id} style={{ margin: "5px 0" }}>
              {p.name}: {p.position}
              {p.id === game.current_player_id && (
                <button
                  onClick={() => rollDice(p.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Roll Dice
                </button>
              )}
            </div>
          ))}

          {diceResult && <p>Last Dice Roll: {diceResult}</p>}

          {/* Board */}
          <div style={{ position: "relative", width: "400px", margin: "2rem auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(10, 40px)",
                gridAutoRows: "40px",
                border: "2px solid black",
              }}
            >
              {squares.map((num) => (
                <div
                  key={num}
                  style={{
                    border: "1px solid #333",
                    position: "relative",
                    background: num % 2 === 0 ? "#f0f0f0" : "#fff",
                  }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      position: "absolute",
                      top: 2,
                      left: 2,
                    }}
                  >
                    {num}
                  </span>
                  {getPlayersOnSquare(num).map((p) => (
                    <span
                      key={p.id}
                      style={{
                        display: "inline-block",
                        width: "12px",
                        height: "12px",
                        backgroundColor: "red",
                        borderRadius: "50%",
                        margin: "1px",
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Snakes & Ladders SVG */}
            <svg
              width={400}
              height={400}
              style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
            >
              {snakes.map((s, idx) => {
                const [x1, y1] = getCoords(s.start);
                const [x2, y2] = getCoords(s.end);
                return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="red" strokeWidth="3" />;
              })}
              {ladders.map((l, idx) => {
                const [x1, y1] = getCoords(l.start);
                const [x2, y2] = getCoords(l.end);
                return <line key={idx} x1={x1} y1={y1} x2={x2} y2={y2} stroke="green" strokeWidth="3" />;
              })}
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}







