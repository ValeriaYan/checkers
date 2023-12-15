export class Handlers {
    constructor(moveMode, view) {
        this.moveMode = moveMode;
        this.view = view;
        this.htmlBoard = view.getHtmlBoard();
        this.htmlCells = view.getHtmlCells();
        this.winnerBlock = view.getWinnerBlock();
        this.overlay = view.getOverlay();
    }

    start() {
        this.htmlBoard.addEventListener('click', this.checkerClickHandler.bind(this));
        this.htmlBoard.addEventListener('click', this.cellClickHandler.bind(this));
        this.overlay.addEventListener('click', this.overlayClickHandler.bind(this));
        this.view.fillHtmlBoard();
    }

    checkerClickHandler(event) {
        if(event.target.classList.contains(`board__checker`)) {
            if(!event.target.parentNode.classList.contains(`checked`)) {
                this.moveMode.setActiveChecker(event.target);
            } else {
                this.moveMode.removeActiveChecker();
            }
        }
    }

    cellClickHandler(event) {
        if(event.target.classList.contains(`board__cell`) && (event.target.classList.contains(`available`) || event.target.classList.contains(`require`))) {
            this.moveMode.moveChecker(event.target);
        }
    }

    overlayClickHandler(event) {
        this.winnerBlock.classList.remove('active');
    }

}

