/**
 * logic for board
 * considering refactor name to stage or field
 */
const Stage = require('stage-js/platform/web');

let board;
let xStart = 0,
  yStart = 0;

/**
   * sets up the image for the board, needs to be run first
   * actually depends on the texture-library being initialized - don't smite me decoupling god
   */
function init() {
  board = Stage.image('game-board:board');
}

/**
 * sets the starting point of the board on the canvas
 * @param {float} x
 * @param {float} y
 */
function setStart(x, y) {
  xStart = x;
  yStart = y;
  board.offset(xStart, yStart);
  board.touch();
}

/**
 * draws the board on the canvas
 * @param {object} stage canvas, on which the board is drawn
 * @returns
 */
function draw(stage) {

  const rootNode = stage;
  board.offset(xStart, yStart);
  rootNode.append(board);
  return board;
}

export {draw, setStart, init};
