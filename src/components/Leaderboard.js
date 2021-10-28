import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDocs,
  doc,
  setDoc,
  collection,
} from "firebase/firestore";

function Leaderboard(props) {
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    fetchLeaderboard();
  }, [props.isGameOver]);

  const fetchLeaderboard = async () => {
    const db = getFirestore();
    const dataHelper = [];
    const targetRef = collection(db, "leaderboard");
    const getLeaderboard = await getDocs(targetRef);
    getLeaderboard.forEach((leader) => {
      dataHelper.push({ id: leader.id, data: leader.data() });
    });
    setLeaderboard(dataHelper.sort((a, b) => a.data.time - b.data.time));
  };

  console.log(leaderboard);

  return <div id="leaderboard-container"></div>;
}

export default Leaderboard;
