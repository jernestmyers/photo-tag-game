import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Gameboard from "./components/Gameboard";
import BeginGameModal from "./components/BeginGameModal";

function App() {
  const [isInitialLoad, setIsInitialLoad] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    console.log(`App component mounted`);
    setIsInitialLoad(true);
  }, []);

  return (
    <div>
      <Header></Header>
      <Gameboard setIsGameStarted={setIsGameStarted}></Gameboard>
      {isInitialLoad ? (
        <BeginGameModal
          setIsInitialLoad={setIsInitialLoad}
          setIsGameStarted={setIsGameStarted}
        ></BeginGameModal>
      ) : null}
    </div>
  );
}

export default App;
