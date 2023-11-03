var board;
var score = 0;
var rows = 4;
var columns = 4;
const btnGame = document.getElementById("game-btn");
const bestScore = document.getElementById("best-score");

window.onload = function () {
  goGame();
  bestResult();
};

function bestResult() {
  best = localStorage.getItem("best-score") || 0;
  bestScore.innerHTML = best;
}

btnGame.addEventListener("click", () => {
  window.document.location.reload();
});

function goGame() {
  board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      let num = board[r][c];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }

  goTwo();
}

function emptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
  return false;
}

function goTwo() {
  if (!emptyTile()) {
    return;
  }

  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * columns);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      tile.innerText = "2";
      tile.classList.add("n2");
      found = true;
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = "";
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add("n" + num.toString());
    } else {
      tile.classList.add("n8192");
    }
  }
}

document.addEventListener("keyup", (e) => {
  if (e.code == "ArrowLeft") {
    moveLeft();
    goTwo();
  } else if (e.code == "ArrowRight") {
    moveRight();
    goTwo();
  } else if (e.code == "ArrowUp") {
    moveUp();
    goTwo();
  } else if (e.code == "ArrowDown") {
    moveDown();
    goTwo();
  }
  document.getElementById("score").innerText = score;
  document.getElementById("best-score").innerText = best;
});

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function move(row) {
  row = filterZero(row);
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] == row[i + 1]) {
      row[i] *= 2;
      row[i + 1] = 0;
      score += row[i];
      best += row[i];
    }
  }

  row = filterZero(row);
  while (row.length < columns) {
    row.push(0);
  }

  return row;
}

function moveLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = move(row);
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function moveRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = move(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < columns; c++) {
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function moveUp() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = move(row);
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function moveDown() {
  for (let c = 0; c < columns; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = move(row);
    row.reverse();

    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(r.toString() + "-" + c.toString());
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
