/**
 * remembers directions of a picture
 */
const EnumDirection = require('./EnumDirection')

/**
 * @param {EnumDirection} from
 * @param {EnumDirection} to
 */
function Direction(from, to) {
  this.from = from;
  this.to = to;

}

/**
 * figures out, which way the body part turns
 * @returns bool
 */
function isClockwise() {
  return (this.from == EnumDirection.up && this.to == EnumDirection.left) ||
        (this.from == EnumDirection.left && this.to == EnumDirection.down) ||
        (this.from == EnumDirection.down && this.to == EnumDirection.right) ||
        (this.from == EnumDirection.right && this.to == EnumDirection.up)
}

/**
 * figures out, if the direction is a straight line or a curve
 * @returns boolean
 */
function isStraightLine() {
  return (this.from == EnumDirection.up && this.to == EnumDirection.down) ||
        (this.from == EnumDirection.down && this.to == EnumDirection.up) ||
        (this.from == EnumDirection.right && this.to == EnumDirection.left) ||
        (this.from == EnumDirection.left && this.to == EnumDirection.right);
}

Direction.prototype.isClockwise = isClockwise;
Direction.prototype.isStraightLine = isStraightLine;

module.exports = Direction;