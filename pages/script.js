// NOTE
// player pertama selalu O
// player kedua selalu x

//========== selector DOM
const boxes = document.getElementsByClassName("box");
const playButton = document.getElementById("playButton");
const playerName = document.getElementById("playerName");
const playerNumber = document.getElementById("playerNumber");
const landing = document.querySelector(".landing");
const gameHeaderText = document.querySelector(".gameContainer h1");
const turn = document.getElementById("turn");
const restart = document.getElementById("restartButton");
const gameBoard = document.querySelector("div.gameBoard");
const gameContainer = document.querySelector(".gameContainer");
const displayName = document.getElementById("displayName");
const displayTurn = document.getElementById("displayTurn");

//========== function untuk input nama player
let playNum = 1;
let players = [];
function handlePlayerName() {
  if (playNum === 1) {
    if (!playerName.value) {
      alert("Please Insert A Name!");
    } else {
      players.push(playerName.value);
      playerName.value = "";

      playNum = 2;
      playerNumber.textContent = "Second";
      playerNumber.classList.toggle("o");
      playerNumber.classList.toggle("x");
      playButton.textContent = "PLAY 🎮";
    }
  } else {
    // untuk mereset form buat next game dan pindah ke container game
    if (!playerName.value) {
      alert("Please Insert A Name!");
    } else {
      players.push(playerName.value);
      playerName.value = "";

      playNum = 1;

      playerNumber.textContent = "First";
      playerNumber.classList.toggle("o");
      playerNumber.classList.toggle("x");
      playButton.textContent = "GO 🏁";

      landing.classList.toggle("game");
      turn.innerHTML = players[0];
      gameHeaderText.innerHTML = `It's <span class="${currentTurn.toLowerCase()}" id="turn">${
        players[0]
      }</span>'s Turn!`;
      gameContainer.classList.toggle("none");

      displayName.innerHTML = players[0];
      displayTurn.innerHTML = "O";
      displayName.classList.add("o");
      displayTurn.classList.add("o");

      for (const element of boxes) {
        element.style.cursor = "pointer";
        // console.log(element);
      }
    }
  }
}
//========== function handleEnter buat jalanin handlePlayerName dengan 'Enter'
playerName.addEventListener("keydown", function (event) {
  if (event.key === "Enter") handlePlayerName();
});

//========== giliran tic tac toe dan gamestate
let currentTurn = "O";
let gameWin = false;
let gameTie = false;

//========== deklarasi array untuk menyimpan kondisi game pada history game
let gameHistory = ["", "", "", "", "", "", "", "", ""];

//========== update turn text pada function handleBoxClick
function turnText() {
  if (turn.innerHTML === players[0]) {
    turn.innerHTML = players[1];

    turn.classList.toggle("o");
    turn.classList.toggle("x");
    displayName.classList.toggle("o");
    displayName.classList.toggle("x");
    displayTurn.classList.toggle("o");
    displayTurn.classList.toggle("x");

    gameHeaderText.innerHTML = `It's <span class="${currentTurn.toLowerCase()}" id="turn">${
      players[1]
    }</span>'s Turn!`;

    displayName.innerHTML = players[1];
    displayTurn.innerHTML = "X";
  } else {
    turn.innerHTML = players[0];

    turn.classList.toggle("o");
    turn.classList.toggle("x");
    displayName.classList.toggle("o");
    displayName.classList.toggle("x");
    displayTurn.classList.toggle("o");
    displayTurn.classList.toggle("x");

    gameHeaderText.innerHTML = `It's <span class="${currentTurn.toLowerCase()}" id="turn">${
      players[0]
    }</span>'s Turn!`;

    displayName.innerHTML = players[0];
    displayTurn.innerHTML = "O";
  }
}

//========== function untuk mengganti box
function handleBoxClick(event) {
  // deklarasi event
  const currentBox = event.target;

  // mengganti isi text html event
  currentBox.innerText = currentTurn;

  // update kondisi box array gameHistory
  const boxId = currentBox.id[currentBox.id.length - 1];
  gameHistory[boxId] = currentTurn;

  // pemasangan class untuk dekorasi background dan mengganti turn
  if (currentTurn === "X") {
    gameChecker(currentTurn, currentBox);
    currentTurn = "O";
  } else if (currentTurn === "O") {
    gameChecker(currentTurn, currentBox);
    currentTurn = "X";
  }

  // ganti text atas apabila menang
  if (gameWin) {
    if (currentTurn.toLowerCase() === "o") {
      gameHeaderText.innerHTML = `${players[1]} WON!`;
      saveGameResult(players[1]);
    } else {
      gameHeaderText.innerHTML = `${players[0]} WON!`;
      saveGameResult(players[0]);
    }
  } else if (gameTie) {
    gameHeaderText.innerHTML = `DRAW!`;
    saveGameResult("draw");
  } else {
    // ganti tulisan player
    turnText();
  }

  // delete function ini dari box agar tidak bisa diclick lagi
  currentBox.removeEventListener("click", handleBoxClick);
}

