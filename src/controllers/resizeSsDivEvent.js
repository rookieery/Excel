import variable from '../utils/variable.js';

import domConstants from '../utils/domConstant.js';

import { hidden, changeDiv } from '../views/divView.js';

let downScreenY = 0;
let newMoveScreenY = 0;
let oldMoveScreenY = 0;
let SDivHeader = null;
let startResizeSsFlag = false;
function resizeSsMoveHandler(e) {
  if (startResizeSsFlag) {
    newMoveScreenY = e.screenY;
    const headerHeight = SDivHeader.getClientRects()[0].height;
    const tableHeight = domConstants.table.getClientRects()[0].height;
    if (oldMoveScreenY === 0) {
      oldMoveScreenY = downScreenY;
    }
    const changedSDiv = headerHeight + (newMoveScreenY - oldMoveScreenY);
    SDivHeader.style.height = changedSDiv < 25 ? `${25}px` : `${changedSDiv}px`;
    domConstants.table.style.height = changedSDiv < 25 ? `${tableHeight}px` : `${tableHeight + (newMoveScreenY - oldMoveScreenY)}px`;
    oldMoveScreenY = newMoveScreenY;
  }
}

function resizeSsUpHandler() {
  changeDiv();
  domConstants.divElement.style.visibility = 'visible';
  domConstants.fixDivElement.style.visibility = 'visible';
  if (variable.startCellFlag) {
    variable.startCellFlag = false;
  }
  if (startResizeSsFlag) {
    startResizeSsFlag = false;
    downScreenY = 0;
    oldMoveScreenY = 0;
    newMoveScreenY = 0;
    SDivHeader = null;
    document.removeEventListener('mousemove', resizeSsMoveHandler, false);
    document.removeEventListener('mouseup', resizeSsUpHandler, false);
  }
}

export default function resizeSsDownHandler(e) {
  hidden();
  document.addEventListener('mousemove', resizeSsMoveHandler, false);
  document.addEventListener('mouseup', resizeSsUpHandler, false);
  SDivHeader = e.srcElement.parentElement.parentElement;
  startResizeSsFlag = true;
  downScreenY = e.screenY;
  domConstants.divElement.style.visibility = 'hidden';
  domConstants.fixDivElement.style.visibility = 'hidden';
}
