import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import wakeButtons from "../wakeButtons";
import Button from "../Button";

export default function Home() {
  useEffect(() => {
    wakeButtons();
  }, []);

  return (
    <>
      <div className="bc">
        <h1 className="header" id="text">
          PalePeli
        </h1>
        <ul>
          <li>
            <Link to="/play">
              <Button name={"PLAY"} />
            </Link>
          </li>

          <li>
            <Link to="/leaderboard">
              <Button name={"LEADERBOARD"} />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
