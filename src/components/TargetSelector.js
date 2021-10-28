import React from "react";

function TargetSelector(props) {
  return (
    <div id="park-selector-container">
      <ul id="park-selector">
        {props.selectorTargets.map((target) => {
          return (
            <li key={target.value}>
              <button
                onClick={props.validateSelection}
                className="choose-park-btn"
                value={target.value}
              >
                {target.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TargetSelector;
