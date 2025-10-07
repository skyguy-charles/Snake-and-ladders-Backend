import React, { useState } from "react";

export default function Dice({ onRoll }) {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    const value = Math.floor(Math.random() * 6) + 1;
    setDiceValue(value);
    onRoll(value);
  };

  return (
    <div>
      <button onClick={rollDice}>Roll Dice</button>
      <p>Dice: {diceValue}</p>
    </div>
  );
}












