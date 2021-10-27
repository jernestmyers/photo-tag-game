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
    drawAnswerBoxes(e, imgCollage);
  };

  function drawAnswerBoxes(event, img) {
    const bigBendBox = document.querySelector(`#big-bend-answer`);
    bigBendBox.style.width = `${img.width * (75 / img.naturalWidth)}px`;
    bigBendBox.style.height = `${img.height * (80 / img.naturalHeight)}px`;
    bigBendBox.style.left = `${
      img.offsetLeft + img.width * ((565 - 77) / img.naturalWidth)
    }px`;
    bigBendBox.style.top = `${
      img.height * ((70 - 16) / img.naturalHeight) + img.offsetTop
    }px`;

    const glacierBox = document.querySelector(`#glacier-answer`);
    glacierBox.style.width = `${img.width * (78 / img.naturalWidth)}px`;
    glacierBox.style.height = `${img.height * (95 / img.naturalHeight)}px`;
    glacierBox.style.left = `${
      img.offsetLeft + img.width * ((665 - 77) / img.naturalWidth)
    }px`;
    glacierBox.style.top = `${
      img.height * ((280 - 16) / img.naturalHeight) + img.offsetTop
    }px`;

    const guadBox = document.querySelector(`#guad-answer`);
    guadBox.style.width = `${img.width * (70 / img.naturalWidth)}px`;
    guadBox.style.height = `${img.height * (70 / img.naturalHeight)}px`;
    guadBox.style.left = `${
      img.offsetLeft + img.width * ((130 - 77) / img.naturalWidth)
    }px`;
    guadBox.style.top = `${
      img.height * ((340 - 16) / img.naturalHeight) + img.offsetTop
    }px`;

    const joshuaBox = document.querySelector(`#joshua-answer`);
    joshuaBox.style.width = `${img.width * (70 / img.naturalWidth)}px`;
    joshuaBox.style.height = `${img.height * (70 / img.naturalHeight)}px`;
    joshuaBox.style.left = `${
      img.offsetLeft + img.width * ((387 - 77) / img.naturalWidth)
    }px`;
    joshuaBox.style.top = `${
      img.height * ((700 - 16) / img.naturalHeight) + img.offsetTop
    }px`;

    const rockiesBox = document.querySelector(`#rockies-answer`);
    rockiesBox.style.width = `${img.width * (65 / img.naturalWidth)}px`;
    rockiesBox.style.height = `${img.height * (63 / img.naturalHeight)}px`;
    rockiesBox.style.left = `${
      img.offsetLeft + img.width * ((590 - 77) / img.naturalWidth)
    }px`;
    rockiesBox.style.top = `${
      img.height * ((880 - 16) / img.naturalHeight) + img.offsetTop
    }px`;

    const saguaroBox = document.querySelector(`#saguaro-answer`);
    saguaroBox.style.width = `${img.width * (84 / img.naturalWidth)}px`;
    saguaroBox.style.height = `${img.height * (83 / img.naturalHeight)}px`;
    saguaroBox.style.left = `${
      img.offsetLeft + img.width * ((218 - 77) / img.naturalWidth)
    }px`;
    saguaroBox.style.top = `${
      img.height * ((950 - 16) / img.naturalHeight) + img.offsetTop
    }px`;
  }

  return (
    <div className="image-container">
      <div id="big-bend-answer"></div>
      <div id="glacier-answer"></div>
      <div id="guad-answer"></div>
      <div id="joshua-answer"></div>
      <div id="rockies-answer"></div>
      <div id="saguaro-answer"></div>
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
                Glacier
              </button>
            </li>
            <li>
              <button className="choose-park-btn" value="guadalupe">
                Guadalupe Mountains
              </button>
            </li>
            <li>
              <button className="choose-park-btn" value="guadalupe">
                Joshua Tree
              </button>
            </li>
            <li>
              <button className="choose-park-btn" value="guadalupe">
                Rocky Mountain
              </button>
            </li>
            <li>
              <button className="choose-park-btn" value="guadalupe">
                Saguaro
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
