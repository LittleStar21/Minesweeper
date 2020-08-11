// Beginner 9x9: 10 mines
// Intermediate 16x16: 40 mines
// Advanced 24x24: 99 mines
const width = 24;
const height = 22;
const numOfMines = 99;
const board = document.getElementById("board");

const answerBoard = [];

function startGame() {
	document.addEventListener("contextmenu", (event) => event.preventDefault());
	generateBoard();
	generateMines();
}

function generateBoard() {
	board.innerHTML = "";
	for (let i = 0; i < height; i++) {
		let row = board.insertRow(i);
		for (let j = 0; j < width; j++) {
			let cell = row.insertCell(j);
			cell.setAttribute("width", "25px");
			cell.setAttribute("height", "25px");
			cell.onmousedown = function (event) {
				if (event.button === 0) {
					leftClickCell(cell);
				} else if (event.button === 2) {
					rightClickCell(cell);
				}
			};
			defaultCell(cell);
		}
	}
}

function generateMines() {
	for (let i = 0; i < height; i++) {
		let newRow = [];
		for (let j = 0; j < width; j++) {
			let newCol = new Grid(getRandInt(0, 9));
			newRow.push(newCol);
		}
		answerBoard.push(newRow);
	}
}

function leftClickCell(cell) {
	if (cell.innerHTML !== "") return;

	const row = cell.parentNode.rowIndex;
	const col = cell.cellIndex;
	if (answerBoard[row][col].isMine()) {
		alert("lose");
		animateGameOver(0, 0);
	} else {
		numberCell(cell);
	}
}

function rightClickCell(cell) {
	switch (cell.innerHTML) {
		case "":
			mineCell(cell);
			break;
		case "*":
			questionMarkCell(cell);
			break;
		case "?":
			defaultCell(cell);
			break;
	}
}

function defaultCell(cell) {
	cell.innerHTML = "";
	cell.setAttribute("class", "hidden");
}

function numberCell(cell) {
	const row = cell.parentNode.rowIndex;
	const col = cell.cellIndex;
	const cellNum = answerBoard[row][col].value;
	if (cellNum === 0) {
		cell.innerHTML = "";
	} else {
		cell.innerHTML = cellNum;
	}
	cell.setAttribute("class", "number");
}

function mineCell(cell) {
	cell.innerHTML = "*";
	cell.setAttribute("class", "mine");
}

function questionMarkCell(cell) {
	cell.innerHTML = "?";
	cell.setAttribute("class", "questionMark");
}

function mineGameOverCell(cell) {
	mineCell(cell);
	cell.onmousedown = function (event) {
		return;
	};
}

function animateGameOver(i, j) {
	if (j >= width) {
		j = 0;
		i++;
	}
	if (i >= height) return;

	const cell = document.getElementById("board").rows[i].cells[j];
	if (answerBoard[i][j].isMine()) {
		mineGameOverCell(cell);
	} else {
		numberCell(cell);
	}
	j++;

	setTimeout(function (a, b) {
		animateGameOver(i, j);
	}, 1);
}
