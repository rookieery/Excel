/* eslint-disable max-len */
import sheet from './sheet.js';
import portray from '../views/portray.js';
import constants from '../utils/constant.js';

let startMoveRowHeaderFlag = false;
let startRowHeader = null;
export function rowHeaderClickHandler(e) {
  if (e.target.className === 'resizeS') {
    return;
  }
  const targetRow = e.target.tagName === 'SPAN' ? e.srcElement.parentElement.parentElement : e.srcElement.parentElement;
  const rowIndex = targetRow.rowIndex - 1;
  sheet.changeSelectRange('rowHeader', 0, rowIndex, constants.colLength - 1, rowIndex, 0, rowIndex);
  portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
    sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
}
function refreshSheet(data) {
  if (data.result) {
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }
}

export function rowHeaderDownHandler(e) {
  const targetRow = e.target.tagName === 'SPAN' || e.target.className === 'resizeS' ? e.target.parentElement : e.target;
  startRowHeader = targetRow.parentElement;
  startMoveRowHeaderFlag = true;
  sheet.initEvent(refreshSheet);
}

export function rowHeaderUpHandler() {
  startMoveRowHeaderFlag = false;
  sheet.initEvent(null);
}

export function rowHeaderMoveHandler(e) {
  if (startMoveRowHeaderFlag) {
    const targetRow = e.target.tagName === 'SPAN' || e.target.className === 'resizeS' ? e.target.parentElement : e.target;
    const { rowIndex } = targetRow.parentElement;
    sheet.changeSelectRange('rowHeader', 0, Math.min(startRowHeader.rowIndex, rowIndex) - 1,
      constants.colLength - 1, Math.max(startRowHeader.rowIndex, rowIndex) - 1,
      0, startRowHeader.rowIndex - 1);
  }
}
