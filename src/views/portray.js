/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
const colHeaders = document.getElementsByClassName('colHeader');
const rowHeaders = document.getElementsByClassName('rowHeader');
const corner = document.getElementsByClassName('corner');

function setSelectHeads(headers, upperLeftIndex, bottomRightIndex) {
  for (let i = 0; i < headers.length; i++) {
    if (headers[i].classList.contains('active')) {
      headers[i].classList.remove('active');
    }
    if (headers[i].classList.contains('selected')) {
      headers[i].classList.remove('selected');
    }
    if (i >= upperLeftIndex && i <= bottomRightIndex) {
      headers[i].classList.add('selected');
    }
  }
}

function setActiveHeads(headers, upperLeftIndex, bottomRightIndex) {
  for (let i = 0; i < headers.length; i++) {
    if (headers[i].classList.contains('selected')) {
      headers[i].classList.remove('selected');
    }
    if (headers[i].classList.contains('active')) {
      headers[i].classList.remove('active');
    }
    if (i >= upperLeftIndex && i <= bottomRightIndex) {
      headers[i].classList.add('active');
    }
  }
}

function removeCornerActive() {
  if (corner[0].classList.contains('active')) {
    corner[0].classList.remove('active');
  }
}

function portrayCellEvent(selectUpperLeftCoordinate, selectBottomRightCoordinate) {
  removeCornerActive();
  setSelectHeads(colHeaders, selectUpperLeftCoordinate.colIndex, selectBottomRightCoordinate.colIndex);
  setSelectHeads(rowHeaders, selectUpperLeftCoordinate.rowIndex, selectBottomRightCoordinate.rowIndex);
}

function portrayRowHeaderEvent(selectUpperLeftCoordinate, selectBottomRightCoordinate) {
  removeCornerActive();
  setSelectHeads(colHeaders, selectUpperLeftCoordinate.colIndex, selectBottomRightCoordinate.colIndex);
  setActiveHeads(rowHeaders, selectUpperLeftCoordinate.rowIndex, selectBottomRightCoordinate.rowIndex);
}

function portrayColHeaderEvent(selectUpperLeftCoordinate, selectBottomRightCoordinate) {
  removeCornerActive();
  setSelectHeads(rowHeaders, selectUpperLeftCoordinate.rowIndex, selectBottomRightCoordinate.rowIndex);
  setActiveHeads(colHeaders, selectUpperLeftCoordinate.colIndex, selectBottomRightCoordinate.colIndex);
}

function portrayCornerEvent(selectUpperLeftCoordinate, selectBottomRightCoordinate) {
  corner[0].classList.add('active');
  setActiveHeads(colHeaders, selectUpperLeftCoordinate.colIndex, selectBottomRightCoordinate.colIndex);
  setActiveHeads(rowHeaders, selectUpperLeftCoordinate.rowIndex, selectBottomRightCoordinate.rowIndex);
}
function setSmallFrameText(smallFrame, smallFrameCell) {
  smallFrame.innerText = null;
  const text = smallFrameCell.innerText;
  smallFrame.innerText = text;
  smallFrame.style.lineHeight = `${smallFrame.getBoundingClientRect().height}px`;
  if (parseFloat(text).toString() === 'NaN') {
    smallFrame.style.textAlign = 'left';
  } else {
    smallFrame.style.textAlign = 'right';
  }
}

function portrayFrame(activeCellCoordinate, selectUpperLeftCoordinate, selectBottomRightCoordinate) {
  const bigFrame = document.getElementsByClassName('bigFrame')[0];
  const smallFrame = document.getElementsByClassName('smallFrame')[0];
  const bigFrameUpperLeftCell = document.getElementsByClassName('table')[0]
    .rows[selectUpperLeftCoordinate.rowIndex + 1].children[selectUpperLeftCoordinate.colIndex + 1];
  const bigFrameBottomRightCell = document.getElementsByClassName('table')[0]
    .rows[selectBottomRightCoordinate.rowIndex + 1].children[selectBottomRightCoordinate.colIndex + 1];
  const smallFrameCell = document.getElementsByClassName('table')[0]
    .rows[activeCellCoordinate.rowIndex + 1].children[activeCellCoordinate.colIndex + 1];
  bigFrame.style.height = `${bigFrameBottomRightCell.getBoundingClientRect().bottom - bigFrameUpperLeftCell.getBoundingClientRect().top}px`;
  bigFrame.style.width = `${bigFrameBottomRightCell.getBoundingClientRect().right - bigFrameUpperLeftCell.getBoundingClientRect().left}px`;
  bigFrame.style.top = `${bigFrameUpperLeftCell.offsetTop}px`;
  bigFrame.style.left = `${bigFrameUpperLeftCell.offsetLeft}px`;
  smallFrame.style.width = `${smallFrameCell.offsetWidth - 4}px`;
  smallFrame.style.height = `${smallFrameCell.offsetHeight - 4}px`;
  smallFrame.style.top = `${smallFrameCell.offsetTop + 1.5}px`;
  smallFrame.style.left = `${smallFrameCell.offsetLeft + 1.5}px`;
  setSmallFrameText(smallFrame, smallFrameCell);
}

function portrayBoundary(selectType, selectUpperLeftCoordinate, selectBottomRightCoordinate) {
  // hiddenButtons();
  switch (selectType) {
    case 'cell':
      portrayCellEvent(selectUpperLeftCoordinate, selectBottomRightCoordinate);
      break;
    case 'rowHeader':
      portrayRowHeaderEvent(selectUpperLeftCoordinate, selectBottomRightCoordinate);
      break;
    case 'colHeader':
      portrayColHeaderEvent(selectUpperLeftCoordinate, selectBottomRightCoordinate);
      break;
    case 'corner':
      portrayCornerEvent(selectUpperLeftCoordinate, selectBottomRightCoordinate);
      break;
    default:
      break;
  }
}
export default function portray(selectType, selectUpperLeftCoordinate, selectBottomRightCoordinate, activeCellCoordinate) {
  portrayFrame(activeCellCoordinate, selectUpperLeftCoordinate, selectBottomRightCoordinate);
  portrayBoundary(selectType, selectUpperLeftCoordinate, selectBottomRightCoordinate);
}
