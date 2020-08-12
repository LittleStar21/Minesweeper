const width = 30;
const height = 16;
const board = document.getElementById("board");
let minesRemaining = 99;

window.onload = newGame;

function newGame() {
	document.addEventListener("contextmenu", (event) => event.preventDefault());
	generateBoardAnimation(0);
	setArraySize();
	generateRandMines();
	calculateAllNums();
	updateMineCount();
	console.log(answerBoard);
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
		showNumberSpiral(0, 0, height - 1, width - 1, 0, 2);
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

// 0: right, 1: down, 2: left, 3: up
let leftBorder = -1,
	rightBorder = width,
	topBorder = -1,
	bottomBorder = height;
function showNumberSpiral(i, j, x, y, dir1, dir2) {
	if (leftBorder >= rightBorder && topBorder >= bottomBorder) {
		return;
	}

	const cell1 = board.rows[i].cells[j];
	const cell2 = board.rows[x].cells[y];
	if (!isMine(answerBoard[i][j])) {
		numberCell(cell1);
	}
	if (!isMine(answerBoard[x][y])) {
		numberCell(cell2);
	}

	if (dir1 === 0) {
		j++;
		if (j === rightBorder - 1) {
			topBorder++;
			dir1 = 1;
		}
	} else if (dir1 === 1) {
		i++;
		if (i === bottomBorder - 1) {
			rightBorder--;
			dir1 = 2;
		}
	} else if (dir1 === 2) {
		j--;
		if (j === leftBorder + 1) {
			bottomBorder--;
			dir1 = 3;
		}
	} else {
		i--;
		if (i === topBorder + 1) {
			leftBorder++;
			dir1 = 0;
		}
	}

	if (dir2 === 0) {
		y++;
		if (y === rightBorder - 1) {
			topBorder++;
			dir2 = 1;
		}
	} else if (dir2 === 1) {
		x++;
		if (x === bottomBorder - 1) {
			rightBorder--;
			dir2 = 2;
		}
	} else if (dir2 === 2) {
		y--;
		if (y === leftBorder + 1) {
			bottomBorder--;
			dir2 = 3;
		}
	} else {
		x--;
		if (x === topBorder + 1) {
			leftBorder++;
			dir2 = 0;
		}
	}

	setTimeout(function (a, b, c, d, e, f) {
		showNumberSpiral(i, j, x, y, dir1, dir2);
	}, 3);
}
