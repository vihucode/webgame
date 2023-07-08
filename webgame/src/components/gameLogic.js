import userService from "../services/userService";
import categoryService from "../services/categoryService";

import filem from "../miehet.txt";
import filen from "../naiset.txt";
import filek from "../kaikki.txt";

class Session {
  constructor(playAgain) {
    this.playerId = null;
    this.name = "";
    this.timer = 8000;
    this.run = true;
    this.points = 0;
    this.targetTime = 0;
    this.usedNames = [];
    this.nameData = null;
    this.playAgain = playAgain

    this.initialize();
  }

  async initialize() {
    const [name, playerId] = await getActiveUser();
    this.name = name;
    this.playerId = playerId;

    const [catName, catId] = await getActiveCategory();
    this.catName = catName;
    this.catId = catId;

    let response = null;
    switch (catName) {
      case "men":
        document.getElementById("text").innerText = "MALE NAMES";
        response = await fetch(filem);
        break;
      case "women":
        document.getElementById("text").innerText = "FEMALE NAMES";
        response = await fetch(filen);
        break;
      case "all":
        document.getElementById("text").innerText = "ALL NAMES";
        response = await fetch(filek);
        break;
      default:
        response = await fetch(filem);
        break;
    }

    this.nameData = await response.text();
  }

  async playAgain() {
    this.run = true;
    this.points = 0;
    this.usedNames = [];
    stopInterval();
    await this.initialize();
    runTimer(this);
    this.playAgain()
  }
}

const getActiveCategory = async () => {
  try {
    const response = await categoryService.getAll();
    const activeCategory = response.find((cat) => cat.active === true);
    if (activeCategory) {
      return [activeCategory.category, activeCategory.id];
    } else {
      throw new Error("No active category found");
    }
  } catch (error) {
    console.error("Error getting active category:", error);
    // Handle the error appropriately, such as returning a default value or displaying an error message
    return [null, null];
  }
};

const getActiveUser = async () => {
  try {
    const response = await userService.getAll();
    const activeUser = response.find((user) => user.active === true);
    if (activeUser) {
      return [activeUser.username, activeUser.id];
    } else {
      throw new Error("No active user found");
    }
  } catch (error) {
    console.error("Error getting active user:", error);
    // Handle the error appropriately, such as returning a default value or displaying an error message
    return [null, null];
  }
};

let interval;
function runTimer(game, setGame, setShowPlayAgain) {
  document.getElementById("user").disabled = false;
  if (game.run) {
    game.run = false;
  } else {
    return;
  }

  game.targetTime = new Date().getTime() + game.timer;

  // Update the countdown timer every second
  interval = setInterval(function () {
    // Calculate the remaining time
    const now = new Date().getTime();
    const remainingTime = game.targetTime - now;

    const minutes = Math.floor(remainingTime / (1000 * 60));
    let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    // Add leading zero if necessary
    if (seconds < 10) seconds = "0" + seconds;

    // Stop the countdown when time is up or when stopGame is true
    if (remainingTime <= 0) {
      game.run = false;
      if (document.getElementById("user")) {
        document.getElementById("user").disabled = true;
      }
      userService.updateActive(
        game.playerId,
        game.points,
        game.catName,
        false
      );
      categoryService.updateActive(game.catId, false);
      stopInterval(); // Clear the interval when the game is stopped

      // Update the state to show the "Play Again" button
      setGame({ ...game });
      setShowPlayAgain(true);

      return;
    }

    // Update the timer display if the element exists and is accessible
    const timerElement = document.getElementById("timer");
    if (timerElement) {
      timerElement.innerHTML = minutes + ":" + seconds;
    }

    // Update the points display if the element exists and is accessible
    const pointsElement = document.getElementById("points");
    if (pointsElement) {
      pointsElement.innerHTML = game.points;
    }
  }, 1000);
}




function stopInterval() {
  clearInterval(interval);
}

async function nameCheck(game) {
  const name = document
    .getElementById("user")
    .value.toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  if (!name) {
    console.log("No name entered");
    return;
  }

  try {
    const regex = new RegExp(`\\b${name}\\b`, "i");
    if (regex.test(game.nameData) && !game.usedNames.includes(name)) {
      game.points += 50;
      if (game.usedNames.length !== 0) {
        game.timer += 3000;
      }
      game.usedNames.push(name);
      console.log(`${name} exists in the file`);
      game.targetTime = new Date().getTime() + game.timer;
    } else {
      console.log(`${name} does not exist in the file`);
    }
  } catch (error) {
    console.error(error);
  }

  document.getElementById("user").value = "";
}

export { nameCheck, runTimer, Session, stopInterval };


