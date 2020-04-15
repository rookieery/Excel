/* eslint-disable max-len */
import RowHeader from './rowHeader.js';

import ColHeader from './colHeader.js';

import Cell from './cell.js';

import Corner from './corner.js';

import SelectRange from './selectRange.js';

import Coordinate from './coordinate.js';
import constants from '../utils/constant.js';

export default class Sheet {
  constructor() {
    this._onDataChangedCallback = null;
    this.rowHeaders = [];
    this.colHeaders = [];
    this.cells = []; // Two-dimensional array
    this.corner = null;
    this.activeCellCoordinate = new Coordinate(0, 0);
    this.boundaryCellCoordinate = new Coordinate(-1, -1);
    this.selectRange = new SelectRange(); // Vice Business
  }

  init(rowCount, colCount) {
    this.corner = new Corner('/');
    for (let i = 0; i < rowCount; i++) {
      this.rowHeaders.push(new RowHeader(`${i + 1}`));
    }
    for (let i = 0; i < colCount; i++) {
      this.colHeaders.push(new ColHeader(String.fromCharCode('A'.charCodeAt() + i)));
    }
    for (let i = 0; i < rowCount; i++) {
      this.cells[i] = [];
      for (let j = 0; j < colCount; j++) {
        this.cells[i].push(new Cell());
      }
    }
  }

  initEvent(onDataChangedCallback) {
    this._onDataChangedCallback = onDataChangedCallback;
  }

  onDataChange(data) {
    if (this._onDataChangedCallback != null) {
      this._onDataChangedCallback(data);
    }
  }

  changeSelectRange(selectType, startColIndex, startRowIndex, endColIndex, endRowIndex, activeCellColIndex, activeCellRowIndex) {
    if (this.selectRange.equal(selectType, startColIndex, startRowIndex, endColIndex, endRowIndex)
      && this.activeCellCoordinate.colIndex === activeCellColIndex && this.activeCellCoordinate.rowIndex === activeCellRowIndex) {
      this.onDataChange({ result: false });
      return;
    }
    this.selectRange.selectType = selectType;
    this.selectRange.selectUpperLeftCoordinate.colIndex = startColIndex;
    this.selectRange.selectUpperLeftCoordinate.rowIndex = startRowIndex;
    this.selectRange.selectBottomRightCoordinate.colIndex = endColIndex;
    this.selectRange.selectBottomRightCoordinate.rowIndex = endRowIndex;
    this.activeCellCoordinate.colIndex = activeCellColIndex;
    this.activeCellCoordinate.rowIndex = activeCellRowIndex;
    this.onDataChange({ result: true });
  }

  updateCellText(colIndex, rowIndex, text) {
    this.activeCellCoordinate.colIndex = colIndex;
    this.activeCellCoordinate.rowIndex = rowIndex;
    this.cells[rowIndex][colIndex].text = text;
    this.boundaryCellCoordinate.colIndex = Math.max(this.boundaryCellCoordinate.colIndex, colIndex);
    this.boundaryCellCoordinate.rowIndex = Math.max(this.boundaryCellCoordinate.rowIndex, rowIndex);
  }

  // final status
  changeColWidth(index, count, width) {
    if (count === 1) {
      this.colHeaders[index].width = width;
    } else {
      const actualWidth = width < constants.colResizeMinWidth ? constants.colResizeMinWidth : width;
      for (let i = index; i < index + count; i++) {
        this.colHeaders[i].width = actualWidth;
      }
    }
  }

  changeRowHeight(index, count, height) {
    if (count === 1) {
      this.rowHeaders[index].height = height;
    } else {
      const actualHeight = height < constants.rowResizeMinHeight ? constants.rowResizeMinHeight : height;
      for (let i = index; i < index + count; i++) {
        this.rowHeaders[i].height = actualHeight;
      }
    }
  }

  createRow() {
    const newCells = [];
    for (let j = 0; j < this.colHeaders.length; j++) {
      newCells[j] = new Cell();
    }
    return newCells;
  }

  resetRowText() {
    for (let i = 0; i < this.rowHeaders.length; i++) {
      this.rowHeaders[i].text = `${i + 1}`;
    }
  }

