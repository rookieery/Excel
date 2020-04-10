/* eslint-disable max-len */
import sheet from './sheet.js';
import portray from '../views/portray.js';
import constants from '../utils/constant.js';

let startMoveColHeaderFlag = false;
let startColHeader = null;
export function colHeaderClickHandler(e) {
  if (e.target.className === 'resizeE') {
    return;
  }
  const targetCol = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target;
  const colIndex = targetCol.cellIndex - 1;
  sheet.changeSelectRange('colHeader', colIndex, 0, colIndex, constants.rowLength - 1, colIndex, 0);
  portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
    sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
}
function refreshSheet(data) {
  if (data.result) {
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }
}

export function colHeaderDownHandler(e) {
  const targetCol = e.target.tagName === 'SPAN' || e.target.className === 'resizeE' ? e.target.parentElement : e.target;
  startColHeader = targetCol;
  startMoveColHeaderFlag = true;
  sheet.initEvent(refreshSheet);
}

export function colHeaderUpHandler() {
  startMoveColHeaderFlag = false;
  sheet.initEvent(null);
}

export function colHeaderMoveHandler(e) {
  if (startMoveColHeaderFlag) {
    const targetCol = e.target.tagName === 'SPAN' || e.target.className === 'resizeE' ? e.target.parentElement : e.target;
    const colIndex = targetCol.cellIndex;
    sheet.changeSelectRange('colHeader', Math.min(startColHeader.cellIndex, colIndex) - 1, 0,
      Math.max(startColHeader.cellIndex, colIndex) - 1, constants.rowLength - 1,
      startColHeader.cellIndex - 1, 0);
  }
}
