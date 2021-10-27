import React, { useState, useEffect } from "react";
import "./App.css";
import Gameboard from "./components/Gameboard";
import Header from "./components/Header";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyDb5ZCdEaEqHORANq6NbOR-6Q-emlnohqA",
  authDomain: "photo-tag-game.firebaseapp.com",
  projectId: "photo-tag-game",
  storageBucket: "photo-tag-game.appspot.com",
  messagingSenderId: "1040129590056",
  appId: "1:1040129590056:web:97e1a01604a003328cc61d",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

function App() {
  useEffect(() => {
    initializeApp(firebaseConfig);
    const db = getFirestore();
    getImgLocations(db);
  }, []);

  const [imgLocations, setImgLocations] = useState([]);

  async function getImgLocations(database) {
    const dataHelper = [];
    const querySnapshot = await getDocs(collection(database, "img-location"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.id);
      dataHelper.push([doc.id, doc.data()]);
    });
    setImgLocations(dataHelper);
  }

  return (
    <div>
      <Header></Header>
      <Gameboard imgLocations={imgLocations}></Gameboard>
    </div>
  );
}

export default App;
