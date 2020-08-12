// Beginner 9x9: 10 mines
// Intermediate 16x16: 40 mines
// Advanced 24x24: 99 mines
const numOfMines = 99;
let numOfNotMines = width * height - numOfMines;
let answerBoard = [];

function setArraySize() {
	answerBoard = [];
	for (let i = 0; i < height; i++) {
		let tempRow = [];
		for (let j = 0; j < width; j++) {
			tempRow.push(-1);
		}
		answerBoard.push(tempRow);
	}
}

function calculateAllNums() {
	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (!isMine(answerBoard[i][j])) {
				answerBoard[i][j] = countAdjacentMines(i, j);
			}
		}
	}
}

function countAdjacentMines(i, j) {
	let counter = 0;

	// Top
	if (i > 0) {
		if (isMine(answerBoard[i - 1][j])) counter++;

		// Top-left
		if (j > 0 && isMine(answerBoard[i - 1][j - 1])) counter++;

		// Top-right
		if (j < width - 1 && isMine(answerBoard[i - 1][j + 1])) counter++;
	}

	// Bottom
	if (i < height - 1) {
		if (isMine(answerBoard[i + 1][j])) counter++;

		// Bottom-left
		if (j > 0 && isMine(answerBoard[i + 1][j - 1])) counter++;

		// Bottom-right
		if (j < width - 1 && isMine(answerBoard[i + 1][j + 1])) counter++;
	}

	// Left
	if (j > 0 && isMine(answerBoard[i][j - 1])) counter++;

	// Right
	if (j < width - 1 && isMine(answerBoard[i][j + 1])) counter++;

	return counter;
}

function openCell(i, j) {
	const cell = board.rows[i].cells[j];
	if (isRevealed(cell)) return;

	numberCell(cell);

	if (answerBoard[i][j] !== 0) return;

	// Top
	if (i > 0) {
		openCell(i - 1, j);

		// Top-left
		if (j > 0) openCell(i - 1, j - 1);

		// Top-right
		if (j < width - 1) openCell(i - 1, j + 1);
	}

	// Bottom
	if (i < height - 1) {
		openCell(i + 1, j);

		// Bottom-left
		if (j > 0) openCell(i + 1, j - 1);

		// Bottom-right
		if (j < width - 1) openCell(i + 1, j + 1);
	}

	// Left
	if (j > 0) openCell(i, j - 1);

	// Right
	if (j < width - 1) openCell(i, j + 1);
}

function doubleClickCell(i, j) {
	let numOfRevealedMines = 0;
	let isWrongMine = false;

	if (i > 0) {
		if (isRevealedMine(i - 1, j)) {
			numOfRevealedMines++;
			if (answerBoard[i - 1][j] !== 9) isWrongMine = true;
		}
		if (j > 0 && isRevealedMine(i - 1, j - 1)) {
			numOfRevealedMines++;
			if (answerBoard[i - 1][j - 1] !== 9) isWrongMine = true;
		}
		if (j < width - 1 && isRevealedMine(i - 1, j + 1)) {
			numOfRevealedMines++;
			if (answerBoard[i - 1][j + 1] !== 9) isWrongMine = true;
		}
	}
	if (i < height - 1) {
		if (isRevealedMine(i + 1, j)) {
			numOfRevealedMines++;
			if (answerBoard[i + 1][j] !== 9) isWrongMine = true;
		}
		if (j > 0 && isRevealedMine(i + 1, j - 1)) {
			numOfRevealedMines++;
			if (answerBoard[i + 1][j - 1] !== 9) isWrongMine = true;
		}
		if (j < width - 1 && isRevealedMine(i + 1, j + 1)) {
			numOfRevealedMines++;
			if (answerBoard[i + 1][j + 1] !== 9) isWrongMine = true;
		}
	}
	if (j > 0 && isRevealedMine(i, j - 1)) {
		numOfRevealedMines++;
		if (answerBoard[i][j - 1] !== 9) isWrongMine = true;
	}
	if (j < width - 1 && isRevealedMine(i, j + 1)) {
		numOfRevealedMines++;
		if (answerBoard[i][j + 1] !== 9) isWrongMine = true;
	}

	if (numOfRevealedMines !== answerBoard[i][j]) {
		return;
	}
	if (isWrongMine) {
		gameOver();
		return;
	}

	if (i > 0) {
		leftClickCell(board.rows[i - 1].cells[j]);
		if (j > 0) leftClickCell(board.rows[i - 1].cells[j - 1]);
		if (j < width - 1) leftClickCell(board.rows[i - 1].cells[j + 1]);
	}
	if (i < height - 1) {
		leftClickCell(board.rows[i + 1].cells[j]);
		if (j > 0) leftClickCell(board.rows[i + 1].cells[j - 1]);
		if (j < width - 1) leftClickCell(board.rows[i + 1].cells[j + 1]);
	}
	if (j > 0) {
		leftClickCell(board.rows[i].cells[j - 1]);
	}
	if (j < width - 1) {
		leftClickCell(board.rows[i].cells[j + 1]);
	}
}

function generateRandMines() {
	let curNumOfMines = 0;
	while (curNumOfMines < numOfMines) {
		const i = getRandInt(0, height - 1);
		const j = getRandInt(0, width - 1);

		if (isMine(answerBoard[i][j])) {
			continue;
		}
		answerBoard[i][j] = 9;
		curNumOfMines++;
	}
}
