// Beginner 9x9: 10 mines
// Intermediate 16x16: 40 mines
// Advanced 24x24: 99 mines

const width = 24;
const height = 24;
const numOfMines = 99;
const answerBoard = [];

function countAdjacentMines(i, j) {
	let counter = 0;

	// Top
	if (i > 0) {
		if (isMine(answerBoard[i - 1][j])) counter++;

		// Top-left
		if (j > 0 && isMine(answerBoard[i - 1][j - 1])) counter++;

		// Top-right
		if (j < width - 1 && isMine(answerBoard(i - 1)[j + 1])) counter++;
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
