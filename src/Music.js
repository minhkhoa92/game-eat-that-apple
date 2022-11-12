import morningHasBroken from './music/morning_has_broken_reprise.wav';

function startMusic() {
  let mySound = new Audio(morningHasBroken);
  mySound.volume = 0.05;
  mySound.play();
}
export {startMusic};