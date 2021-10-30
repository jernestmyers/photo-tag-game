import React from "react";
import Leaderboard from "./Leaderboard";

function GameOverModal(props) {
  return (
    <div id="gameover-modal">
      <h2 className="modal-header">GAME OVER</h2>
      <p>
        You finished in <span id="time-finished">{props.duration / 1000}</span>{" "}
        seconds!
      </p>
      <Leaderboard
        db={props.db}
        isGameOver={props.isGameOver}
        duration={props.duration}
      ></Leaderboard>
      <button className="new-game-btn">Play Again?</button>
    </div>
  );
}

export default GameOverModal;
