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
  const userObject = {
    id: `test`,
    data: { name: `test`, time: props.duration / 1000 },
  };
  if (leaderboard && props.isGameOver) {
    leaderboardPreview = leaderboard
      .concat(userObject)
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

  console.log(leaderboardPreview.indexOf(userObject));

  return (
    <div id="leaderboard-container">
      <h3>Most Fabulously Fast Five</h3>
      {props.isGameOver ? (
        leaderboardPreview.indexOf(userObject) <= 4 ? (
          leaderboardPreview.slice(0, 5).map((leader, index) => {
            if (leader === userObject) {
              return (
                <div key={leader.id}>
                  {index + 1}.{" "}
                  <input type="text" placeholder="enter your name"></input> -{" "}
                  {leader.data.time} seconds
                </div>
              );
            } else {
              return (
                <div key={leader.id}>
                  {index + 1}. {leader.data.name} - {leader.data.time} seconds
                </div>
              );
            }
          })
        ) : (
          <div>
            {leaderboardPreview.slice(0, 5).map((leader, index) => {
              return (
                <div key={leader.id}>
                  {index + 1}. {leader.data.name} - {leader.data.time} seconds
                </div>
              );
            })}{" "}
            <span>. . .</span>
            <div key={userObject.id}>
              {leaderboardPreview.indexOf(userObject) + 1}.{" "}
              <input type="text" placeholder="enter your name"></input> -{" "}
              {userObject.data.time} seconds
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export default Leaderboard;

// fetch leaderboard
// compare user's time to leaderboard
// ask user to submit name or cancel
// if user submits name, push their time to firestore
