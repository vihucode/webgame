import React, { useEffect } from "react";
import "./style.css";
import Button from '../Button'
import wakeButtons from "../wakeButtons";
import { Link } from "react-router-dom";

export default function Settings() {

  useEffect(() => {
    wakeButtons("20%", 25, null, 30, 50);
  }, []);

  return (
    <>
      <div className="bc">
        <h1 className="header" id="text">
          SETTINGS:
        </h1>
        <ul>
          <li>
            < Button name={"SOUND"} />
          </li>
          <li>
            <Link to="/">
              <Button name={"BACK"} />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};


