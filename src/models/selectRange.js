import Coordinate from './coordinate.js';

export default class SelectRange {
  constructor() {
    this.selectType = 'cell';
    this.selectUpperLeftCoordinate = new Coordinate(0, 0);
    this.selectBottomRightCoordinate = new Coordinate(0, 0);
  }
}
