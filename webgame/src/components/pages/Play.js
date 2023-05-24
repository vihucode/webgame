import React, { useEffect, useState } from "react"
import "./style.css"
import Button from "../Button"
import wakeButtons from "../wakeButtons"
import { Link } from "react-router-dom"
import userService from "../../services/userService"
import categoryService from "../../services/categoryService"

export default function Play() {
  const [username, setUsername] = useState("")
  const [category, setCategory] = useState("all")
  const [users, setUsers] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    wakeButtons("30%", 25, "36%", 40)
    userService.getAll().then((users) => {
      setUsers(users)
    })
    categoryService.getAll().then((cats) => {
      setCategories(cats)
    })
    
  }, [])
  const handleLogin = async (event) => {
    if (username !== ""){
      const existingUser = users.find((user) => user.username === username);
      const existingCategory = categories.find((cat) => cat.category === category);
  
      if (!existingUser) {
        console.log("creating user with", username);
        const newUser = {
          username: username,
          categories: {
            men: { score: 0 },
            women: { score: 0 },
            all: { score: 0 },
          },
          active: true,
        };
        await userService.login(newUser);
      } else {
        console.log("logging in as", username);
        await userService.updateActive(existingUser.id, null, category, true);
  
      }
    
      await categoryService.updateActive(existingCategory.id, true);
  
          // Wait for user and category updates to complete
      await Promise.all([
        userService.get(username)
      ]);
    
      // Move to the game window
      // Replace the "/game" path with your desired route
      window.location.href = "/game";
    
      setUsername("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
    }
  }

  return (
    <>
      <div className="bc">
        <h1 className="header" id="text">
          GIVE USERNAME:
        </h1>
        <h2 className="cats" id="text">
          NAME CATEGORY
        </h2>
        <div className="button-container">
          <button
            onClick={() => setCategory("men")}
            type="button"
            id="men"
            className="btn cube cube-hover"
          >
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
            <div className="text">MALE</div>
          </button>
          <button
            onClick={() => setCategory("women")}
            type="button"
            id="women"
            className="btn cube cube-hover"
          >
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
            <div className="text">FEMALE</div>
          </button>
          <button
            onClick={() => setCategory("all")}
            type="button"
            id="all"
            className="btn cube cube-hover"
          >
            <div className="bg-top">
              <div className="bg-inner"></div>
            </div>
            <div className="bg-right">
              <div className="bg-inner"></div>
            </div>
            <div className="bg">
              <div className="bg-inner"></div>
            </div>
            <div className="text">ALL</div>
          </button>
        </div>
        <ul>
          <li>
            <Button name={"SUBMIT"} command={handleLogin} />
          </li>
          <li>
            <form id="name">
              <input
                type="text"
                id="user"
                name="user"
                autoComplete="off"
                onChange={({ target }) => {
                  setUsername(target.value);
                }}
                onKeyDown={handleKeyDown}
              ></input>
            </form>
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
}