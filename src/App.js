import React, { useState, useEffect } from "react";
import "./App.css";
// import photoCollage from "./assets/national-parks-collage.jpg";
import photoCollage2 from "./assets/national-parks-collage-2.jpg";

function App() {
  useEffect(() => {
    window.addEventListener(`click`, clickLocation);
  }, []);

  const clickLocation = (e) => {
    const pointer = document.querySelector(`.pointer`);
    const imgCollage = document.querySelector(`#img-collage`);
    console.log(imgCollage);
    if (
      e.pageX >= imgCollage.offsetLeft &&
      e.pageX <= imgCollage.offsetLeft + imgCollage.width &&
      e.pageY >= imgCollage.offsetTop &&
      e.pageY <= imgCollage.offsetTop + imgCollage.height
    ) {
      const pointerDiameterString = window
        .getComputedStyle(pointer)
        .getPropertyValue(`width`);
      const pointerDiameterInteger = pointerDiameterString.substring(
        0,
        pointerDiameterString.length - 2
      );
      pointer.style.display = `block`;
      pointer.style.left = `${e.pageX - pointerDiameterInteger / 2}px`;
      pointer.style.top = `${e.pageY - pointerDiameterInteger / 2}px`;
    } else {
      pointer.style.display = `none`;
    }
  };

  return (
    <div>
      <h1>find and seek - national parks edition</h1>
      {/* <img
        src={photoCollage}
        alt="A collage of imagery representing the different National Parks of the United States."
      ></img> */}
      <div className="image-container">
        <div className="pointer">
          <div id="park-selector-container">
            <ul id="park-selector">
              <li>
                <button className="choose-park-btn" value="bigBend">
                  Big Bend
                </button>
              </li>
              <li>
                <button className="choose-park-btn" value="smokies">
                  Smoky Mountains
                </button>
              </li>
              <li>
                <button className="choose-park-btn" value="guadalupe">
                  Guadalupe Mountains
                </button>
              </li>
            </ul>
          </div>
        </div>
        <img
          id="img-collage"
          src={photoCollage2}
          // onClick={clickLocation}
          alt="A collage of imagery representing the different National Parks of the United States."
        ></img>
      </div>
    </div>
  );
}

export default App;

// {/* <label for="choose-park">Choose a pet:</label> */}

// <select name="park" id="choose-park">
//   {/* <option value="">--Please choose an option--</option> */}
//   <option value="bigBend">Big Bend</option>
//   <option value="smokyMtns">Smoky Mountains</option>
//   <option value="guadalupeMtns">Guadalupe Mountains</option>
// </select>
