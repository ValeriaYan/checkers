import { Checker } from './Checker';

export class Checkers {
    constructor(board) {
        this.board = board;
        this.currentPlayer = this.board.player1;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    fillBoard() {
        const newBoard = [
            [null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2())],
            [new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null],
            [null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2()), null, new Checker(this.board.getPlayer2())],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null],
            [null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1())],
            [new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null, new Checker(this.board.getPlayer1()), null],
        ]
        this.board.setBoard(newBoard);
    }

    moveChecker(oldPosition, newPosition) {
        const checker = this.board.getBoard()[oldPosition[0]][oldPosition[1]];
        this.board.getBoard()[oldPosition[0]][oldPosition[1]] = null;
        this.board.getBoard()[newPosition[0]][newPosition[1]] = checker;
        if(newPosition[0] == 0 && checker.getPlayer() == this.board.getPlayer1()) {
            checker.setQueen();
            return true;
        }
        if(newPosition[0] == 7 && checker.getPlayer() == this.board.getPlayer2()) {
            checker.setQueen();
            return true;
        }
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

        return this.currentPlayer;
    }

    checkLoss() {
        const checkers = this.getAllPlayerCheckers(this.currentPlayer);
        if(checkers.length == 0) {
            return true;
        }

        for(let i = 0; i < checkers.length; i++) {
            if(this.getAvailableMoves(checkers[i]).length !== 0 || this.getRequireMoves(checkers[i]).length !== 0) {
                return false;
            }
        }

        return true;
    }

    getAvailableMoves(checkerPosition) {
        let availableMoves = [];
        const rowIndex = checkerPosition[0];
        const colIndex = checkerPosition[1];

        if(this.board.getBoard()[rowIndex][colIndex]?.getIsQueen()) {
            return this.getAvailableMovesForQueen(checkerPosition);
        }

        if (this.currentPlayer == this.board.getPlayer1()) {
            if (this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] === null) {
                availableMoves.push([rowIndex - 1, colIndex - 1]);
            }
            if (this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] === null) {
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

        if(this.board.getBoard()[rowIndex][colIndex]?.getIsQueen()) {
            return this.getRequireMovesForQueen(checkerPosition);
        }

        if (this.board.getBoard()[rowIndex - 1]?.[colIndex - 1] !== null && this.board.getBoard()[rowIndex - 1]?.[colIndex - 1]?.getPlayer() !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex - 2]?.[colIndex - 2] === null) {
                requireMoves.push([rowIndex - 2, colIndex - 2]);
            }
        }
        if (this.board.getBoard()[rowIndex - 1]?.[colIndex + 1] !== null && this.board.getBoard()[rowIndex - 1]?.[colIndex + 1]?.getPlayer() !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex - 2]?.[colIndex + 2] === null) {
                requireMoves.push([rowIndex - 2, colIndex + 2]);
            }
        }
        if (this.board.getBoard()[rowIndex + 1]?.[colIndex - 1] !== null && this.board.getBoard()[rowIndex + 1]?.[colIndex - 1]?.getPlayer() !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex + 2]?.[colIndex - 2] === null) {
                requireMoves.push([rowIndex + 2, colIndex - 2]);
            }
        }
        if (this.board.getBoard()[rowIndex + 1]?.[colIndex + 1] !== null && this.board.getBoard()[rowIndex + 1]?.[colIndex + 1]?.getPlayer() !== this.currentPlayer) {
            if (this.board.getBoard()[rowIndex + 2]?.[colIndex + 2] === null) {
                requireMoves.push([rowIndex + 2, colIndex + 2]);
            }
        }

        return requireMoves;
    }

    getAllPlayerCheckers(player) {
        const checkers = [];
        const board = this.board.getBoard();
        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[i].length; j++) {
                if(board[i][j]?.getPlayer() == player) {
                    checkers.push([i, j]);
                }
            }
        }

        return checkers;
    }

    getAvailableMovesForQueen(checkerPosition) {
        const row = checkerPosition[0];
        const col = checkerPosition[1];
        const diagonal1 = [[row - 1, col - 1], [row - 2, col - 2], [row - 3, col - 3], [row - 4, col - 4], [row - 5, col - 5], [row - 6, col - 6], [row - 7, col - 7]];
        const diagonal2 = [[row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3], [row - 4, col + 4], [row - 5, col + 5], [row - 6, col + 6], [row - 7, col + 7]];
        const diagonal3 = [[row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3], [row + 4, col + 4], [row + 5, col + 5], [row + 6, col + 6], [row + 7, col + 7]];
        const diagonal4 = [[row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3], [row + 4, col - 4], [row + 5, col - 5], [row + 6, col - 6], [row + 7, col - 7]];

        const movesForDiagonal1 = this.getAvailableMovesOnDiagonal(diagonal1);
        const movesForDiagonal2 = this.getAvailableMovesOnDiagonal(diagonal2);
        const movesForDiagonal3 = this.getAvailableMovesOnDiagonal(diagonal3);
        const movesForDiagonal4 = this.getAvailableMovesOnDiagonal(diagonal4);

        return [...movesForDiagonal1, ...movesForDiagonal2, ...movesForDiagonal3, ...movesForDiagonal4];
    }

    getAvailableMovesOnDiagonal(diagonal) {
        const availableMoves = [];
        for(let i = 0; i < diagonal.length; i++) {
            const cell = diagonal[i];
            if(this.board.getBoard()?.[cell[0]]?.[cell[1]] === null) {
                availableMoves.push(cell);
            } else {
                return availableMoves;
            }
        }

        return availableMoves;
    }

    getRequireMovesForQueen(checkerPosition) {
        const row = checkerPosition[0];
        const col = checkerPosition[1];
        const diagonal1 = [[row - 1, col - 1], [row - 2, col - 2], [row - 3, col - 3], [row - 4, col - 4], [row - 5, col - 5], [row - 6, col - 6], [row - 7, col - 7]];
        const diagonal2 = [[row - 1, col + 1], [row - 2, col + 2], [row - 3, col + 3], [row - 4, col + 4], [row - 5, col + 5], [row - 6, col + 6], [row - 7, col + 7]];
        const diagonal3 = [[row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3], [row + 4, col + 4], [row + 5, col + 5], [row + 6, col + 6], [row + 7, col + 7]];
        const diagonal4 = [[row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3], [row + 4, col - 4], [row + 5, col - 5], [row + 6, col - 6], [row + 7, col - 7]];

        const moveForDiagonal1 = this.getRequireMovesOnDiagonal(diagonal1);
        const moveForDiagonal2 = this.getRequireMovesOnDiagonal(diagonal2);
        const moveForDiagonal3 = this.getRequireMovesOnDiagonal(diagonal3);
        const moveForDiagonal4 = this.getRequireMovesOnDiagonal(diagonal4);

        return [...moveForDiagonal1, ...moveForDiagonal2, ...moveForDiagonal3, ...moveForDiagonal4];
    }

    getRequireMovesOnDiagonal(diagonal) {
        const requireMove = [];
        for(let i = 0; i < diagonal.length; i++) {
            const cell = diagonal[i];
            if(this.board.getBoard()?.[cell[0]]?.[cell[1]] != null && 
                this.board.getBoard()?.[cell[0]]?.[cell[1]]?.getPlayer() !== this.currentPlayer && 
                this.board.getBoard()?.[diagonal[i + 1][0]]?.[diagonal[i + 1][1]] === null) {
                    requireMove.push(diagonal[i + 1]);
            }
        }

        return requireMove;
    }

    getWay(startPosition, endPosition) {
        const way = []
        if(startPosition[0] > endPosition[0] && startPosition[1] > endPosition[1]) {
            for(let i = startPosition[0]; i > endPosition[0]; i--) {
                way.push([--startPosition[0], --startPosition[1]])
            }
        }
        if(startPosition[0] > endPosition[0] && startPosition[1] < endPosition[1]) {
            for(let i = startPosition[0]; i > endPosition[0]; i--) {
                way.push([--startPosition[0], ++startPosition[1]])
            }
        }
        if(startPosition[0] < endPosition[0] && startPosition[1] > endPosition[1]) {
            for(let i = startPosition[0]; i < endPosition[0]; i++) {
                way.push([++startPosition[0], --startPosition[1]])
            }
        }
        if(startPosition[0] < endPosition[0] && startPosition[1] < endPosition[1]) {
            for(let i = startPosition[0]; i < endPosition[0]; i++) {
                way.push([++startPosition[0], ++startPosition[1]])
            }
        }

        return way;
    }
}