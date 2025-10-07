import React from "react";

export default function Board({ players }) {
  const size = 10;
  const cells = [];

  for (let i = 100; i >= 1; i--) {
    // Alternate rows direction
    const row = Math.floor((i-1)/size);
    const col = row % 2 === 0 ? (i-1) % size : size - 1 - (i-1) % size;

    const cellPlayers = players.filter(p => p.position === i);

    cells.push(
      <div key={i} style={{ 
        width: "50px", height: "50px", border: "1px solid black", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: row % 2 === 0 ? "#eee" : "#ddd" 
      }}>
        <span>{i}</span>
        {cellPlayers.map(p => (
          <div key={p.id} style={{ width: "15px", height: "15px", borderRadius: "50%", backgroundColor: p.color }} />
        ))}
      </div>
    );
  }

  const boardStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${size}, 50px)`,
    gridTemplateRows: `repeat(${size}, 50px)`,
  };

  return <div style={boardStyle}>{cells}</div>;
}


































