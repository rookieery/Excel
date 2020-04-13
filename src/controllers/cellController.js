/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import sheet from './sheet.js';
import portray from '../views/portray.js';
import constants from '../utils/constant.js';

export default class Cell {
  constructor() {
    this.table = document.getElementsByClassName('table');
    this.startMoveCellFlag = false;
    this.startCell = null;
  }

  appendInput(inputElement, cell) {
    inputElement.style.width = `${cell.offsetWidth}px`;
    inputElement.style.height = `${cell.offsetHeight}px`;
    inputElement.style.border = '1.5px solid rgb(21, 104, 10)';
    inputElement.style.position = 'absolute';
    inputElement.style.top = `${cell.offsetTop}px`;
    inputElement.style.left = `${cell.offsetLeft}px`;
    inputElement.style.outline = 'none';
    inputElement.style.zIndex = '3';
    this.table[0].appendChild(inputElement);
    inputElement.focus();
  }

  static cellText(cell, text, colIndex, rowIndex) {
    cell.innerText = text;
    sheet.updateCellText(colIndex, rowIndex, text);
    if (parseFloat(text).toString() === 'NaN') {
      cell.style.textAlign = 'left';
    } else {
      cell.style.textAlign = 'right';
    }
  }

  cellDbClickHandler(e) {
    const cell = e.target;
    const inputElement = document.createElement('input');
    setTimeout(() => {
      this.appendInput(inputElement, cell);
    }, 0);
    const oldText = cell.innerText;
    if (oldText != null) {
      inputElement.value = oldText;
      cell.innerText = null;
    }
    const colIndex = e.target.cellIndex;
    const { rowIndex } = e.target.parentElement;
    inputElement.addEventListener('keydown', (event) => {
      if (event.keyCode === 9) {
        if (colIndex !== constants.colLength) {
          this.table[0].rows[rowIndex].children[colIndex + 1].click();
        } else {
          cell.click();
        }
        inputElement.blur();
      } else if (event.keyCode === 13) {
        if (rowIndex !== constants.rowLength) {
          this.table[0].rows[rowIndex + 1].children[colIndex].click();
        } else {
          cell.click();
        }
        inputElement.blur();
      }
    }, false);
    inputElement.addEventListener('blur', () => {
      Cell.cellText(cell, inputElement.value, colIndex - 1, rowIndex - 1);
      this.table[0].removeChild(inputElement);
    }, false);
  }

  static cellClickHandler(e) {
    const colIndex = e.target.cellIndex - 1;
    const rowIndex = e.target.parentElement.rowIndex - 1;
    sheet.changeSelectRange('cell', colIndex, rowIndex, colIndex, rowIndex, colIndex, rowIndex);
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }

  static refreshSheet(data) {
    if (data.result) {
      portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
        sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
    }
  }

  cellDownHandler(e) {
    this.startCell = e.target;
    this.startMoveCellFlag = true;
    sheet.initEvent(Cell.refreshSheet);
  }

  cellUpHandler() {
    this.startMoveCellFlag = false;
    sheet.initEvent(null);
  }

  cellMoveHandler(e) {
    if (this.startMoveCellFlag) {
      const colIndex = e.target.cellIndex;
      const { rowIndex } = e.target.parentElement;
      sheet.changeSelectRange('cell', Math.min(this.startCell.cellIndex, colIndex) - 1, Math.min(this.startCell.parentElement.rowIndex, rowIndex) - 1,
        Math.max(this.startCell.cellIndex, colIndex) - 1, Math.max(this.startCell.parentElement.rowIndex, rowIndex) - 1,
        this.startCell.cellIndex - 1, this.startCell.parentElement.rowIndex - 1);
    }
  }
}
