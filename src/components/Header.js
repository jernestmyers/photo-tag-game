import React from "react";
import bigBendEmblem from "../assets/big-bend.jpg";
import glacierEmblem from "../assets/glacier.jpg";
import guadMtnsEmblem from "../assets/guad-mtns.jpg";
import joshuaTreeEmblem from "../assets/joshua-tree.jpg";
import rockyMtnsEmblem from "../assets/rocky-mtns.jpg";
import saguaroEmblem from "../assets/saguaro.jpg";

function Header() {
  return (
    <header>
      <div id="title-container">
        <div id="title-left">
          <p className="title-text">FIND</p>
          <p className="title-text" id="title-small">
            AND
          </p>
          <p className="title-text">SEEK</p>
        </div>
        <div id="title-right">
          <p className="title-text">NATIONAL PARKS</p>
          <p className="title-text" id="title-edition">
            EDITION
          </p>
        </div>
      </div>
      {/* <div>
        <h2>Find these national park emblems on the poster below.</h2>
      </div> */}
      <div id="logo-container">
        <img
          className="emblem-key"
          src={bigBendEmblem}
          alt="Big Bend emblem"
        ></img>
        <img
          className="emblem-key"
          src={glacierEmblem}
          alt="Glacier emblem"
        ></img>
        <img
          className="emblem-key"
          src={guadMtnsEmblem}
          alt="Guadalupe Mountains emblem"
        ></img>
        <img
          className="emblem-key"
          src={joshuaTreeEmblem}
          alt="Joshua Tree emblem"
        ></img>
        <img
          className="emblem-key"
          src={rockyMtnsEmblem}
          alt="Rocky Mountain emblem"
        ></img>
        <img
          className="emblem-key"
          src={saguaroEmblem}
          alt="Saguaro emblem"
        ></img>
      </div>
    </header>
  );
}

export default Header;
