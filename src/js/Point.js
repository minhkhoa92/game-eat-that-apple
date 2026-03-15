/**
 * point class for the 2D game board
 */
class Point {
  /**
   * making a 2D point
   * @param {integer} x
   * @param {integer} y
   */
    constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * returns if the point is equal
   * @param {Point} point
   * @returns boolean
   */
  isEqual(point) {
    return this.x == point.x && this.y == point.y;
  }
}



module.exports = Point;