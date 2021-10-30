import React, { useEffect, useState } from "react";
import {
  getFirestore,
  getDocs,
  doc,
  setDoc,
  collection,
} from "firebase/firestore";
import uniqid from "uniqid";

function Leaderboard(props) {
  const [leaderboard, setLeaderboard] = useState();
  //   const [leaderboardPreview, setLeaderboardPreview] = useState();

  useEffect(() => {
    console.log(`Leaderboard mounted`);
    fetchLeaderboard();
  }, []);

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

  const handleAddTime = async () => {
    console.log(`add time`);
    const db = getFirestore();
    const targetColumn = document.querySelector(`#submit-time-container`);
    const nameInput = document.querySelector(`.leaderboard-input`);
    if (nameInput.value) {
      targetColumn.innerHtml = ``;
      targetColumn.textContent = nameInput.value;
      userObject.id = uniqid();
      userObject.data.name = nameInput.value;
      await setDoc(doc(db, "leaderboard", userObject.id), userObject.data);
    }
  };

  const ordinalRanking = (index) => {
    const rank = +index + 1;
    const rankString = rank.toString();
    const lastNumber = rankString[rankString.length - 1];
    const lastTwoNumbers = rankString.slice(rankString.length - 2);
    if (lastNumber === `1` && lastTwoNumbers !== `11`) {
      return `${rankString}st`;
    } else if (lastNumber === `2` && lastTwoNumbers !== `12`) {
      return `${rankString}nd`;
    } else if (lastNumber === `3` && lastTwoNumbers !== `13`) {
      return `${rankString}rd`;
    } else {
      return `${rankString}th`;
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
                      <td>{index + 1}.</td>
                      <td id="submit-time-container">
                        <input
                          className="leaderboard-input"
                          type="text"
                          placeholder="enter your name"
                          maxlength="30"
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
                      <td>{index + 1}.</td>
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
                    <td>{index + 1}.</td>
                    <td>{leader.data.name}</td>
                    <td>{leader.data.time}</td>
                  </tr>
                );
              })}
              <tr id="table-spacer-row">
                <td colSpan="3">. . . . . . </td>
              </tr>
              <tr className="user-display-leaderboard" key={userObject.id}>
                <td>{leaderboardPreview.indexOf(userObject) + 1}.</td>
                <td id="submit-time-container">
                  <input
                    className="leaderboard-input"
                    type="text"
                    placeholder="enter your name"
                    maxlength="30"
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

      {/* <table>
        <thead>
          <tr className="leaderboardHeader">
            <th>Rank</th>
            <th>Name</th>
            <th>Time (s)</th>
          </tr>
        </thead>
        <tbody>
          {props.isGameOver ? (
            leaderboardPreview.indexOf(userObject) <= 4 ? (
              leaderboardPreview.slice(0, 5).map((leader, index) => {
                if (leader === userObject) {
                  return (
                    <tr key={leader.id}>
                      <td>{index + 1}.</td>
                      <td>
                        <input
                          type="text"
                          placeholder="enter your name"
                        ></input>
                      </td>
                      <td>{leader.data.time}</td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={leader.id}>
                      <td>{index + 1}.</td>
                      <td>{leader.data.name}</td>
                      <td>{leader.data.time}</td>
                    </tr>
                  );
                }
              })
            ) : (
              <tr>
                {leaderboardPreview.slice(0, 5).map((leader, index) => {
                  return (
                    <tr key={leader.id}>
                      <td>{index + 1}.</td>
                      <td>{leader.data.name}</td>
                      <td>{leader.data.time}</td>
                    </tr>
                  );
                })}{" "}
                <tr>
                  <td>. . .</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr key={userObject.id}>
                  <td>{leaderboardPreview.indexOf(userObject) + 1}.</td>
                  <td>
                    <input type="text" placeholder="enter your name"></input>{" "}
                  </td>
                  <td>{userObject.data.time}</td>
                </tr>
              </tr>
            )
          ) : null}
        </tbody>
      </table> */}
    </div>
  );
}

export default Leaderboard;

// fetch leaderboard
// compare user's time to leaderboard
// ask user to submit name or cancel
// if user submits name, push their time to firestore

/* <table>
                    <thead>
                        <tr class="bookDisplayHeader">
                            <th class="bookInfoDisplay">TITLE</th>
                            <th class="bookInfoDisplay">AUTHOR</th>
                            <th class="bookInfoDisplay">PAGE LENGTH</th>
                            <th class="bookInfoDisplay">READ STATUS</th>
                            <th class="bookInfoDisplay">REMOVE BOOK</th>
                        </tr>
                    <tbody>
                        
                    </tbody>
                </table> */
