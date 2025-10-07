import React, { useState } from "react";
import { createGame } from "../api/gameApi";

const GameForm = ({ onGameCreated }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createGame({ name });
      onGameCreated(res.data);
      setName("");
    } catch (err) {
      console.error(err);
      alert("Failed to create game. Check backend.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Game Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Create Game</button>
    </form>
  );
};

export default GameForm;























