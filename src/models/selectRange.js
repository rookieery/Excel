/* eslint-disable max-len */
import Coordinate from './coordinate.js';
import constants from '../utils/constant.js';

export default class SelectRange {
  constructor() {
    this.selectType = constants.cellSelectType;
    this.selectUpperLeftCoordinate = new Coordinate(0, 0);
    this.selectBottomRightCoordinate = new Coordinate(0, 0);
  }

  equal(selectType, startColIndex, startRowIndex, endColIndex, endRowIndex) {
    return selectType === this.selectType
      && startColIndex === this.selectUpperLeftCoordinate.colIndex && startRowIndex === this.selectBottomRightCoordinate.rowIndex
      && endColIndex === this.selectBottomRightCoordinate.colIndex && endRowIndex === this.selectBottomRightCoordinate.rowIndex;
  }
}
