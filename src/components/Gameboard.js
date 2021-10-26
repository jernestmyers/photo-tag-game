import React, { useState, useEffect } from "react";
import photoCollage2 from "../assets/national-parks-collage-2.jpg";

function Gameboard(props) {
  console.log(props.imgLocations);

  useEffect(() => {
    window.addEventListener(`click`, clickLocation);
  }, []);

  const clickLocation = (e) => {
    const pointer = document.querySelector(`.pointer`);
    const imgCollage = document.querySelector(`#img-collage`);
    // console.log(imgCollage);
    // console.log(e.target.className);
    console.log({ x: e.pageX, y: e.pageY });
    if (
      e.pageX >= imgCollage.offsetLeft &&
      e.pageX <= imgCollage.offsetLeft + imgCollage.width &&
      e.pageY >= imgCollage.offsetTop &&
      e.pageY <= imgCollage.offsetTop + imgCollage.height &&
      e.target.className !== `choose-park-btn`
    ) {
      // display properties for the pointer
      const pointerDiameterString = window
        .getComputedStyle(pointer)
        .getPropertyValue(`width`);
      const pointerDiameterInteger = +pointerDiameterString.substring(
        0,
        pointerDiameterString.length - 2
      );
      pointer.style.display = `block`;
      pointer.style.left = `${e.pageX - pointerDiameterInteger / 2}px`;
      pointer.style.top = `${e.pageY - pointerDiameterInteger / 2}px`;

      // display properties for the selectors
      const selectorContainer = document.querySelector(
        `#park-selector-container`
      );
      const selectorContainerWidthString = window
        .getComputedStyle(selectorContainer)
        .getPropertyValue(`width`);
      const selectorContainerWidthInteger =
        +selectorContainerWidthString.substring(
          0,
          selectorContainerWidthString.length - 2
        );
      const parkSelector = document.querySelector(`#park-selector`);
      if (
        e.pageX +
          10 +
          selectorContainerWidthInteger +
          pointerDiameterInteger / 2 <=
        imgCollage.offsetLeft + imgCollage.width
      ) {
        selectorContainer.style.left = `${pointerDiameterInteger}px`;
        selectorContainer.style.right = ``;

        parkSelector.style.alignItems = `flex-start`;
      } else {
        selectorContainer.style.left = ``;
        selectorContainer.style.right = `${
          selectorContainerWidthInteger + pointerDiameterInteger / 5
        }px`;

        parkSelector.style.alignItems = `flex-end`;
      }
    } else {
      pointer.style.display = `none`;
      pointer.style.left = ``;
      pointer.style.top = ``;
    }
    drawGuadBox(e, imgCollage);
  };

  function drawGuadBox(event, img) {
    const guadBox = document.querySelector(`#guad-answer`);
    // console.log(event.pageX);
    guadBox.style.width = `${img.width * (70 / img.naturalWidth)}px`;
    guadBox.style.height = `${img.height * (65 / img.naturalHeight)}px`;
    guadBox.style.left = `${
      img.offsetLeft + img.width * ((130 - 77) / img.naturalWidth)
    }px`;
    guadBox.style.top = `${
      img.height * ((345 - 16) / img.naturalHeight) + img.offsetTop
    }px`;
  }

  return (
    <div className="image-container">
      <div id="guad-answer"></div>
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
  );
}

export default Gameboard;
