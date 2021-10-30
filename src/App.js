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
const app = initializeApp(firebaseConfig);
const db = getFirestore();

function App() {
  useEffect(() => {
    initializeApp(firebaseConfig);
    getRelativeImgLocations(db);
  }, []);

  const [imgLocations, setImgLocations] = useState([]);

  async function getRelativeImgLocations(database) {
    console.log(`firestore: fetch relative positions`);
    const dataHelper = [];
    const querySnapshot = await getDocs(
      collection(database, "relative-img-locations")
    );
    querySnapshot.forEach((doc) => {
      dataHelper.push([doc.id, doc.data()]);
    });
    setImgLocations(dataHelper);
  }

  return (
    <div>
      <Header></Header>
      <Gameboard db={db} imgLocations={imgLocations}></Gameboard>
    </div>
  );
}

export default App;
