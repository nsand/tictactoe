(function() {
	'use strict';
	let board = document.getElementById('game-board');
	let status = document.getElementById('status');

	const game = {
		next() {
			this.turn = ++this.turn % 2;
			this.player = this.turn ? 'O' : 'X';
		},
		isDraw() {
			return !this.done && this.moves > 8;
		},
		isDone() {
			return this.done;
		},
		move(r, c) {
			if (this.done) {
				return this.done;
			}

			this.moves++;

			this.table[r][c] = this.turn;

			let win = true;
			// Check for a horizontal win
			for (let i = 0, row = this.table[r]; i < 3; i++) {
				if (row[i] !== this.turn) {
					this.done = false;
					break;
				}
				this.done = true;
			}

			// Check for a vertical win
			if (!this.done) {
				for (let i = 0; i < 3; i++) {
					if (this.table[i][c] !== this.turn) {
						this.done = false;
						break;
					}
					this.done = true;
				}
			}

			if (!this.done && ((c === r && c === 1) || ((r === 0 || r === 2) && (c === 0 || c === 2)))) {
				for (let i = 0; i < 3; i++) {
					if (this.table[i][i] !== this.turn) {
						this.done = false;
						break;
					}
					this.done = true;
				}
				if (!this.done) {
					for (let i = 0; i < 3; i++) {
						if (this.table[i][2 - i] !== this.turn) {
							this.done = false;
							break;
						}
						this.done = true;
					}
				}
			}
			return this.done;
		},
		reset() {
			this.turn = 0;
			this.moves = 0;
			this.player = 'X';
			this.done = false;
			this.table = [];
			for (let i = 0; i < 3; i++) {
				this.table.push(Array(3));
			}
		}
	};

	init();
	document.getElementById('reset').addEventListener('click', init);

	function init() {
		clearBoard();
		game.reset();
		refresh();
	}

	function clearBoard() {
		board.innerHTML = '';
		for (let i = 0; i < 3; i++) {
			let row = document.createElement('div');
			row.setAttribute('class', 'row');
			board.appendChild(row);
			for (let j = 0; j < 3; j++) {
				let n = document.createElement('div');
				n.id = i + ',' + j;
				n.setAttribute('class', 'cell');
				row.appendChild(n);
				n.addEventListener('click', tictac, false);
			}
		}
	}

	function tictac(e) {
		if (!e.target.innerHTML && !game.isDone()) {
			e.target.innerHTML = `<span class="token">${game.player}</span>`;
			const [r, c] = e.target.id.split(',').map((i) => Number(i));

			if (!game.move(r, c)) {
				game.next();
			}
			refresh();
		}
	}

	function refresh() {
		const message = game.isDone() ? `${game.player} wins!` : (game.isDraw() ? 'It\'s a draw!' : `${game.player}\'s turn`);
		status.innerHTML = `<span class="status">${message}</span>`;
	}
}());