/* eslint-disable max-len */
import Coordinate from './coordinate.js';

export default class SelectRange {
  constructor() {
    this.selectType = 'cell';
    this.selectUpperLeftCoordinate = new Coordinate(0, 0);
    this.selectBottomRightCoordinate = new Coordinate(0, 0);
  }

  equal(selectType, startColIndex, startRowIndex, endColIndex, endRowIndex) {
    return selectType === this.selectType
      && startColIndex === this.selectUpperLeftCoordinate.colIndex && startRowIndex === this.selectBottomRightCoordinate.rowIndex
      && endColIndex === this.selectBottomRightCoordinate.colIndex && endRowIndex === this.selectBottomRightCoordinate.rowIndex;
  }
}
