// Beginner 9x9: 10 mines
// Intermediate 16x16: 40 mines
// Advanced 24x24: 99 mines
const numOfMines = 99;
let numOfNotMines = width * height - numOfMines;
const answerBoard = [];

function playMinesweeper() {
	setArraySize();
	generateRandMines();
	calculateNums();
	console.log(answerBoard);
}

function setArraySize() {
	for (let i = 0; i < width; i++) {
		answerBoard[i] = new Array(height);
	}
}

function calculateNums() {
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