  addRows(index, count) {
    if (this.boundaryCellCoordinate.rowIndex + count >= this.rowHeaders.length) {
      throw new 'This behavior will delete existing data！'();
    }
    if (index <= this.boundaryCellCoordinate.rowIndex) {
      this.boundaryCellCoordinate.rowIndex += count;
    }
    const height = index === 0 ? 25 : this.rowHeaders[index - 1].height;
    for (let i = 0; i < count; i++) {
      this.cells.splice(index, 0, this.createRow());
      this.cells.pop();
      const newRowHeader = new RowHeader('1');
      newRowHeader.height = height;
      this.rowHeaders.splice(index, 0, newRowHeader);
      this.rowHeaders.pop();
    }
    this.resetRowText();
  }

  getNewRowRowIndex(index) {
    for (let i = index; i >= 0; i--) {
      for (let j = 0; j < this.colHeaders.length; j++) {
        if (this.cells[i][j].text !== '') {
          return i;
        }
      }
    }
    return -1;
  }

  getNewRowColIndex(index) {
    for (let j = this.colHeaders.length - 1; j >= 0; j--) {
      for (let i = 0; i <= index; i++) {
        if (this.cells[i][j].text !== '') {
          return j;
        }
      }
    }
    return -1;
  }

  removeRows(index, count) {
    for (let i = 0; i < count; i++) {
      this.cells.splice(index, 1);
      this.cells.push(this.createRow());
      this.rowHeaders.splice(index, 1);
      this.rowHeaders.push(new RowHeader('1'));
    }
    this.resetRowText();
    if (this.boundaryCellCoordinate.rowIndex >= index + count - 1) {
      this.boundaryCellCoordinate.rowIndex = this.getNewRowRowIndex(index);
      this.boundaryCellCoordinate.colIndex = this.getNewRowColIndex(index);
    }
  }

  resetColText() {
    for (let i = 0; i < this.colHeaders.length; i++) {
      this.colHeaders[i].text = String.fromCharCode('A'.charCodeAt() + i);
    }
  }

  addCols(index, count) {
    if (this.boundaryCellCoordinate.colIndex + count >= this.colHeaders.length) {
      throw new 'This behavior will delete existing data！'();
    }
    if (index <= this.boundaryCellCoordinate.colIndex) {
      this.boundaryCellCoordinate.colIndex += count;
    }
    const width = index === 0 ? 64 : this.colHeaders[index - 1].width;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < this.rowHeaders.length; j++) {
        this.cells[j].splice(index, 0, new Cell());
        this.cells[j].pop();
      }
      const newColHeader = new ColHeader('A');
      newColHeader.width = width;
      this.colHeaders.splice(index, 0, newColHeader);
      this.colHeaders.pop();
    }
    this.resetColText();
  }

  getNewColRowIndex(index) {
    for (let i = this.rowHeaders.length - 1; i >= 0; i--) {
      for (let j = 0; j <= index; j++) {
        if (this.cells[i][j].text !== '') {
          return i;
        }
      }
    }
    return -1;
  }

  getNewColColIndex(index) {
    for (let j = index; j >= 0; j--) {
      for (let i = 0; i < this.rowHeaders.length; i++) {
        if (this.cells[i][j].text !== '') {
          return j;
        }
      }
    }
    return -1;
  }

  removeCols(index, count) {
    const width = index === this.colHeaders.length - 1 ? 64 : this.colHeaders[this.colHeaders.length - 1].width;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < this.rowHeaders.length; j++) {
        this.cells[j].splice(index, 1);
        this.cells[j].push(new Cell());
      }
      const newColHeader = new ColHeader('A');
      newColHeader.width = width;
      this.colHeaders.splice(index, 1);
      this.colHeaders.push(newColHeader);
    }
    this.resetColText();
    if (this.boundaryCellCoordinate.colIndex >= index + count - 1) {
      this.boundaryCellCoordinate.rowIndex = this.getNewColRowIndex(index);
      this.boundaryCellCoordinate.colIndex = this.getNewColColIndex(index);
    }
  }
}
