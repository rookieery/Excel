import Coordinate from './coordinate.js';

export default class SelectRange {
  constructor() {
    this.selectType = '';
    this.selectPosition = [new Coordinate(0, 0), new Coordinate(0, 0)];
  }
}
