import React, { useState, useEffect } from "react";

function TargetSelector(props) {
  //   console.log(props.selectorTargets);
  return (
    <div id="park-selector-container">
      <ul id="park-selector">
        {props.selectorTargets.map((target) => {
          return (
            <li>
              <button
                onClick={props.validateSelection}
                className="choose-park-btn"
                value={target}
              >
                {target}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TargetSelector;
