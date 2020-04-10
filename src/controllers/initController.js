/* eslint-disable max-len */
import sheet from './sheet.js';

import initTable from '../views/initView.js';
import constants from '../utils/constant.js';

export default function initSheet() {
  sheet.init(constants.rowLength, constants.colLength);
  initTable(sheet.corner, sheet.rowHeaders, sheet.colHeaders, sheet.cells, sheet.selectRange.selectType,
    sheet.activeCellCoordinate, sheet.selectRange.selectUpperLeftCoordinate, sheet.selectRange.selectBottomRightCoordinate);
}
