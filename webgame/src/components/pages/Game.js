import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "../Button";
import wakeButtons from "../wakeButtons";
import {runTimer, nameCheck, Session} from "../menNamesGame";

export default function Game() {

  const [game, setGame] = useState({});

  useEffect(() => {
    wakeButtons("10%", 40, "40%", 80, 30);
    setGame(new Session())
  }, []);
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      nameCheck(game);
      runTimer(game)
    }
  };

  return (
    <>
      <div className="bc">
        <h1 className="header" id="text">
          NORMAL
        </h1>
        <h2 className="points">POINTS</h2>
        <h3 className="time">TIME</h3>
        <p id="timer">30</p>
        <p id="points">0</p>
        <ul>
          <li id="help">
            Give name and hit enter!
          </li>
          <li>
            <Button name={"PAUSE"} />
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
