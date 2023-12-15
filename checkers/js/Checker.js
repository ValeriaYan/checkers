export class Checker {
    constructor(player) {
        this.player = player;
        this.isQueen = false;
    }

    setQueen() {
        this.isQueen = true;
    }

    getIsQueen() {
        return this.isQueen;
    }

    getPlayer() {
        return this.player;
    }
}