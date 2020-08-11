const board = document.getElementById("board");

window.onload = function () {
	document.addEventListener("contextmenu", (event) => event.preventDefault());
	generateBoard();
	generateRandMines();
};

function isMine(value) {
	return value === 9;
}

function getRandInt(minInt, maxInt) {
	return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
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

function generateRandMines() {
	for (let i = 0; i < height; i++) {
		let tempRow = [];
		for (let j = 0; j < width; j++) {
			tempRow.push(getRandInt(0, 9));
		}
		answerBoard.push(tempRow);
	}
}

function leftClickCell(cell) {
	if (cell.innerHTML !== "") return;

	const row = cell.parentNode.rowIndex;
	const col = cell.cellIndex;
	if (isMine(answerBoard[row][col])) {
		alert("lose");
		gameOver();
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
	const cellNum = answerBoard[row][col];
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

function gameOver() {
	showAllMinesFromTop(0, 0);
	showAllMinesFromBot(height - 1, width - 1);
}

function showAllMinesFromTop(i, j) {
	if (j >= width) {
		j = 0;
		i++;
	}
	if (i > Math.floor(height / 2)) {
		showAllNumbers(0, 0);
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

function showAllNumbers(i, j) {
	if (j >= width) {
		j = 0;
		i++;
	}
	if (i >= height) return;

	const cell = board.rows[i].cells[j];
	if (!isMine(answerBoard[i][j])) {
		numberCell(cell);
	}
	j++;

	setTimeout(function (a, b) {
		showAllNumbers(i, j);
	}, 3);
}
