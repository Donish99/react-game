import React from "react";

const GameOver = (props) => {
  return (
    <div className="game-area-info">
      <h3>
        Game over! Your score <strong>{props.score}</strong> Press{" "}
        <em>SPACE</em> to start.
      </h3>
    </div>
  );
};
export default GameOver;
