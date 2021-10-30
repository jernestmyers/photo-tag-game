import React from "react";

function BeginGameModal(props) {
  const handleStart = () => {
    props.setIsInitialLoad(false);
    props.setIsGameStarted(true);
  };
  return (
    <div id="begin-modal-container">
      <p>Objective: Find and click each emblem as quickly as you can.</p>
      <button onClick={handleStart}>Start Game</button>
    </div>
  );
}

export default BeginGameModal;
