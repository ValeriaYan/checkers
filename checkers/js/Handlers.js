export class Handlers {
    constructor(game, view) {
        this.game = game;
        this.view = view;
        this.htmlBoard = view.getHtmlBoard();
        this.htmlCells = view.getHtmlCells();
        this.winnerBlock = view.getWinnerBlock();
        this.overlay = view.getOverlay();
        this.newGameBtn = view.getNewGameBtn();
        this.exampleBtn = view.getExampleBtn();
        this.completeMoveBtn = view.getCompleteBtn();
    }

    start() {
        this.htmlBoard.addEventListener('click', this.checkerClickHandler.bind(this));
        this.htmlBoard.addEventListener('click', this.cellClickHandler.bind(this));
        this.overlay.addEventListener('click', this.overlayClickHandler.bind(this));
        this.newGameBtn.addEventListener('click', this.newGameBtnClickHandler.bind(this));
        this.exampleBtn.addEventListener('click', this.exampleBtnClickHandler.bind(this));
        this.completeMoveBtn.addEventListener('click', this.completeBtnClickHandler.bind(this));
    }

    completeBtnClickHandler() {
        this.game.completeMove();
    }
    
    newGameBtnClickHandler() {
        this.game.fillBoard();
    }

    exampleBtnClickHandler() {
        this.game.fillExampleBoard();
    }

    checkerClickHandler(event) {
        if(event.target.classList.contains(`board__checker`)) {
            if(event.target.dataset.isActive == "false") {
                this.game.setActiveChecker(event.target);
            } else if(event.target.dataset.isActive == "true" && event.target.dataset.isMoved == "false") {
                this.game.removeActiveChecker();
            }
        }
    }

    cellClickHandler(event) {
        if(event.target.classList.contains(`board__cell`) && ((event.target.classList.contains(`available`) || event.target.classList.contains(`require`)))) {
            this.game.moveChecker(event.target);
        }
    }

    overlayClickHandler(event) {
        this.winnerBlock.classList.remove('active');
    }

}

