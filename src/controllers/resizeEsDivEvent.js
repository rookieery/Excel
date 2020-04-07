import variable from '../utils/variable.js';

import domConstants from '../utils/domConstant.js';

import { hidden, changeDiv } from '../views/divView.js';

let downScreenX = 0;
let newMoveScreenX = 0;
let oldMoveScreenX = 0;
let EDivHeader = null;
let startResizeEsFlag = false;
function resizeEsMoveHandler(e) {
  if (startResizeEsFlag) {
    newMoveScreenX = e.screenX;
    const headerWidth = EDivHeader.getClientRects()[0].width;
    const tableWidth = domConstants.table.getClientRects()[0].width;
    if (oldMoveScreenX === 0) {
      oldMoveScreenX = downScreenX;
    }
    const changedEDiv = headerWidth + (newMoveScreenX - oldMoveScreenX);
    EDivHeader.style.width = changedEDiv < 64 ? `${64}px` : `${changedEDiv}px`;
    domConstants.table.style.width = changedEDiv < 64 ? `${tableWidth}px` : `${tableWidth + (newMoveScreenX - oldMoveScreenX)}px`;
    oldMoveScreenX = newMoveScreenX;
  }
}

function resizeEsUpHandler() {
  changeDiv();
  domConstants.divElement.style.visibility = 'visible';
  domConstants.fixDivElement.style.visibility = 'visible';
  if (variable.startCellFlag) {
    variable.startCellFlag = false;
  }
  if (startResizeEsFlag) {
    startResizeEsFlag = false;
    downScreenX = 0;
    oldMoveScreenX = 0;
    newMoveScreenX = 0;
    EDivHeader = null;
    document.removeEventListener('mousemove', resizeEsMoveHandler, false);
    document.removeEventListener('mouseup', resizeEsUpHandler, false);
  }
}

export default function resizeEsDownHandler(e) {
  hidden();
  document.addEventListener('mousemove', resizeEsMoveHandler, false);
  document.addEventListener('mouseup', resizeEsUpHandler, false);
  EDivHeader = e.srcElement.parentElement;
  startResizeEsFlag = true;
  downScreenX = e.screenX;
  domConstants.divElement.style.visibility = 'hidden';
  domConstants.fixDivElement.style.visibility = 'hidden';
}
