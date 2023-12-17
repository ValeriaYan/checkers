import { Board } from "./Board";
import { Checkers } from "./checkers";
import { Handlers } from "./Handlers";
import { Game } from "./Game";
import { View } from "./View";

const board = new Board();
const checkers = new Checkers(board);
const view = new View(board);
const game = new Game(view, checkers);
new Handlers(game, view).start();