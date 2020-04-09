/* eslint-disable max-len */
import sheet from './sheet.js';

import initTable from '../views/initView.js';

export default function initSheet() {
  sheet.init(20, 10);
  initTable(sheet.corner, sheet.rowHeaders, sheet.colHeaders, sheet.cells, sheet.selectRange.selectType,
    sheet.activeCellCoordinate, sheet.selectRange.selectUpperLeftCoordinate, sheet.selectRange.selectBottomRightCoordinate);
}
