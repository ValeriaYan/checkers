export class Checkers {
    constructor(board) {
        this.board = board;
        this.currentPlayer = this.board.player1;
        this.fillBoard();
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    fillBoard() {
        const newBoard = [
            [null, this.board.getPlayer2(), null, (this.board.getPlayer2()), null, (this.board.getPlayer2()), null, (this.board.getPlayer2())],
            [(this.board.getPlayer2()), null, (this.board.getPlayer2()), null, (this.board.getPlayer2()), null, (this.board.getPlayer2()), null],
            [null, (this.board.getPlayer2()), null, (this.board.getPlayer2()), null, (this.board.getPlayer2()), null, (this.board.getPlayer2())],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [this.board.getPlayer1(), null, this.board.getPlayer1(), null, this.board.getPlayer1(), null, this.board.getPlayer1(), null],
            [null, this.board.getPlayer1(), null, this.board.getPlayer1(), null, this.board.getPlayer1(), null, this.board.getPlayer1()],
            [this.board.getPlayer1(), null, this.board.getPlayer1(), null, this.board.getPlayer1(), null, this.board.getPlayer1(), null],
        ]
        this.board.setBoard(newBoard);
    }

    moveChecker(oldPosition, newPosition) {
        this.board.getBoard()[oldPosition[0]][oldPosition[1]] = null;
        this.board.getBoard()[newPosition[0]][newPosition[1]] = this.currentPlayer;
    }

    deleteChecker(row, col) {
        this.board.getBoard()[row][col] = null;
    }

    switchPlayer() {
        if (this.currentPlayer == this.board.getPlayer1()) {
            this.currentPlayer = this.board.getPlayer2();
        } else {
            this.currentPlayer = this.board.getPlayer1();
        }
    }

    checkWin() {}

    turnIntoQueen() {}

    getAvailableMoves(checkerPosition) {
        let availableMoves = [];
        const rowIndex = checkerPosition[0];
        const colIndex = checkerPosition[1];
        if (this.currentPlayer == this.board.getPlayer1()) {
            if (this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] === null) {
                console.log(rowIndex - 1, colIndex - 1)
                availableMoves.push([rowIndex - 1, colIndex - 1]);
            }
            if (this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] === null) {
                console.log(rowIndex - 1, colIndex + 1)
                availableMoves.push([rowIndex - 1, colIndex + 1]);
            }
        }
        if (this.currentPlayer == this.board.getPlayer2()) {
            if (this.board.getBoard()[rowIndex + 1]?.[colIndex - 1] === null) {
                availableMoves.push([rowIndex + 1, colIndex - 1]);
            }
            if (this.board.getBoard()[rowIndex + 1]?.[colIndex + 1] === null) {
                availableMoves.push([rowIndex + 1, colIndex + 1]);
            }
        }

        return availableMoves;
    }

    getRequireMoves(checkerPosition) {
        let requireMoves = [];
        const rowIndex = checkerPosition[0];
        const colIndex = checkerPosition[1];
        if (this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] !== null && this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex - 2]?.[colIndex - 2] === null) {
                requireMoves.push([rowIndex - 2, colIndex - 2]);
            }
        }
        if (this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] !== null && this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex - 2]?.[colIndex + 2] === null) {
                requireMoves.push([rowIndex - 2, colIndex + 2]);
            }
        }
        if (this.board.getBoard()[rowIndex + 1]?.[colIndex - 1] !== null && this.board.getBoard()[rowIndex + 1]?.[colIndex - 1] !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex + 2]?.[colIndex - 2] === null) {
                requireMoves.push([rowIndex + 2, colIndex - 2]);
            }
        }
        if (this.board.getBoard()[rowIndex + 1]?.[colIndex + 1] !== null && this.board.getBoard()[rowIndex + 1]?.[colIndex + 1] !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex + 2]?.[colIndex + 2] === null) {
                requireMoves.push([rowIndex + 2, colIndex + 2]);
            }
        }

        return requireMoves;
    }
}