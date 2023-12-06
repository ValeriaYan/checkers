
export class View {
    constructor(board) {
        this.htmlBoard = document.querySelector('.board');
        this.htmlCells = document.querySelectorAll('.board__cell');
        this.board = board;
    }

    fillHtmlBoard() {
        for(let i = 0; i < this.board.getBoard().length; i++) {
            for(let j = 0; j < this.board.getBoard()[i].length; j++) {
                if(this.board.getBoard()[i][j] == this.board.getPlayer1()) {
                    this.htmlCells[i * 8 + j].append(this.createCheckerImg(this.board.getPlayer1()));
                } 
                if(this.board.getBoard()[i][j] == this.board.getPlayer2()) {
                    this.htmlCells[i * 8 + j].append(this.createCheckerImg(this.board.getPlayer2()));
                } 
            }
        }
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
    
        return img;
    }

    changeParentForChecker(oldCell, newCell, checker) {
        oldCell.classList.remove('checked');
        oldCell.removeChild(checker);
        newCell.append(checker);
    }

    moveChecker(checker, newCell) {
        const parent = checker.parentNode;
        this.changeParentForChecker(parent, newCell, checker);
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
        const parent = checker.parentNode;
        const indexParent = +parent.dataset.row * 8 + +parent.dataset.col;
        this.blockAllCheckersExceptOne(indexParent);
        parent.classList.add('checked');
    }
    
    removeActiveChecker(checker) {
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

    getHtmlBoard() {
        return this.htmlBoard
    }

    getHtmlCells() {
        return this.htmlCells;
    }
}