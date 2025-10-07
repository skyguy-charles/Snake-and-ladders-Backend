import React, { useState } from "react";
import { addSnake } from "../api/gameApi";

const SnakeForm = ({ gameId, onSnakeAdded }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addSnake({ start: Number(start), end: Number(end), game_id: gameId });
      onSnakeAdded(res.data);
      setStart("");
      setEnd("");
    } catch (err) {
      console.error(err);
      alert("Failed to add snake.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        placeholder="Start"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="End"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        required
      />
      <button type="submit">Add Snake</button>
    </form>
  );
};

export default SnakeForm;






