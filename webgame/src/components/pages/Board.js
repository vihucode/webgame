import React, { useEffect, useState } from "react";
import "./style.css";
import Button from '../Button'
import wakeButtons from "../wakeButtons";
import { Link } from "react-router-dom";
import userService from "../../services/userService"

export default function Board() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    wakeButtons("15%", 30, "65%", 75);
  
    userService.getAll().then((users) => {
      // Sort the users by highscore in descending order
      const sortedUsers = users.sort((a, b) => b.highscore - a.highscore);
  
      // Get the top 10 users
      const topUsers = sortedUsers.slice(0, 10);
  
      // Set the state with the top 10 users
      setUsers(topUsers);
    });
  }, []);
  

  return (
    <>
      <div className="bc">
        <h1 className="header" id="text">
          LEADERBOARD:
        </h1>
        <ul>
          <li>
            <Link to="/">
              <Button name={"BACK"} />
            </Link>
          </li>
        </ul>
        <div className="leaderboard">
          {users.map((user, index) => (
            <div key={user.id}>
              <p className="leaderboard-user">{index + 1}. {user.username} {user.highscore} points</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};