//========== function untuk bikin eventListener click box
function makeEventListenerBoxes(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].addEventListener("click", handleBoxClick);
  }
}
//========== function call awal untuk box
makeEventListenerBoxes(boxes);

//========== function untuk delete semua eventListener ketika ada kemenangan/draw
function deleteAllEventListener(boxes) {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].removeEventListener("click", handleBoxClick);
    boxes[i].style.cursor = "default";
  }
}

//========== array kemenangan
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//========== function untuk call function menang dan draw
function gameChecker(currTurn, currBox) {
  currBox.classList.add(currTurn.toLowerCase());
  if (gameStatus()) {
    // alert(`${currTurn} Won!`);
    gameWin = true;
    deleteAllEventListener(boxes);
    gameBoard.classList.toggle("end");
    restart.classList.toggle("game");
  } else if (gameDraw()) {
    gameTie = true;
    deleteAllEventListener(boxes);
    gameBoard.classList.toggle("end");
    restart.classList.toggle("game");
  }
}

//========== function untuk check kondisi menang game setelah setiap click
function gameStatus() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (
      boxes[a].textContent === currentTurn &&
      boxes[b].textContent === currentTurn &&
      boxes[c].textContent === currentTurn
    ) {
      return true;
    }
  }
  return false;
}

//========== function untuk check draw game
function gameDraw() {
  for (let index of boxes) {
    if (index.innerHTML === "") {
      return false;
    }
  }
  return true;
}

//========== function untuk memulai kembali dari awal
function restartGame() {
  9;
  gameBoard.classList.toggle("end");
  restart.classList.toggle("game");
  currentTurn = "O";
  gameWin = false;
  gameTie = false;
  playNum = 1;
  players = [];
  landing.classList.toggle("game");
  gameContainer.classList.toggle("none");

  for (let index of boxes) {
    index.textContent = "";
    index.classList.remove("o");
    index.classList.remove("x");
  }
  makeEventListenerBoxes(boxes);

  displayName.classList.remove("o");
  displayTurn.classList.remove("o");
  displayName.classList.remove("x");
  displayTurn.classList.remove("x");
}

//========== function untuk menyimpan kemenangan pada sessionstorage
function saveGameResult(gameResult) {
  let resultObj = { players: players };
  if (gameResult === "draw") {
    resultObj["result"] = "draw";
  } else {
    resultObj["result"] = gameResult;
  }

  const getStorageData =
    JSON.parse(sessionStorage.getItem("resultHistory")) || [];

  getStorageData.push(resultObj);
  sessionStorage.setItem("resultHistory", JSON.stringify(getStorageData));

  console.log("resultHistory", getStorageData);
}

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("player");
  const volumeSlider = document.getElementById("volumeSlider");

  // Restore previous volume + Init volume, ini saya samakan dengan landing
  const savedVolume = localStorage.getItem("audioVolume");
  audio.volume = savedVolume !== null ? parseFloat(savedVolume) : 0.2;
  volumeSlider.value = audio.volume;

  // Restore previous playback position
  const savedTime = localStorage.getItem("audioTime");
  if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
  }

  // workaround browser yang ga bisa autoplay (cth: chrome)
  document.body.addEventListener("click", function playAudio() {
    console.log("music start");
    audio.play().catch((err) => console.warn("Playback prevented:", err));
    document.body.removeEventListener("click", playAudio);
  });
  // Restore play state
  if (localStorage.getItem("isPlaying") === "true") {
    audio.play().catch((err) => console.warn("Audio playback prevented:", err));
  }

  // Save play state, playback position, and volume
  audio.addEventListener("timeupdate", () => {
    localStorage.setItem("audioTime", audio.currentTime);
  });
  audio.onplay = () => localStorage.setItem("isPlaying", "true");

  volumeSlider.addEventListener("input", () => {
    audio.volume = volumeSlider.value;
    localStorage.setItem("audioVolume", audio.volume);
  });
});
