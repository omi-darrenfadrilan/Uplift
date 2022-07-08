//Declare Variables
const initStones = 4;
const modal = document.querySelector(".modal");
const showModalBtn = document.querySelectorAll(".showModalBtn");
const closeModalBtn = document.querySelector(".closeModalBtn");
const overlay = document.querySelector(".overlay");

let players = {
  0: { stones: [], score: 0 },
  1: { stones: [], score: 0 },
};

let userTurn;
let turnText = document.querySelector("#userTurn");

let player1Score = document.querySelector("#player1score");
let player2Score = document.querySelector("#player2score");

//Create table array
let table = document.querySelector("table");
let rows = [];
rows[0] = document.querySelector("#player1Stones");
rows[1] = document.querySelector("#player2Stones");

let body = document.querySelector("body");


//StartGAME
startGame();

function startGame() {
  for (let i = 0; i < 2; i++) {
    players[i].score = 0;
    for (let j = 0; j < 6; j++) {
      players[i].stones[j] = initStones;
    }
  }
  userTurn = 1;
  updateBoard();
  table.addEventListener("click", addBeans);
}

//Update Board to two sets of player with 6 sets of stones
function updateBoard() {
  for (let i = 0; i < 2; i++)
    for (let j = 0; j < 6; j++) {
      rows[i].children[j].innerHTML = players[i].stones[j];
    }
  turnText.innerHTML = `Player ${userTurn} turn.`;
  player1Score.innerHTML = players[0].score;
  player2Score.innerHTML = players[1].score;
}

function updateCell(row, cell, timer, lastStone) {
  setTimeout(() => {
    function changStyle(element) {
      element.setAttribute(
        "style",
        "border: 4px; color: black; border-style: inset;"
    );
}

//cleanEachBase
function cleanBase() {
    function setAttribute(element) {
        element.setAttribute("style", "border: ; color: ; font-weight: ");
    }
      for (let i = 0; i < 2; i++)
        for (let j = 0; j < 6; j++) {
          setAttribute(rows[i].children[j]);
    }
    setAttribute(player1Score);
    setAttribute(player2Score);
}

cleanBase();


//Non-function (Conditional)
if (cell >= 0 && cell < 6) {
    rows[row].children[cell].innerHTML = players[row].stones[cell];
    player1Score.innerHTML = players[0].score;
    player2Score.innerHTML = players[1].score;
    changStyle(rows[row].children[cell]);
}
if (cell == -1) {
    player1Score.innerHTML = players[0].score;
    changStyle(player1Score);
}
if (cell == 6) {
    player2Score.innerHTML = players[1].score;
    changStyle(player2Score);
}
if (lastStone == 1) {
    setTimeout(() => {
    updateBoard();
    cleanBase();
        table.addEventListener("click", addBeans);
      }, 400);
    }
  }, 400 * timer);
}

//Condition reached gameOver
function isGameOver() {
  let gameOver = true;
  let clearLine;
  let winner;
  for (let i = 0; i < 6; i++) {
    if (players[0].stones[i] != 0) gameOver = false;
  }
  clearLine = gameOver ? 0 : 1;
  otherPlayer = clearLine == 0 ? 1 : 0;
  if (!gameOver) {
    gameOver = true;
    for (let i = 0; i < 6; i++) {
      if (players[1].stones[i] != 0) gameOver = false;
    }
  }
  if (gameOver) {
    for (let i = 0; i < 6; i++)
      players[otherPlayer].score += players[otherPlayer].stones[i]; 
    if (players[0].score == players[1].score)
      turnText.innerHTML = `Players tied`;
    else {
      winner = players[0].score > players[1].score ? 1 : 2;
      turnText.innerHTML = `Player ${winner} is the winner.`;
    }
    table.removeEventListener("click", addBeans);
    button = document.createElement("button");
    button.setAttribute(
        'style',
        ' background-color: #4CAF50; border: none; color: white; padding: 15px 32px; text-align: center;text-decoration: none; display: inline-block; font-size: 16px;'
    )
    button.innerHTML = "New Game";
    button.addEventListener(`click`, () => {
        startGame();
      body.removeChild(button);
    });
    body.appendChild(button);
  }
}

function checkGame() {
  totalStones = 0;
  for (let i = 0; i < 2; i++) {
    totalStones += players[i].score;
    for (let j = 0; j < 6; j++) {
      totalStones += players[i].stones[j];
    }
  }
  if (totalStones != 48) console.log("try catch?");
}

let i = 1;
turnText.addEventListener("click", function () {
  for (let p = 0; p < 100; p++) {
    setTimeout(() => {
      let j = Math.floor(Math.random() * 6);
      rows[0].children[j].click();
      rows[1].children[j].click();
    }, 1000);
  }
});

//jump beans per hole
function addBeans(e) {
  let cell = e.target.cellIndex;
  let row = e.target.parentNode.rowIndex;
  let direction = 0;

  if (players[row].stones[cell] > 0 && row == userTurn - 1) {
    //yoink 
    table.removeEventListener("click", addBeans);
    let currentMoveStones = players[row].stones[cell];
    let timer = 0;
    players[row].stones[cell] = 0;
    //set direction to counterClockWise to upper tableRow
    direction = row == 0 ? -1 : 1;
    userTurn = row == 0 ? 2 : 1;
    currentPlayer = row == 0 ? 0 : 1;
    otherPlayer = row == 0 ? 1 : 0;
    updateCell(row, cell, timer, currentMoveStones);
    cell += direction;

    while (currentMoveStones > 0) {
      timer++;
      if (
        //when finish on empty cell
        currentMoveStones == 1 && 
        currentPlayer == row &&
        players[currentPlayer].stones[cell] == 0
      ) {
        players[currentPlayer].score += players[otherPlayer].stones[cell] + 1;
        players[otherPlayer].stones[cell] = 0;
        updateCell(row, cell, timer, currentMoveStones);
        updateCell(otherPlayer, cell, timer, currentMoveStones);
      } else if (cell >= 0 && cell <= 5 && currentMoveStones > 0) {
        // run the row
        players[row].stones[cell]++;
        updateCell(row, cell, timer, currentMoveStones);
      } else if (cell == -1 || cell == 6) {
        // when gets to a player cell
        if (currentPlayer == row) {
          players[currentPlayer].score++;
          updateCell(row, cell, timer, currentMoveStones);
          if (currentMoveStones == 1) {
            userTurn = userTurn == 1 ? 2 : 1;
          }
        } else {
          currentMoveStones++;
        }
        row = row == 0 ? 1 : 0;
        //set direction to counterClockWise to upper tableRow
        direction = row == 0 ? -1 : 1;
      }
      cell += direction;
      currentMoveStones--;
      goToNextStone = true;
    }
    checkGame();
    isGameOver();
  }
}

//instructions modal
const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

document.addEventListener('keydown', function (closeModal) {
    if(closeModal.key === "Escape") {
      modal.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  }
); 

for(i=0; i < showModalBtn.length; i++) {
  showModalBtn[i].addEventListener("click", openModal);
}

closeModalBtn.addEventListener("click", closeModal);

