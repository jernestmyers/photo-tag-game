import React from "react";

function BeginGameModal(props) {
  const handleStart = () => {
    const imgCollage = document.querySelector(`#img-collage`);
    imgCollage.style.filter = ``;
    // props.setIsInitialLoad(false);
    props.setTimeOfStart(new Date());
    document.querySelector(`#begin-modal-container`).style.display = `none`;
  };
  return (
    <div id="begin-modal-container">
      <h2 className="modal-header">WELCOME!</h2>
      <p id="begin-modal-instructions">
        <span id="objective-decoration">OBJECTIVE</span>: Find and click each of
        the National Park emblems shown above as quickly as you can.
      </p>
      <button className="new-game-btn" onClick={handleStart}>
        Start Game
      </button>
    </div>
  );
}

export default BeginGameModal;
