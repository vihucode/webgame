/*
Modes:
Normal -> ajallinen, oikeista plussaa ja lisää aikaa
Unique -> jos antaa saman nii tulee miinusta ? ei aikaa ?
*/
import userService from "../services/userService"
import categoryService from "../services/categoryService"

import filem from "../miehet.txt"
import filen from "../naiset.txt"
import filek from "../kaikki.txt"

class Session {
  constructor() {
    this.playerId = null;
    this.name = "";
    this.timer = 5000;
    this.run = true;
    this.points = 0;
    this.targetTime = 0;
    this.userNames = [];

    this.initialize();
  }

  async initialize() {
    const [name, playerId] = await getActiveUser();
    this.name = name;
    this.playerId = playerId;

    const [catName, catId] = await getActiveCategory();
    this.catName = catName;
    this.catId = catId;
  }
}

const getActiveCategory = async () => {
  try {
    const response = await categoryService.getAll();
    const activeCategory = response.find(cat => cat.active === true);
    if (activeCategory) {
      return [activeCategory.category, activeCategory.id];
    } else {
      throw new Error('No active category found');
    }
  } catch (error) {
    console.error('Error getting active category:', error);
    // Handle the error appropriately, such as returning a default value or displaying an error message
    return [null, null];
  }
};

const getActiveUser = async () => {
  try {
    const response = await userService.getAll();
    const activeUser = response.find(user => user.active === true);
    if (activeUser) {
      return [activeUser.username, activeUser.id];
    } else {
      throw new Error('No active user found');
    }
  } catch (error) {
    console.error('Error getting active user:', error);
    // Handle the error appropriately, such as returning a default value or displaying an error message
    return [null, null];
  }
}

function runTimer(game) {
  if (game.run) {
    game.run = false;
  } else {
    return;
  }

  game.targetTime = new Date().getTime() + game.timer;

  // Update the countdown timer every second
  var interval = setInterval(function() {
    // Calculate the remaining time
    var now = new Date().getTime();
    game.timer = game.targetTime - now;

    var minutes = Math.floor(game.timer / (1000 * 60));
    var seconds = Math.floor((game.timer % (1000 * 60)) / 1000);

    // Add leading zero if necessary
    if (seconds < 10) seconds = '0' + seconds;

    // Update the timer display
    document.getElementById('timer').innerHTML = minutes + ':' + seconds;
    document.getElementById('points').innerHTML = game.points;

    // Stop the countdown when time is up
    if (game.timer <= 0) {
      document.getElementById('timer').innerHTML = '0:00'
      document.getElementById('user').disabled = true
      userService.updateActive(game.playerId, game.points, game.catName, false )
      categoryService.updateActive(game.catId, false )
      game.run = false;
      clearInterval(interval);
    }
  }, 1000);
}


async function nameCheck(game) {
  const name = document.getElementById('user').value.toLowerCase().replace(/\b\w/g, letter => letter.toUpperCase());
  if (!name) {
    console.log('No name entered');
    return;
  }
  var response = null;
  try {
    switch (game.catName){
      case "men":
        response = await fetch(filem)
        break;
      case "women":
        response = await fetch(filen)
        break;
      case "all":
        response = await fetch(filek)
        break;
      default:
        response = await fetch(filem)
        break;
    }
    
    const data = await response.text();
    const regex = new RegExp(`\\b${name}\\b`, 'i');
    if (regex.test(data) && !game.userNames.includes(name)) {
      game.points += 50;
      game.timer += 3000;
      game.userNames.push(name);
      console.log(`${name} exists in the file`);
      game.targetTime = new Date().getTime() + game.timer;
    } else {
      console.log(`${name} does not exist in the file`);
    }
  } catch (error) {
    console.error(error);
  }

  document.getElementById('user').value = '';
}




export {nameCheck, runTimer, Session};


