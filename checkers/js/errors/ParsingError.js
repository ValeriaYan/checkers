export class ParsingError extends Error {
    constructor(message, cause) {
        super(message);
        this.cause = cause;
        this.name = this.constructor.name;
    }
}

export class PositionDoesNotExist extends ParsingError {
    constructor(position) {
        super('Position does not exist: ' + position);
        this.position = position;
    }
}

export class WrongCheckerInPosition extends ParsingError {
    constructor(position) {
        super('There is no checker or the checker does not belong to the current player on this position: ' + position);
        this.position = position;
    }
}

export class UnavailablePosition extends ParsingError {
    constructor(position) {
        super('The checker cannot move to this position: ' + position);
        this.position = position;
    }
}

export class WrongNewPosition extends ParsingError {
    constructor() {
        super('This position is available, but there are required positions for this checker.');
        this.position = position;
    }
}