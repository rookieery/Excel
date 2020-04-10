/* eslint-disable max-len */
import sheet from './sheet.js';
import portray from '../views/portray.js';
import constants from '../utils/constant.js';

export default function cornerClickHandler() {
  sheet.changeSelectRange('corner', 0, 0, constants.colLength - 1, constants.rowLength - 1, 0, 0);
  portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
    sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
}
