import React, { useState, useEffect } from "react";
import Board from "./components/Board";
import Dice from "./components/Dice";
import { getGames, getSnakes, getLadders } from "./api/gameApi";

function App() {
  const [players, setPlayers] = useState([
    { id: 1, name: "Alice", position: 1, color: "red" },
    { id: 2, name: "Bob", position: 1, color: "blue" },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [snakes, setSnakes] = useState([]);
  const [ladders, setLadders] = useState([]);
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await getGames();
      setGames(res.data);
      if(res.data.length > 0) setSelectedGame(res.data[0].id); // default first game
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if(selectedGame){
      fetchSnakesAndLadders(selectedGame);
    }
  }, [selectedGame]);

  const fetchSnakesAndLadders = async (gameId) => {
    try {
      const snakesRes = await getSnakes(gameId);
      const laddersRes = await getLadders(gameId);
      setSnakes(snakesRes.data);
      setLadders(laddersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoll = (dice) => {
    setPlayers(prev => {
      const updated = [...prev];
      let newPos = updated[currentPlayer].position + dice;
      if (newPos > 100) newPos = 100;

      // Check ladders
      const ladder = ladders.find(l => l.start === newPos);
      if(ladder) newPos = ladder.end;

      // Check snakes
      const snake = snakes.find(s => s.start === newPos);
      if(snake) newPos = snake.end;

      updated[currentPlayer].position = newPos;
      return updated;
    });

    setCurrentPlayer((currentPlayer + 1) % players.length);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Snake and Ladders</h1>
      <Board players={players} snakes={snakes} ladders={ladders} />
      <Dice onRoll={handleRoll} />
      <p>Current Player: {players[currentPlayer].name}</p>
    </div>
  );
}

export default App;







































