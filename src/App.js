import React from "react";
import "./App.css";
import Header from "./components/Header";
import Gameboard from "./components/Gameboard";

function App() {
  return (
    <div id="App-container">
      <Header></Header>
      <Gameboard></Gameboard>
    </div>
  );
}

export default App;
