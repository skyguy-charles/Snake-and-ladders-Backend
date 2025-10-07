import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const fetchGames = async () => {
    try {
      const res = await api.get("/games");
      setGames(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const createGame = async () => {
    try {
      const res = await api.post("/games", { name });
      navigate(`/game/${res.data.id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Dashboard</h2>
      <input
        placeholder="New game name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createGame}>Create Game</button>
      <h3>Existing Games:</h3>
      <ul>
        {games.map((g) => (
          <li key={g.id}>
            {g.name} <button onClick={() => navigate(`/game/${g.id}`)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
}







