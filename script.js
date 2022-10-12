//Declare variables
let numberOfPennies = 23;
let info = document.getElementById("info");
let feedback = document.getElementById("feedback");
let pieces = document.getElementById("pieces");
let gameUI = document.getElementById('game-ui')
let chooseDifficulty = document.getElementById('choose-difficulty')
let isComputerTurn = false
let diff;

function setDifficulty(level) {
  diff = level
  chooseDifficulty.style.display = 'none'
  gameUI.style.display = 'block'
}

//not needed line:7

// Updates the UI that displays the pennies 
function displayPennies() {
  pieces.innerHTML = "";
  for (let i = 0; i < numberOfPennies; i++) {
    let penny = `<img src='/img/penny.png' class='penny'>`;
    pieces.innerHTML += penny;
  }
}

// Returns the optimal number of pennies to take away
// If there is not way to force a win, it returns a random number
function bestMove(pennies) {
  const move = (pennies - 1) % 4
  if ( diff === 'impossible' ) {
    return pennies - 1
  } else if ( diff === 'baby' ) {
    return pennies
  }
  return (diff === 'easy' || !move) ? Math.floor(Math.random() * Math.min(pennies, 3)) + 1 : move
}

// Handles move making and updates UI
function makeMove(number) {
  // subtracts the number of pennies specified from the amount left
  numberOfPennies = Math.max(0, numberOfPennies - number)

  const loseMessage = "You took the last penny. You lost..."
  const winMessage = "The computer took the last penny. You win!"

  // if the number of pennies is 0, whoever just took their turn must have taken the last one
  if (numberOfPennies === 0) {
    feedback.innerHTML = `${isComputerTurn ? winMessage : loseMessage} <br/><br/><button onClick='newGame();' style='cursor:pointer;width:100%;'>Play again?</button>`
  }
  else {
    feedback.innerHTML = `${isComputerTurn ? 'The computer' : 'You'} took ${number} penn${number === 1 ? 'y' : 'ies'}. There are now ${numberOfPennies} pennies left.`
  }
  // updates turn
  isComputerTurn = !isComputerTurn
  displayPennies()
}

// function called when a button is clicked specifying how many pennies to take away
function take(number) {
  if (isComputerTurn) return

  makeMove(number)

  if (numberOfPennies === 0) return

  // computer's turn
  setTimeout(() => {
    // computer makes the best move
    makeMove(bestMove(numberOfPennies))
  }, 1000)
}

//Introduce the player to the game
let introduction = "<h3>23 Pennies</h3>";
introduction += "Take turns removing 1, 2, or 3 pennies. ";
introduction += "Whoever takes the last penny loses. ";
info.innerHTML = introduction;

// initialized variables to begin the game
function newGame() {
  numberOfPennies = 23;
  displayPennies();
  feedback.innerHTML = 'Let\'s play 23 pennies!'
  isComputerTurn = false
  chooseDifficulty.style.display = 'block'
  gameUI.style.display = 'none'
}//line:7 not needed

/* Made obsolete by the dark mode button in the bottom right
yours truly :)

function darkMode(){
    document.body.style.background = "#333";
    document.body.style.color = "white";
    document.querySelector("#footer").style.background = "#777";
    document.querySelector("#footer").style.color = "white";
    document.querySelector("#feedback").style.background = "#333";
    document.querySelector("#pieces").style.background = "#777";
    document.querySelectorAll("button").forEach(element => element.style.background = "#333");
    document.querySelectorAll("button").forEach(element => element.style.border="3px solid white");
    document.querySelectorAll("#footer a").forEach(element => element.style.color = "white");
    document.querySelector("#feedback").style.border = "5px white inset";
    document.querySelector("#info").style.border = "5px white inset";
    document.querySelector("#info").style.background = "#333";
}
*/

// let's go!
newGame();
function addDarkmodeWidget(){new Darkmode({label: '🌓'}).showWidget();}
window.addEventListener('load', addDarkmodeWidget);