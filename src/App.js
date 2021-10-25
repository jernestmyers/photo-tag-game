import "./App.css";
// import photoCollage from "./assets/national-parks-collage.jpg";
import photoCollage2 from "./assets/national-parks-collage-2.jpg";

function App() {
  const clickLocation = (e) => {
    console.log({ x: e.clientX, y: e.clientY });
    document.querySelector(`.pointer`).style.left = `${e.clientX - 20}px`;
    document.querySelector(`.pointer`).style.top = `${e.clientY - 30}px`;
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
