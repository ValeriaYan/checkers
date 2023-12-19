import { Notation } from './Notation';
import { ParsingError } from './errors/ParsingError';

export class Game {
    constructor(view, checkers) {
       this.activeChecker = null;
       this.counterAvailableMoves = 0;
       this.startingPosition = null;
       this.checkerWay = [];
       this.checkers = checkers;
       this.view = view;
       this.notation = new Notation(view.getTextarea());
    }

    fillBoard() {
        this.checkers.fillBoard();
        this.view.fillHtmlBoard();
    }
    
    fillExampleBoard() {
        this.checkers.fillExampleBoard();
        this.view.fillHtmlBoard();
    }
    
    parsingNotation() {
        this.checkers.fillBoard();
        const board = this.checkers.getBoard();
        const textarea = this.view.getTextarea();
        const notationRows = textarea.value.split('\n');
        for(let i = 0; i < notationRows.length - 1; i++) {
            const positions = this.notation.turnNotationRowInPositions(notationRows[i]);
            try {
                this.checkers.moveChecker(positions[0], positions[1]);
            } catch (err) {
                if(err instanceof ParsingError) {
                    throw new ParsingError('Parsing error:', err.cause);
                }
            }
            this.switchPlayer();
        }
        this.view.fillHtmlBoard();
    }

    setActiveChecker(checker) {
       if(checker.classList.contains(this.checkers.getCurrentPlayer())) {
        this.activeChecker = checker;
        this.view.setActiveChecker(checker);
        this.view.displayAvailableCells(this.getRequireMoves(checker), this.getAvailableMoves(checker));
        const parent = this.activeChecker.parentNode;
        const position = [+parent.dataset.row, +parent.dataset.col];
        this.startingPosition = [...position];
        this.checkerWay.push({deleted: null, position: this.startingPosition});
       }
    }

    removeActiveChecker() {
        this.view.removeActiveChecker(this.activeChecker);
        this.activeChecker = null;
        this.checkerWay = [];
        this.startingPosition = null;
        this.counterAvailableMoves = 0;
    }

    getAvailableMoves(checker) {
        const checkerPosition = [+checker.parentNode.dataset.row, +checker.parentNode.dataset.col];
        return this.checkers.getAvailableMoves(checkerPosition);
    }

    getRequireMoves(checker) {
        const checkerPosition = [+checker.parentNode.dataset.row, +checker.parentNode.dataset.col];
        return this.checkers.getRequireMoves(checkerPosition)
    }

    async moveChecker(cell) {
        if(this.counterAvailableMoves === 0) {
            const parent = this.activeChecker.parentNode;
            const oldPosition = [+parent.dataset.row, +parent.dataset.col];
            const newPosition = [+cell.dataset.row, +cell.dataset.col];
            if(cell.classList.contains('available')) {
                this.counterAvailableMoves++;
            }
            
            const queen = this.checkers.moveChecker(oldPosition, newPosition);
            const way = this.checkers.getWay(oldPosition, newPosition);
            for(let i = 0; i < way.length; i++) {
                const cell = this.view.getCellByIndex(way[i][0] * 8 + way[i][1])
                if(cell.children[0]) {
                    const deletedChecker = this.deleteChecker(way[i][0], way[i][1]);
                    this.checkerWay.push({deleted: deletedChecker, position: way[i]});
                } else {
                    this.checkerWay.push({deleted: null, position: way[i]});
                }
                await this.view.moveChecker(this.activeChecker, cell);
                this.view.removeAvailableCells();
            }
            if(queen) {
                this.view.turnIntoQueen(this.activeChecker);
            }
            if(this.getRequireMoves(this.activeChecker).length == 0 || this.counterAvailableMoves == 1) {
                this.view.setCompleteBtn();
            } else {
                this.view.displayAvailableCells(this.getRequireMoves(this.activeChecker), this.getAvailableMoves(this.activeChecker));
            }
            this.view.setCancelBtn();
        }
    }
    
    completeMove() {
        this.notation.writeMove(this.checkerWay);
        this.removeActiveChecker();
        this.switchPlayer();
        this.view.removeCompleteBtn();
        this.view.removeCancelBtn();
    }

    async cancelMove() {
        this.view.removeCancelBtn();
        this.view.removeCompleteBtn();
        this.checkers.moveChecker(this.checkerWay[this.checkerWay.length - 1].position, this.startingPosition);
        for(let i = this.checkerWay.length - 1; i >= 0; i--) {
            const index = this.checkerWay[i].position[0] * 8 + this.checkerWay[i].position[1];
            const cell = this.view.getCellByIndex(index)
            await this.view.moveChecker(this.activeChecker, cell);
            if(this.checkerWay[i].deleted) {
                this.returnDeletedChecker(this.checkerWay[i].deleted, this.checkerWay[i].position);
            }
        }
        this.removeActiveChecker();
    }

    switchPlayer() {
        const player = this.checkers.switchPlayer();
        this.view.switchPlayer(player);
        const loss = this.checkers.checkLoss();
        if(loss) {
            const winner = this.checkers.switchPlayer();
            this.view.displayWinnerBlock(winner);
        }
    }

    deleteChecker(row, col) {
        this.view.deleteChecker(row, col);
        return this.checkers.deleteChecker(row, col);
    }

    returnDeletedChecker(checker, position) {
        this.view.returnDeletedChecker(checker, position);
        this.checkers.returnDeletedChecker(checker, position);
    }

    getActiveChecker() {
        return this.activeChecker;
    }

}