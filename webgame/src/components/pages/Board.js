import React, { useEffect, useState } from "react";
import "./style.css";
import Button from '../Button'
import wakeButtons from "../wakeButtons";
import { Link } from "react-router-dom";
import userService from "../../services/userService"

export default function Board() {
  const [users, setUsers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("men");

  useEffect(() => {
    wakeButtons("15%", 21, "65%", 75);

    userService.getAll().then((users) => {
      // Filter users based on the selected category and a non-zero score in that category
      const filteredUsers = users.filter(
        (user) => user.categories[selectedCategory].score > 0
      );

      // Sort the filtered users by their selected category score in descending order
      const sortedUsers = filteredUsers.sort(
        (a, b) => b.categories[selectedCategory].score - a.categories[selectedCategory].score
      );

      // Set the state with the sorted users
      setUsers(sortedUsers);
    });
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <>
      <div className="bc">
        <h1 className="header" id="text">
          LEADERBOARD - {selectedCategory.toUpperCase()}:
        </h1>
        <ul>
          <li>
            <Link to="/">
              <Button name={"BACK"} />
            </Link>
          </li>
        </ul>
        <div className="category-dropdown">
        <label htmlFor="category-select" className="label-style">Select Category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="dropdown-select"
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="all">All</option>
          </select>
        </div>
        <div className="leaderboard">
          {users.map((user, index) => (
            <div key={user.id}>
              <p className="leaderboard-user">
                {index + 1}. {user.username} - {user.categories[selectedCategory].score} points
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}





