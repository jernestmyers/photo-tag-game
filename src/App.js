import "./App.css";
// import photoCollage from "./assets/national-parks-collage.jpg";
import photoCollage2 from "./assets/national-parks-collage-2.jpg";

function App() {
  const clickLocation = (e) => {
    const pointer = document.querySelector(`.pointer`);
    const pointerDiameterString = window
      .getComputedStyle(pointer)
      .getPropertyValue(`width`);
    const pointerDiameterInteger = pointerDiameterString.substring(
      0,
      pointerDiameterString.length - 2
    );
    pointer.style.display = `block`;
    pointer.style.left = `${e.clientX - pointerDiameterInteger / 2}px`;
    pointer.style.top = `${e.clientY - pointerDiameterInteger / 2}px`;
  };

  return (
    <div>
      <h1>find and seek - national parks edition</h1>
      {/* <img
        src={photoCollage}
        alt="A collage of imagery representing the different National Parks of the United States."
      ></img> */}
      <div className="image-container">
        <div className="pointer"></div>
        <img
          src={photoCollage2}
          onClick={clickLocation}
          alt="A collage of imagery representing the different National Parks of the United States."
        ></img>
      </div>
    </div>
  );
}

export default App;
