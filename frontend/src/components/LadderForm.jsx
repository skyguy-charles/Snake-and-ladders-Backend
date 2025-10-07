import React, { useState } from "react";
import { addLadder } from "../api/gameApi";

const LadderForm = ({ gameId, onLadderAdded }) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addLadder({ start: Number(start), end: Number(end), game_id: gameId });
      onLadderAdded(res.data);
      setStart("");
      setEnd("");
    } catch (err) {
      console.error(err);
      alert("Failed to add ladder.");
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
      <button type="submit">Add Ladder</button>
    </form>
  );
};

export default LadderForm;





