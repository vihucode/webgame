import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "../Button";
import { Link } from "react-router-dom";
import wakeButtons from "../wakeButtons";
import { runTimer, nameCheck, Session } from "../menNamesGame";


var rules = "Game idea is to write as many different male names as you can\n"
          + "before times is up. Every right answer you get 50 points and\n"
          + "3 seconds extra time. Good luck!"

var click = "CLICK TO START THE GAME!"
export default function Game() {
  const [game, setGame] = useState({});
  const [showRules, setShowRules] = useState(true); // State variable for showing/hiding rules

  useEffect(() => {
    wakeButtons("10%", 30, "40%", 80, 30);
    setGame(new Session());
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nameCheck(game);
    }
  };

  const startGame = (event) => {
    event.preventDefault();
    runTimer(game);
    setShowRules(false);
  }

  return (
    <>
      <div className="bc">
        {showRules && ( // Render the rules box only if showRules is true
          <div className="rules-box" onClick={startGame}>
            <div className="rules-content">
              <p>{rules}</p><br></br>
              <p>{click}</p>
            </div>
          </div>
        )}
        <h1 className="header" id="text">
          NORMAL
        </h1>
        <h2 className="points">POINTS</h2>
        <h3 className="time">TIME</h3>
        <p id="timer">0:07</p>
        <p id="points">0</p>
        <ul>
          <li id="help">Give name and hit enter!</li>
          <li>
            <Link to="/">
              <Button name={"BACK TO MENU"} />
            </Link>
          </li>
          <li>
            <form id="name">
              <input
                type="text"
                id="user"
                name="user"
                autoComplete="off"
                onKeyDown={handleKeyPress}
              ></input>
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}
