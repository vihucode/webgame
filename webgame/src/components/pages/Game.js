// Game.js

import React, { useEffect, useState } from "react";
import "./style.css";
import Button from "../Button";
import wakeButtons from "../wakeButtons";
import { runTimer, nameCheck, Session, stopInterval } from "../gameLogic";
import userService from "../../services/userService";
import categoryService from "../../services/categoryService";
import gameSound from "../monkey.mp3"


var rules =
  "Game idea is to write as many different male names as you can\n" +
  "before time is up. Every right answer you get 50 points and\n" +
  "3 seconds extra time. Good luck!";

var click = "CLICK TO START THE GAME!";

export default function Game() {
  const [game, setGame] = useState({});
  const [showRules, setShowRules] = useState(true);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [headerText, setHeaderText] = useState("NORMAL");

  useEffect(() => {
    wakeButtons("10%", 30, "40%", 80, 10);
    const newGame = new Session();
    setGame(newGame);
    playClickSound();
  }, []);

  const playClickSound = () => {
    const audio = new Audio(gameSound);
    audio.play();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nameCheck(game);
    }
  };

  const startGame = (event) => {
    event.preventDefault();
    runTimer(game, setGame, setShowPlayAgain);
    setShowRules(false);
    setShowPlayAgain(false);
  };

  const stopGame = async (event) => {
    userService.updateActive(game.playerId, game.points, game.catName, false);
    categoryService.updateActive(game.catId, false);
    game.timer = 0;
    window.location.href = "/";
  };

  const playAgain = async () => {
    game.timer = 8000
    game.run = true;
    game.points = 0;
    game.usedNames = [];
    setShowRules(true);
  };

  return (
    <>
      <div className="bc">
        {showRules && (
          <div className="rules-box" onClick={startGame}>
            <div className="rules-content">
              <p>{rules}</p>
              <br />
              <p>{click}</p>
            </div>
          </div>
        )}
        <h1 className="header" id="text">
          {headerText}
        </h1>
        <h2 className="points">POINTS</h2>
        <h3 className="time">TIME</h3>
        <p id="timer">0:07</p>
        <p id="points">0</p>
        <ul>
          <li id="help">Give name and hit enter!</li>
          <li id="playAgain">{showPlayAgain && (
            <Button name={"PLAY AGAIN"} command={playAgain} />
            )}
          </li>
          <li>
            <Button name={"BACK TO MENU"} command={stopGame} />
          </li>
          <li>
            <form id="name">
              <input
                type="text"
                id="user"
                name="user"
                autoComplete="off"
                onKeyDown={handleKeyPress}
              />
            </form>
          </li>
        </ul>
      </div>
    </>
  );
}  


