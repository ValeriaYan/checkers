
export class Game {
    constructor(view, checkers) {
       this.activeChecker = null;
       this.startingPosition = null;
       this.counterAvailableMoves = 0;
       this.checkers = checkers;
       this.view = view;
    }

    fillBoard() {
        this.checkers.fillBoard();
        this.view.fillHtmlBoard();
    }

    fillExampleBoard() {
        this.checkers.fillExampleBoard();
        this.view.fillHtmlBoard();
    }

    setActiveChecker(checker) {
       if(checker.classList.contains(this.checkers.getCurrentPlayer())) {
        this.activeChecker = checker;
        this.view.setActiveChecker(checker);
        this.view.displayAvailableCells(this.getRequireMoves(checker), this.getAvailableMoves(checker));
       }
    }

    removeActiveChecker() {
        this.view.removeActiveChecker(this.activeChecker);
        this.activeChecker = null;
        this.startingPosition = null;
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
                    this.deleteChecker(way[i][0], way[i][1]);
                }
                await this.view.moveChecker(this.activeChecker, cell);
                this.view.removeAvailableCells();
                this.view.setActiveChecker(this.activeChecker);
            }
            if(queen) {
                this.view.turnIntoQueen(this.activeChecker);
            }
            if(this.getRequireMoves(this.activeChecker).length == 0 || this.counterAvailableMoves == 1) {
                this.view.setCompleteBtn();
            } else {
                this.setActiveChecker(this.activeChecker);
            }
        }
    }
    
    completeMove() {
        this.counterAvailableMoves = 0;
        this.removeActiveChecker();
        this.switchPlayer();
        this.view.removeCompleteBtn();
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
        this.checkers.deleteChecker(row, col);
    }



    cancelMove() {}

    getActiveChecker() {
        return this.activeChecker;
    }

}