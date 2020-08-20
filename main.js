const width = 30;
const height = 16;
const board = document.getElementById("board");
let minesRemaining = 99;
let firstMove = true;
let direction = 0;

window.onload = startGame;

function startGame() {
	direction = 0;
	firstMove = true;
	document.addEventListener("contextmenu", (event) => event.preventDefault());
	generateBoardAnimation(0);
	generateRandMines();
	updateMineCount();
}

function newGame() {
	minesRemaining = 99;
	clearBoard();
	startGame();
}

function updateMineCount() {
	document.getElementById("mine-count").innerHTML =
		"Mines: " + minesRemaining;
}

function isRevealed(cell) {
	return cell.getAttribute("class") !== "hidden";
}

function isRevealedMine(i, j) {
	return board.rows[i].cells[j].innerHTML === "*";
}

function isMine(value) {
	return value === 9;
}

function getRandInt(minInt, maxInt) {
	return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

function clearBoard() {
	for (let i = 0; i < height; i++) {
		board.deleteRow(0);
	}
}

function generateBoardAnimation(i) {
	if (i >= height) {
		setMouseProperty();
		return;
	}

	const row = board.insertRow(i);
	for (let j = 0; j < width; j++) {
		const cell = row.insertCell(j);
		cell.setAttribute("width", "30px");
		cell.setAttribute("height", "30px");
		defaultCell(cell);
	}
	i++;

	setTimeout(function (a) {
		generateBoardAnimation(i);
	}, 30);
}

function setMouseProperty() {
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			const cell = board.rows[i].cells[j];
			cell.onmousedown = function (event) {
				if (event.button === 0) {
					leftClickCell(cell);
				} else if (event.button === 2) {
					rightClickCell(cell);
				}
			};
		}
	}
}

function leftClickCell(cell) {
	if (cell.innerHTML !== "") return;

	const row = cell.parentNode.rowIndex;
	const col = cell.cellIndex;

	while (firstMove && isMine(answerBoard[row][col])) {
		generateRandMines();
	}
	firstMove = false;


	if (isMine(answerBoard[row][col])) {
		gameOver();
	} else {
		openCell(row, col);
	}
}

function rightClickCell(cell) {
	switch (cell.innerHTML) {
		case "":
			if (minesRemaining <= 0) return;
			mineCell(cell);
			minesRemaining--;
			break;
		case "*":
			questionMarkCell(cell);
			break;
		case "?":
			defaultCell(cell);
			minesRemaining++;
			break;
	}
	updateMineCount();
}

function defaultCell(cell) {
	cell.innerHTML = "";
	cell.setAttribute("class", "hidden");
}

function numberCell(cell) {
	const row = cell.parentNode.rowIndex;
	const col = cell.cellIndex;

	const cellNum = answerBoard[row][col];
	if (cellNum === 0) {
		cell.innerHTML = "";
	} else {
		cell.innerHTML = cellNum;
		cell.ondblclick = function () {
			doubleClickCell(row, col);
		};
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

function gameOver() {
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			const cell = board.rows[i].cells[j];
			cell.onmousedown = function (event) {
				return;
			};
		}
	}
	showAllMinesFromTop(0, 0);
	showAllMinesFromBot(height - 1, width - 1);
}

function showAllMinesFromTop(i, j) {
	if (j >= width) {
		j = 0;
		i++;
	}
	if (i > Math.floor(height / 2)) {
		showAllNumber(0, 0);
		return;
	}

	const cell = board.rows[i].cells[j];
	if (isMine(answerBoard[i][j])) {
		mineGameOverCell(cell);
	}
	j++;

	setTimeout(function (a, b) {
		showAllMinesFromTop(i, j);
	}, 5);
}

function showAllMinesFromBot(i, j) {
	if (j < 0) {
		j = width - 1;
		i--;
	}
	if (i <= Math.floor(height / 2)) {
		return;
	}

	const cell = board.rows[i].cells[j];
	if (isMine(answerBoard[i][j])) {
		mineGameOverCell(cell);
	}
	j--;

	setTimeout(function (a, b) {
		showAllMinesFromBot(i, j);
	}, 5);
}

// 0: right, 1: left
function showAllNumber(i, j) {
	if (i >= height) {
		return;
	}
	
	const cell = board.rows[i].cells[j];
	if (!isMine(answerBoard[i][j])) {
		numberCell(cell);
	}

	if (direction == 0) {
		j++;
		if (j >= width) {
			direction = 1;
			j = width - 1;
			i++;
		}
	} else {
		j--;
		if (j < 0) {
			direction = 0;
			j = 0;
			i++;
		}
	}

	setTimeout(function() {
		showAllNumber(i, j);
	}, 3);	
}
