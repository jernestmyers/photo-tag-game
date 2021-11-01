import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
// import Footer from "./components/Footer";
import Gameboard from "./components/Gameboard";
// import BeginGameModal from "./components/BeginGameModal";

function App() {
  console.log(`app`);
  // const [isInitialLoad, setIsInitialLoad] = useState(true);
  // const [timeOfStart, setTimeOfStart] = useState();
  // console.log(isInitialLoad);

  // useEffect(() => {
  //   console.log(`App component mounted`);
  //   setIsInitialLoad(true);
  // }, []);

  return (
    <div id="App-container">
      <Header></Header>
      <Gameboard
      // timeOfStart={timeOfStart}
      // setIsInitialLoad={setIsInitialLoad}
      // isInitialLoad={isInitialLoad}
      // setTimeOfStart={setTimeOfStart}
      ></Gameboard>
      {/* {isInitialLoad ? ( */}
      {/* <BeginGameModal
      setTimeOfStart={setTimeOfStart}
      setIsInitialLoad={setIsInitialLoad}
      ></BeginGameModal> */}
      {/* ) : null} */}
      {/* <Footer></Footer> */}
    </div>
  );
}

export default App;
