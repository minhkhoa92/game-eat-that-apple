const Point = require('./js/Point');
const Stage = require('stage-js/platform/web');
const Board = require('./Board.js');
const Textures = require('./Textures.js');
const Direction = require('./js/Direction');
const EnumDirection = require('./js/EnumDirection');
const Music = require('./Music');


const KeyNames = {
  'ArrowLeft': 'left',
  'ArrowUp': 'up',
  'ArrowRight': 'right',
  'ArrowDown': 'down',
  'KeyW': 'up',
  'KeyA': 'left',
  'KeyS': 'down',
  'KeyD': 'right'
};


/**
 * runs the game
 */
function start() {
  Textures.loadTextures();
  Board.init();


  const xStart = 180;
  const xEnd = 180 + (1040 / 2.5);
  const yStart = 199;
  const yEnd = yStart + (858 / 2.5);
  let tileWidth = 16;
  const fieldHeight = 20;
  const fieldWidth = 24;
  let gameTime = 0;
  let timeLastUpdate = 0;
  let activeKey = 'up';
  let tickDurationMillisec = 200;
  const snakeStart = new Point(12, 10);
  const backgroundColor = '#88ee88';



  let snakeData = {};

  let isPaused = false;

  /**
   * generates the object of snakeData with textures, containers, and info of snake part vectors
   * meaning a physical memory of snake in the board
   */
  function generateSnake() {
    snakeData = {
      points: [],
      directions: [],
      nodes: [],
      rootNode: Stage.string(''),
      length: 3
    };
    for (let i = 0; i < 3; i++) {
      snakeData.points.push(new Point(snakeStart.x, snakeStart.y + i));
    }
    for (let i = 0; i < 3; i++) {
      snakeData.directions.push(new Direction(EnumDirection.down, EnumDirection.up));
    }
    const snakeHead = Stage.image('snake:head_down');
    snakeHead.customName = 'head';
    snakeData.nodes.push(snakeHead);
    const snakeBody = Stage.image('snake:body_line');
    snakeBody.customName = 'body';
    snakeData.nodes.push(snakeBody);
    const snakeTail = Stage.image('snake:tail_down');
    snakeData.nodes.push(snakeTail);
    snakeTail.customName = 'tail';
    snakeData.nodes.forEach(function(node) {
      node.scaleTo(tileWidth, tileWidth, 'in');
      snakeData.rootNode.append(node);
    });

  }

  /**
   * gets part of a snake physical part in game length and vector, as well as snake texture info
   * @param {integer} index
   * @returns object
   */
  function getSnakePart(index) {
    return { point: snakeData.points[index], direction: snakeData.directions[index], node: snakeData.nodes[index] };
  }

  /**
   * gets snake head
   * @returns object
   */
  function getHead() {
    return getSnakePart(0);
  }

  /**
   * gets snake tail
   * @returns object
   */
  function getTail() {
    return getSnakePart(snakeData.length - 1);
  }

  /**
     * gets all middle parts of the snake
     * this means the result contains all parts except head and tail
     * @returns array of objects
     */
  function getMiddleBody() {
    let body = [];
    for (let i = 1; i + 1 < snakeData.length; i++) {
      let part = getSnakePart(i);
      body.push(part);
    }
    return body;
  }

  /**
   * draws a snake Part
   * @param {object} node
   * @param {Direction} direction
   * @param {Point} point in the 2D game world
   */
  function drawSnakePart(node, direction, point) {
    const tail = getTail();
    const head = getHead();
    let rotation = Math.PI * (1 + (direction.to / 2));
    if (node === tail.node) {
      rotation = Math.PI * ((direction.to / 2));
    } else if (node != tail.node && node != head.node && !direction.isStraightLine() && !direction.isClockwise()) {
      rotation = Math.PI * (3 / 2 + (direction.to / 2));
    } else if (node != tail.node && node != head.node && !direction.isStraightLine() && direction.isClockwise()) {
      rotation = Math.PI * ((direction.to / 2));
    }
    node.rotate(rotation);
    node.offset(xStart + (1 + point.x) * tileWidth, yStart + (1 + point.y) * tileWidth);
    node.touch();
  }

  /**
   * draws the snake head
   */
  function drawSnakeHead() {
    const head = getHead();
    drawSnakePart(head.node, head.direction, head.point);
  }

  /**
     * draws the snake Tail
     */
  function drawSnakeTail() {
    const tail = getTail();
    drawSnakePart(tail.node, tail.direction, tail.point);

  }

  /**
   * draws the snake Body
   */
  function drawSnakeBody() {
    const body = getMiddleBody();
    body.forEach(function(middleBodyPart) {
      drawSnakePart(middleBodyPart.node, middleBodyPart.direction, middleBodyPart.point);
    });
  }

  /**
   * gets the opposite of a EnumDirection-value
   * @param {EnumDirection} direction
   * @returns EnumDirection
   */
  function getOpposite(direction) {
    switch (direction) {
    case EnumDirection.up:
      return EnumDirection.down;
    case EnumDirection.down:
      return EnumDirection.up;
    case EnumDirection.left:
      return EnumDirection.right;
    case EnumDirection.right:
      return EnumDirection.left;
    default:
      throw ('unexpected direction when calc opposite')
    }
  }

  /**
   * inserts the head-direction at index 0, which is the index for the head
   * @param {EnumDirection} directionTo
   */
  function insertNewHeadDirection(directionTo) {
    const head = getHead();
    const headDirectionFrom = getOpposite(head.direction.to);

    const headDirection = new Direction(headDirectionFrom, directionTo);
    snakeData.directions.splice(0, 0, headDirection);
  }

  /**
   * inserts new head position
   * @param {Point} point in the 2D game world
   */
  function insertNewHeadPoint(point) {
    snakeData.points.splice(0, 0, point);
  }

  // change this to make snake longer by n
  let lengthenSnakeCount = 0;


  /**
   * for same length body changes the body positions, directions
   * because directions and position change may need a new texture, this adapts the textures
   */
  function rebuildMiddleBody() {
    const middleBody = getMiddleBody();
    let bodyPartAfterHead = middleBody[0];

    let bodyNode = undefined;
    if (middleBody.length == 1) {
      snakeData.rootNode.remove(bodyPartAfterHead.node);
      snakeData.nodes.splice(1, 1);
      const tail = getTail();
      snakeData.directions[snakeData.length - 2].from = tail.direction.from;

    } else {
      snakeData.directions[1].from = getOpposite(snakeData.directions[2].to);
    }
    let bodyDirection = snakeData.directions[1];
    if (bodyDirection.isStraightLine()) {
      bodyNode = Stage.image('snake:body_line');
    } else {
      bodyNode = Stage.image('snake:body_top_r');
    }
    bodyNode.customName = 'body';
    bodyNode.scaleTo(tileWidth, tileWidth, 'in');

    snakeData.nodes.splice(1, 0, bodyNode);

    snakeData.rootNode.append(bodyNode);
    if (middleBody.length == 1) {
      return;
    }

    snakeData.rootNode.remove(snakeData.nodes[snakeData.length - 1]);
    snakeData.nodes.splice(snakeData.length - 1, 1);
  }

  /**
   * lengthens the snake
   */
  function addBodyAfterHead() {

    const head = getHead();
    let secondBodyPartAfterHead = getSnakePart(2);
    snakeData.directions[1].to = head.direction.to;
    snakeData.directions[1].from = getOpposite(secondBodyPartAfterHead.direction.to);
    let bodyPartAfterHead = getSnakePart(1);


    let bodyNode = undefined;
    let bodyDirection = bodyPartAfterHead.direction;
    if (bodyDirection.isStraightLine()) {
      bodyNode = Stage.image('snake:body_line');
    } else {
      bodyNode = Stage.image('snake:body_top_r');
    }
    bodyNode.customName = 'body';
    bodyNode.scaleTo(tileWidth, tileWidth, 'in');
    snakeData.nodes.splice(1, 0, bodyNode);
    snakeData.rootNode.append(bodyNode);
  }

  /**
   * changes direction of tail, so it kinda becomes from a possible curve to a straight line
   */
  function setTailDirection() {
    let tail = getTail();
    snakeData.directions[snakeData.length - 1].from = getOpposite(tail.direction.to);
  }

  /**
   * changes head in physical sense, like where it looks to and what the next position is
   * @param {EnumDirection} headDirection
   */
  function moveHead(headDirection) {
    let head = getHead();
    let headPositionX = 0,
      headPositionY = 0;

    insertNewHeadDirection(headDirection);
    switch (headDirection) {
    case EnumDirection.up:
      headPositionY = (head.point.y - 1 + fieldHeight) % fieldHeight;
      insertNewHeadPoint(new Point(head.point.x, headPositionY));
      break;
    case EnumDirection.down:
      headPositionY = (head.point.y + 1) % fieldHeight;
      insertNewHeadPoint(new Point(head.point.x, headPositionY));
      Music.startMusic();
      break;
    case EnumDirection.left:
      headPositionX = (head.point.x - 1 + fieldWidth) % fieldWidth;
      insertNewHeadPoint(new Point(headPositionX, head.point.y));
      break;
    case EnumDirection.right:
      headPositionX = (head.point.x + 1 + fieldWidth) % fieldWidth;
      insertNewHeadPoint(new Point(headPositionX, head.point.y));
      break;
    default:
      break;
    }
  }

  /**
   * moves snake in a new space where the head currently is set to point
   * keeps snake at same length
   * @param {EnumDirection} headDirection
   */
  function moveSnake(headDirection) {
    moveHead(headDirection);
    snakeData.points.splice(snakeData.length, 1);
    const head = getHead();
    // set first Body after Head to different to
    snakeData.directions[1].to = head.direction.to;
    snakeData.directions.splice(snakeData.length, 1);
    setTailDirection();
    rebuildMiddleBody();
  }

  /**
   * move snake when the length of the snake may grow longer
   * @param {EnumDirection} headDirection
   */
  function lengthenSnake(headDirection) {
    moveHead(headDirection);
    addBodyAfterHead();
    snakeData.length++;
  }

  /**
   * moves snake in that direction
   * @param {EnumDirection} headDirection
   * @returns
   */
  function updateSnakeData(headDirection) {
    if (lengthenSnakeCount <= 0) {
      moveSnake(headDirection);
      return;
    }
    lengthenSnake(headDirection);
    lengthenSnakeCount--;
  }

  /**
   * draws the snake, updating the texture with infos from physical positions
   */
  function drawSnake() {
    drawSnakeHead();
    drawSnakeBody();
    drawSnakeTail();
  }

  /**
   * game loop, checks ticks and keeps memory of time elapsed
   * is not run when paused
   * @param {float} elapsedMillisec
   * @returns
   */
  function updateGame(elapsedMillisec) {
    gameTime += elapsedMillisec;
    let headDirection = undefined;
    let head = getHead();
    switch (activeKey) {
    case 'up':
      headDirection = head.direction.to != EnumDirection.down ? EnumDirection.up : head.direction.to;
      break;
    case 'left':
      headDirection = head.direction.to != EnumDirection.right ? EnumDirection.left : head.direction.to;
      break;
    case 'down':
      headDirection = head.direction.to != EnumDirection.up ? EnumDirection.down : head.direction.to;
      break;
    case 'right':
      headDirection = head.direction.to != EnumDirection.left ? EnumDirection.right : head.direction.to;
      break;
    default:
      break;
    }
    const ticksElapsed = Math.floor((gameTime) / tickDurationMillisec) - Math.floor(timeLastUpdate / tickDurationMillisec);
    const nextTick = ticksElapsed >= 1;
    if (!nextTick) {
      return true;
    }
    updateSnakeData(headDirection);
    drawSnake();

    timeLastUpdate = Math.floor((gameTime) / tickDurationMillisec) * tickDurationMillisec;
  }

  /**
   * initializeses the game
   */
  Stage(
    function(stage, display) {
      /**
       * pauses the game
       */
      function pause() {
        stage.pause();
        isPaused = true;
      }

      /**
       * resumes the game
       */
      function resume() {
        stage.resume();

        isPaused = false;
      }

      const rootNode = stage;
      stage.background(backgroundColor);
      Board.setStart(xStart, yStart);
      Board.draw(stage, display);

      generateSnake();
      rootNode.append(snakeData.rootNode);

      drawSnake();



      let activeKeys = Object.assign({}, KeyNames);
      /**
       * checks key to make the snake change direction
       */
      document.addEventListener('keydown', function(event) {
        if (typeof activeKeys[event.code] != 'undefined') {
          activeKey = activeKeys[event.code];
        }
      });
      rootNode.tick(updateGame);
      /**
       * for development
       * adds a possibility to pause the game
       */
      document.addEventListener('mousedown', (event) => {
        if (event.pageX > 598 && !isPaused) {
          pause();
        } else if (event.pageX > 598 && isPaused) {
          resume();
        }
      })
    }
  );
}

export {
  start
};