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
  //   const [leaderboardPreview, setLeaderboardPreview] = useState();

  useEffect(() => {
    console.log(`Leaderboard mounted`);
    fetchLeaderboard();
  }, []);

  let leaderboardPreview = [];
  if (leaderboard && props.isGameOver) {
    leaderboardPreview = leaderboard
      .concat({
        id: `test`,
        data: { name: `test`, time: props.duration / 1000 },
      })
      .sort((a, b) => a.data.time - b.data.time);
  }

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

  console.log(leaderboardPreview);

  return (
    <div id="leaderboard-container">
      {props.isGameOver
        ? leaderboard.slice(0, 5).map((leader, index) => {
            return (
              <div key={leader.id}>
                {index + 1}. {leader.data.name} - {leader.data.time} seconds
              </div>
            );
          })
        : null}
    </div>
  );
}

export default Leaderboard;

// fetch leaderboard
// compare user's time to leaderboard
// ask user to submit name or cancel
// if user submits name, push their time to firestore
