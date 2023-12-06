import { Board } from "./Board";
import { Checkers } from "./checkers";
import { Handlers } from "./Handlers";
import { MoveMode } from "./MoveMode";
import { View } from "./View";

const board = new Board();
const checkers = new Checkers(board);
const view = new View(board);
const moveMode = new MoveMode(view, checkers);
new Handlers(moveMode, view).start();