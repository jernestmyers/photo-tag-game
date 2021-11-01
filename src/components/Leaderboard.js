import React, { useEffect, useState } from "react";
import { getDocs, doc, setDoc, collection } from "firebase/firestore";
import uniqid from "uniqid";

function Leaderboard(props) {
  const [leaderboard, setLeaderboard] = useState();

  useEffect(() => {
    if (!props.isInitialLoad) {
      console.log(`fetch leaderboard`);
      fetchLeaderboard();
    }
  }, [props.timeOfStart]);

  let leaderboardPreview = [];
  const userObject = {
    id: null,
    data: { name: ``, time: props.duration / 1000 },
  };
  if (leaderboard && props.isGameOver) {
    leaderboardPreview = leaderboard
      .concat(userObject)
      .sort((a, b) => a.data.time - b.data.time);
  }

  const fetchLeaderboard = async () => {
    const dataHelper = [];
    const targetRef = collection(props.db, "leaderboard");
    const getLeaderboard = await getDocs(targetRef);
    getLeaderboard.forEach((leader) => {
      dataHelper.push({ id: leader.id, data: leader.data() });
    });
    setLeaderboard(dataHelper.sort((a, b) => a.data.time - b.data.time));
  };

  const handleAddTime = async () => {
    const targetColumn = document.querySelector(`#submit-time-container`);
    const nameInput = document.querySelector(`.leaderboard-input`);
    if (nameInput.value) {
      targetColumn.innerHtml = ``;
      targetColumn.textContent = nameInput.value;
      userObject.id = uniqid();
      userObject.data.name = nameInput.value;
      await setDoc(
        doc(props.db, "leaderboard", userObject.id),
        userObject.data
      );
    }
  };

  const ordinalRanking = (index) => {
    const rank = index + 1;
    if (rank % 10 === 1 && rank !== 11) {
      return `st`;
    } else if (rank % 10 === 2 && rank !== 12) {
      return `nd`;
    } else if (rank % 10 === 3 && rank !== 13) {
      return `rd`;
    } else {
      return `th`;
    }
  };

  return (
    <div id="leaderboard-container">
      <h3 id="leaderboard-header">The Most Fabulously Fast Five</h3>
      {props.isGameOver ? (
        leaderboardPreview.indexOf(userObject) <= 4 ? (
          <table>
            <thead>
              <tr className="leaderboardHeader">
                <th>Rank</th>
                <th>Name</th>
                <th>Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardPreview.slice(0, 5).map((leader, index) => {
                if (leader === userObject) {
                  return (
                    <tr
                      className="user-display-leaderboard"
                      key={userObject.id}
                    >
                      <td>
                        {index + 1}
                        {ordinalRanking(index)}
                      </td>
                      <td id="submit-time-container">
                        <input
                          className="leaderboard-input"
                          type="text"
                          placeholder="enter your name"
                          maxLength="30"
                        ></input>
                        <button onClick={handleAddTime} id="submit-time-btn">
                          add
                        </button>
                      </td>
                      <td>{userObject.data.time}</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={leader.id}>
                      <td>
                        {index + 1}
                        {ordinalRanking(index)}
                      </td>
                      <td>{leader.data.name}</td>
                      <td>{leader.data.time}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        ) : (
          <table>
            <thead>
              <tr className="leaderboardHeader">
                <th>Rank</th>
                <th>Name</th>
                <th>Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardPreview.slice(0, 5).map((leader, index) => {
                return (
                  <tr key={leader.id}>
                    <td>
                      {index + 1}
                      {ordinalRanking(index)}
                    </td>
                    <td>{leader.data.name}</td>
                    <td>{leader.data.time}</td>
                  </tr>
                );
              })}
              <tr id="table-spacer-row">
                <td colSpan="3">. . . . . . </td>
              </tr>
              <tr className="user-display-leaderboard" key={userObject.id}>
                <td>
                  {leaderboardPreview.indexOf(userObject) + 1}
                  {ordinalRanking(leaderboardPreview.indexOf(userObject))}
                </td>
                <td id="submit-time-container">
                  <input
                    className="leaderboard-input"
                    type="text"
                    placeholder="enter your name"
                    maxLength="30"
                  ></input>
                  <button onClick={handleAddTime} id="submit-time-btn">
                    add
                  </button>
                </td>
                <td>{userObject.data.time}</td>
              </tr>
            </tbody>
          </table>
        )
      ) : null}
    </div>
  );
}

export default Leaderboard;
