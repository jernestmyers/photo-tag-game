import React, { useState, useEffect } from "react";
import photoCollage2 from "../assets/national-parks-collage-2.jpg";
import TargetSelector from "./TargetSelector";
import { getFirestore, getDoc, doc, setDoc } from "firebase/firestore";

function Gameboard(props) {
  const [clickLocation, setClickLocation] = useState({});
  const [clickedClassName, setClickedClassName] = useState();
  const [selectorTargets, setSelectorTargets] = useState([
    { name: `Big Bend`, value: `bigBend` },
    { name: `Glacier`, value: `glacier` },
    { name: `Guadalupe Mountains`, value: `guadalupe` },
    { name: `Joshua Tree`, value: `joshuaTree` },
    { name: `Rocky Mountain`, value: `rockies` },
    { name: `Saguaro`, value: `saguaro` },
  ]);
  const [relativeLocationData, setRelativeLocationData] = useState();
  const db = getFirestore();

  useEffect(() => {
    console.log(`Gameboard mounted`);
    window.addEventListener(`click`, handleClick);
    setRelativeLocationData(props.imgLocations);
  }, []);

  useEffect(() => {
    setAbsoluteTargetLocations();
  }, [relativeLocationData]);

  useEffect(() => {
    handlePointerDisplay();
  }, [clickLocation, clickedClassName]);

  const setAbsoluteTargetLocations = async () => {
    const imgCollage = document.querySelector(`#img-collage`);
    await props.imgLocations.forEach((target) => {
      setDoc(doc(db, "absolute-img-locations", target[0]), {
        minX: target[1].offsetLeft * imgCollage.width + imgCollage.offsetLeft,
        minY: target[1].offsetTop * imgCollage.height + imgCollage.offsetTop,
        maxX:
          target[1].offsetLeft * imgCollage.width +
          imgCollage.offsetLeft +
          target[1].width * imgCollage.width,
        maxY:
          target[1].offsetTop * imgCollage.height +
          imgCollage.offsetTop +
          target[1].height * imgCollage.height,
      });
    });
  };

  const handleClick = (e) => {
    console.log({ x: e.pageX, y: e.pageY });
    if (e.target.className !== `choose-park-btn`) {
      setClickLocation({ x: e.pageX, y: e.pageY });
    }
    setClickedClassName(e.target.className);
  };

  const handlePointerDisplay = (e) => {
    const pointer = document.querySelector(`.pointer`);
    const imgCollage = document.querySelector(`#img-collage`);
    if (
      clickLocation.x >= imgCollage.offsetLeft &&
      clickLocation.x <= imgCollage.offsetLeft + imgCollage.width &&
      clickLocation.y >= imgCollage.offsetTop &&
      clickLocation.y <= imgCollage.offsetTop + imgCollage.height &&
      clickedClassName !== `choose-park-btn`
    ) {
      // BEGIN - display properties for the pointer
      const pointerDiameterString = window
        .getComputedStyle(pointer)
        .getPropertyValue(`width`);
      const pointerDiameterInteger = +pointerDiameterString.substring(
        0,
        pointerDiameterString.length - 2
      );
      pointer.style.display = `block`;
      pointer.style.left = `${clickLocation.x - pointerDiameterInteger / 2}px`;
      pointer.style.top = `${clickLocation.y - pointerDiameterInteger / 2}px`;

      // BEGIN - display properties for the selectors
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

      // BEGIN - if-else block to determine if selector displays left or right of pointer window
      if (
        clickLocation.x +
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
      // END - if-else block to determine if selector displays left or right of pointer window
      // END - display properties for the selectors
    } else {
      pointer.style.display = `none`;
      pointer.style.left = ``;
      pointer.style.top = ``;
    }
    // END - display properties for the pointer
  };

  const validateSelection = async (e) => {
    const targetClicked = e.target.value;
    const targetRef = doc(db, "absolute-img-locations", `${targetClicked}`);
    const getAbsoluteData = await getDoc(targetRef);
    const absoluteData = getAbsoluteData.data();
    if (
      clickLocation.x >= absoluteData.minX &&
      clickLocation.x <= absoluteData.maxX &&
      clickLocation.y >= absoluteData.minY &&
      clickLocation.y <= absoluteData.maxY
    ) {
      setSelectorTargets(
        selectorTargets.filter((target) => {
          if (target.value !== targetClicked) {
            return target;
          }
        })
      );

      // BEGIN - turns on class to set opacity of emblem to 12.5% and displays a checkmark at the clickLocation
      document.querySelector(`#${targetClicked}`).classList.add(`target-found`);
      const body = document.querySelector(`body`);
      const imgContainer = document.querySelector(`.image-container`);
      const getFontSize = window
        .getComputedStyle(body)
        .getPropertyValue(`font-size`);
      const divForCheckmark = document.createElement(`div`);
      divForCheckmark.classList.add(`checkbox`);
      divForCheckmark.innerHTML = `<svg
        aria-hidden="true"
        focusable="false"
        data-prefix="far"
        data-icon="check-circle"
        className="svg-inline--fa fa-check-circle fa-w-16"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z"></path>
      </svg>`;
      divForCheckmark.style.display = `block`;
      divForCheckmark.style.left = `${
        clickLocation.x - +getFontSize.substring(0, getFontSize.length - 2)
      }px`;
      divForCheckmark.style.top = `${
        clickLocation.y - +getFontSize.substring(0, getFontSize.length - 2)
      }px`;
      imgContainer.appendChild(divForCheckmark);
      // END - turns on class to set opacity of emblem to 12.5% and displays a checkmark at the clickLocation
    } else {
      console.log(`${targetClicked} was NOT successfully clicked`);
    }
  };

  return (
    <div className="image-container">
      <div className="pointer">
        <TargetSelector
          validateSelection={validateSelection}
          selectorTargets={selectorTargets}
        ></TargetSelector>
      </div>
      <img
        id="img-collage"
        src={photoCollage2}
        alt="A collage of imagery representing the different National Parks of the United States."
      ></img>
    </div>
  );
}

export default Gameboard;
