import React, { useState } from "react";
import { addPlayer } from "../api/gameApi";

const PlayerForm = ({ gameId, onPlayerAdded }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addPlayer({ name, game_id: gameId });
      onPlayerAdded(res.data);
      setName("");
    } catch (err) {
      console.error(err);
      alert("Failed to add player.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Player Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default PlayerForm;
