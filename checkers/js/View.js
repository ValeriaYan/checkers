
export class View {
    constructor(board) {
        this.htmlBoard = document.querySelector('.board');
        this.htmlCells = document.querySelectorAll('.board__cell');
        this.htmlCurrentPlayer = document.querySelector('.main__player');
        this.winnerBlock = document.querySelector('.winner');
        this.overlay = document.querySelector('.overlay');
        this.newGameBtn = document.querySelector('.main__start-btn');
        this.exampleBtn = document.querySelector('.main__example-btn');
        this.completeMoveBtn = document.querySelector('.main__complete-btn');
        this.cancelMoveBtn = document.querySelector('.main__cancel-btn');
        this.board = board;
    }

    fillHtmlBoard() {
        this.clearBoard();
        for(let i = 0; i < this.board.getBoard().length; i++) {
            for(let j = 0; j < this.board.getBoard()[i].length; j++) {
                if(this.board.getBoard()[i][j]?.getPlayer() == this.board.getPlayer1()) {
                    const checker = this.createCheckerImg(this.board.getPlayer1())
                    this.htmlCells[i * 8 + j].append(checker);
                    if(this.board.getBoard()[i][j]?.getIsQueen()) {
                        this.turnIntoQueen(checker);
                    }
                } 
                if(this.board.getBoard()[i][j]?.getPlayer() == this.board.getPlayer2()) {
                    const checker = this.createCheckerImg(this.board.getPlayer2());
                    this.htmlCells[i * 8 + j].append(checker);
                    if(this.board.getBoard()[i][j]?.getIsQueen()) {
                        this.turnIntoQueen(checker);
                    }
                } 
            }
        }
    }

    clearBoard() {
        this.htmlCells.forEach((cell) => {
            const child = cell.children[0];
            cell.classList.remove('require');
            cell.classList.remove('available');
            if(child) {
                cell.removeChild(child);
            }
        });
    }

    createCheckerImg(typePlayer) {
        const img = document.createElement('img');
        img.className = 'board__checker';
        if(typePlayer == 'white') {
            img.src = '../../assets/checker__white.png';
            img.classList.add('white');
        }
        if(typePlayer == 'black') {
            img.src = '../../assets/checker__black.png';
            img.classList.add('black');
        }
        img.dataset.isActive = false;
        img.dataset.isMoved = false;
    
        return img;
    }

    turnIntoQueen(checker) {
        checker.classList.contains('white') ? checker.src = '../../assets/checker__white-queen.png' : checker.src = '../../assets/checker__black-queen.png';
        checker.classList.add('queen');
    }

    changeParentForChecker(oldCell, newCell, checker) {
        oldCell.classList.remove('checked');
        newCell.classList.add('checked');
        oldCell.removeChild(checker);
        newCell.append(checker);
    }

    async moveChecker(checker, newCell) {
        checker.dataset.isMoved = true;
        const parent = checker.parentNode;
        this.smoothMove(checker, parent, newCell);
        await new Promise((res, rej) => {
            setTimeout(() => res((() => {
                this.changeParentForChecker(parent, newCell, checker);
                checker.style.animation = 'none';
            })()), 150)
        })
    }

    smoothMove(checker, oldCell, newCell) {
        const oldLeft = oldCell.getBoundingClientRect().left;
        const newLeft = newCell.getBoundingClientRect().left;
        const oldTop = oldCell.getBoundingClientRect().top;
        const newTop = newCell.getBoundingClientRect().top;
        if(oldLeft < newLeft && oldTop > newTop) {
            checker.style.animation = 'go-top-right-cell 0.2s'; 
        }

        if(oldLeft > newLeft && oldTop > newTop) {
            checker.style.animation = 'go-top-left-cell 0.2s'; 
        }

        if(oldLeft < newLeft && oldTop < newTop) {
            checker.style.animation = 'go-bottom-right-cell 0.2s'; 
        }

        if(oldLeft > newLeft && oldTop < newTop) {
            checker.style.animation = 'go-bottom-left-cell 0.2s'; 
        }
    }

    displayAvailableCells(requireMoves, availableMoves) {
        this.removeAvailableCells();
        if(requireMoves != 0) {
            for(let i = 0; i < requireMoves.length; i++) {
                const indexCell = requireMoves[i][0] * 8 + requireMoves[i][1];
                this.htmlCells[indexCell].classList.add('require');
            }
        } else {
            for(let i = 0; i < availableMoves.length; i++) {
                const indexCell = availableMoves[i][0] * 8 + availableMoves[i][1];
                this.htmlCells[indexCell].classList.add('available');
            }
        }
    }

    removeAvailableCells() {
        for(let i = 0; i < this.htmlCells.length; i++) {
            this.htmlCells[i].classList.remove('require');
            this.htmlCells[i].classList.remove('available');
        }
    }

    setActiveChecker(checker) {
        checker.dataset.isActive = true;
        const parent = checker.parentNode;
        const indexParent = +parent.dataset.row * 8 + +parent.dataset.col;
        this.blockAllCheckersExceptOne(indexParent);
        parent.classList.add('checked');
    }
    
    removeActiveChecker(checker) {
        checker.dataset.isActive = false;
        checker.dataset.isMoved = false;
        this.unlockAllCheckers();
        const parent = checker.parentNode;
        parent.classList.remove('checked');
        this.removeAvailableCells();
    }

    blockAllCheckersExceptOne(index) {
        for(let i = 0; i < this.htmlCells.length; i++) {
            if(i !== index && this.htmlCells[i].children[0]) {
                this.htmlCells[i].children[0].style.pointerEvents = 'none';
            }
        }
    }

    unlockAllCheckers() {
        for(let i = 0; i < this.htmlCells.length; i++) {
            if(this.htmlCells[i].children[0]) {
                this.htmlCells[i].children[0].style.pointerEvents = 'auto';
            }
        }
    }

    deleteChecker(row, col) {
        const index = row * 8 + col;
        const checker = this.htmlCells[index].children[0];
        this.htmlCells[index].removeChild(checker);
    }

    returnDeletedChecker(checker, position) {
        const htmlChecker = this.createCheckerImg(checker.player);
        if(checker.getIsQueen()) {
            this.turnIntoQueen(htmlChecker);
        }
        this.htmlCells[position].append(htmlChecker);
    }

    getHtmlBoard() {
        return this.htmlBoard
    }

    getCellByIndex(index) {
        return this.htmlCells[index];
    }

    getHtmlCells() {
        return this.htmlCells;
    }

    getWinnerBlock() {
        return this.winnerBlock;
    }

    getOverlay() {
        return this.overlay;
    }

    getNewGameBtn() {
        return this.newGameBtn;
    }

    getExampleBtn() {
        return this.exampleBtn;
    }

    getCompleteBtn() {
        return this.completeMoveBtn;
    }
    getCancelBtn() {
        return this.cancelMoveBtn;
    }

    switchPlayer(player) {
        this.htmlCurrentPlayer.dataset.player = player;
        this.htmlCurrentPlayer.textContent = player;
    }

    displayWinnerBlock(winner) {
        this.winnerBlock.classList.add('active');
        this.winnerBlock.children[0].textContent = winner;
    }

    setCompleteBtn() {
        this.completeMoveBtn.disabled = false;
    }

    removeCompleteBtn() {
        this.completeMoveBtn.disabled = true;
    }

    setCancelBtn() {
        this.cancelMoveBtn.disabled = false;
    }

    removeCancelBtn() {
        this.cancelMoveBtn.disabled = true;
    }
}