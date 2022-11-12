const Stage = require('stage-js/platform/web');

import snake from './sprites/snake_sprites.png';
import apple from './sprites/apple_sprite/32.png';
import board from './sprites/eat-board.jpg';

function loadTextures() {


  Stage({
    name: 'snake',
    image: {
      src: snake,
      ratio: 1.316
    },
    textures: {
      head_down: { x: 0, y: 0, width: 32, height: 32 },
      body_bot_r: { x: 32, y: 0, width: 32, height: 32 },
      body_bot_l: { x: 64, y: 0, width: 32, height: 32 },
      body_top_r: { x: 32, y: 32, width: 32, height: 32 },
      body_top_l: { x: 64, y: 32, width: 32, height: 32 },
      tail_down: { x: 32, y: 64, width: 32, height: 32 },
      body_line: { x: 64, y: 64, width: 32, height: 32 }
    }
  });
  Stage({
    name: 'apple',
    image: {
      src: apple,
      ratio: 1.316
    },
    textures: {
      apple: { x: 0, y: 0, width: 32, height: 32 },
    }
  });
  Stage({
    name: 'game-board',
    image: {
      src: board,
      ratio: 1
    },
    textures: {
      board: { x: 0, y: 0, width: 416, height: 352 }
    }
  });
};


export { loadTextures };