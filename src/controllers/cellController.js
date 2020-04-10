/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import sheet from './sheet.js';
import portray from '../views/portray.js';
import constants from '../utils/constant.js';

const table = document.getElementsByClassName('table');
let startMoveCellFlag = false;
let startCell = null;
function appendInput(inputElement, rows, rect) {
  inputElement.style.width = `${rows[0].getClientRects()[0].width}px`;
  inputElement.style.height = `${rows[0].getClientRects()[0].height}px`;
  inputElement.style.border = '1.5px solid rgb(21, 104, 10)';
  inputElement.style.position = 'fixed';
  inputElement.style.top = `${rect.top}px`;
  inputElement.style.left = `${rect.left}px`;
  inputElement.style.outline = 'none';
  inputElement.style.zIndex = '3';
  table[0].appendChild(inputElement);
  inputElement.focus();
}

function cellText(cell, text) {
  cell.innerText = text;
  if (parseFloat(text).toString() === 'NaN') {
    cell.style.textAlign = 'left';
  } else {
    cell.style.textAlign = 'right';
  }
}

export function cellDbClickHandler(e) {
  const rows = [e.srcElement, e.srcElement.parentElement];
  const rect = e.srcElement.getBoundingClientRect();
  const inputElement = document.createElement('input');
  setTimeout(() => {
    appendInput(inputElement, rows, rect);
  }, 0);
  const cell = e.srcElement;
  const oldText = cell.innerText;
  if (oldText != null) {
    inputElement.value = oldText;
    cell.innerText = null;
  }
  const colIndex = e.target.cellIndex;
  const { rowIndex } = e.srcElement.parentElement;
  inputElement.addEventListener('keydown', (event) => {
    if (event.keyCode === 9) {
      cellText(cell, inputElement.value);
      if (colIndex !== constants.colLength) {
        table[0].rows[rowIndex].children[colIndex + 1].click();
      } else {
        cell.click();
      }
      inputElement.blur();
    } else if (event.keyCode === 13) {
      cellText(cell, inputElement.value);
      if (rowIndex !== constants.rowLength) {
        table[0].rows[rowIndex + 1].children[colIndex].click();
      } else {
        cell.click();
      }
      inputElement.blur();
    }
  }, false);
  inputElement.addEventListener('blur', () => {
    cellText(cell, inputElement.value);
    table[0].removeChild(inputElement);
  }, false);
}

export function cellClickHandler(e) {
  const colIndex = e.target.cellIndex - 1;
  const rowIndex = e.srcElement.parentElement.rowIndex - 1;
  sheet.changeSelectRange('cell', colIndex, rowIndex, colIndex, rowIndex, colIndex, rowIndex);
  portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
    sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
}

function refreshSheet(data) {
  if (data.result) {
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }
}

export function cellDownHandler(e) {
  startCell = e.target;
  startMoveCellFlag = true;
  sheet.initEvent(refreshSheet);
}

export function cellUpHandler() {
  startMoveCellFlag = false;
  sheet.initEvent(null);
}

export function cellMoveHandler(e) {
  if (startMoveCellFlag) {
    const colIndex = e.target.cellIndex;
    const { rowIndex } = e.srcElement.parentElement;
    sheet.changeSelectRange('cell', Math.min(startCell.cellIndex, colIndex) - 1, Math.min(startCell.parentElement.rowIndex, rowIndex) - 1,
      Math.max(startCell.cellIndex, colIndex) - 1, Math.max(startCell.parentElement.rowIndex, rowIndex) - 1,
      startCell.cellIndex - 1, startCell.parentElement.rowIndex - 1);
  }
}
