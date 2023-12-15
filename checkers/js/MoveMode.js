
export class MoveMode {
    constructor(view, checkers) {
       this.activeChecker = null;
       this.startingPosition = null;
       this.counterAvailableMoves = 0;
       this.counterRequireMoves = 0;
       this.checkers = checkers;
       this.view = view;
    }

    setActiveChecker(checker) {
       if(checker.classList.contains(this.checkers.getCurrentPlayer())) {
        this.activeChecker = checker;
        this.view.setActiveChecker(checker);
        this.view.displayAvailableCells(this.getRequireMoves(checker), this.getAvailableMoves(checker));
       }
    }

    removeActiveChecker() {
        if(this.counterAvailableMoves == 0 && this.counterRequireMoves == 0) {
            this.view.removeActiveChecker(this.activeChecker);
            this.activeChecker = null;
            this.startingPosition = null;
            this.counterMoves = 0;
        }
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
        const parent = this.activeChecker.parentNode;
        const oldPosition = [+parent.dataset.row, +parent.dataset.col];
        const newPosition = [+cell.dataset.row, +cell.dataset.col];
        if(cell.classList.contains('available')) {
            this.counterAvailableMoves++;
        }
        if(cell.classList.contains('require')) {
            const rowRemovedChecker = (oldPosition[0] + newPosition[0]) / 2;
            const colRemovedChecker = (oldPosition[1] + newPosition[1]) / 2;
            this.deleteChecker(rowRemovedChecker, colRemovedChecker);
            this.counterRequireMoves++;
        }
        
        this.checkers.moveChecker(oldPosition, newPosition);
        await this.view.moveChecker(this.activeChecker, cell);
        if(this.getRequireMoves(this.activeChecker).length == 0 || this.counterAvailableMoves == 1) {
            console.log(this.getRequireMoves(this.activeChecker).length)
            this.counterAvailableMoves = 0;
            this.counterRequireMoves = 0;
            this.removeActiveChecker();
            this.switchPlayer();
        } else {
            this.setActiveChecker(this.activeChecker);
        }
    }

    switchPlayer() {
        const player = this.checkers.switchPlayer();
        this.view.switchPlayer(player);
        const loss = this.checkers.checkLoss();
        if(loss) {
            this.view.displayWinnerBlock();
        }
    }

    deleteChecker(row, col) {
        this.view.deleteChecker(row, col);
        this.checkers.deleteChecker(row, col);
    }


    completeMove() {}

    cancelMove() {}

    getActiveChecker() {
        return this.activeChecker;
    }

}