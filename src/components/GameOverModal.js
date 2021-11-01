import React from "react";
import Leaderboard from "./Leaderboard";
import Footer from "./Footer";

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
        isInitialLoad={props.isInitialLoad}
        timeOfStart={props.timeOfStart}
        duration={props.duration}
      ></Leaderboard>
      <button
        id="play-again-btn"
        onClick={props.resetGame}
        className="new-game-btn"
      >
        Play Again?
      </button>
      <Footer isGameOver={props.isGameOver}></Footer>
    </div>
  );
}

export default GameOverModal;
