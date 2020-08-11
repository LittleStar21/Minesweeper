class Grid {
	constructor(value) {
		this.value = value;
		this.revealed = false;
	}
	isMine() {
		return this.value === 9;
	}
}

// Returns random int between minInt and maxInt inclusive
function getRandInt(minInt, maxInt) {
	return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

// Load the board
window.onload = startGame;
