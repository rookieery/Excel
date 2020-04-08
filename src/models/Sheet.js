/* eslint-disable max-len */
import RowHeader from './rowHeader.js';

import ColHeader from './colHeader.js';

import Cell from './cell.js';

import Corner from './corner.js';

import SelectRange from './selectRange.js';

import Coordinate from './coordinate.js';

export default class Sheet {
  constructor() {
    this.rowHeaders = [];
    this.colHeaders = [];
    this.cells = []; // Two-dimensional array
    this.corner = new Corner();
    this.activeCellPosition = new Coordinate(0, 0);
    this.boundaryCellPosition = new Coordinate(-1, -1);
    this.selectRange = new SelectRange();
  }

  init(rowCount, colCount) {
    for (let i = 0; i < rowCount; i++) {
      this.rowHeaders[i] = new RowHeader(`${i + 1}`);
    }
    for (let i = 0; i < colCount; i++) {
      this.colHeaders[i] = new ColHeader(String.fromCharCode('A'.charCodeAt() + i));
    }
    for (let i = 0; i < rowCount; i++) {
      this.cells[i] = [];
      for (let j = 0; j < colCount; j++) {
        this.cells[i][j] = new Cell();
      }
    }
  }

  changeSelectRange(selectType, startX, startY, endX, endY, activeCellX, activeCellY) {
    this.selectRange.selectType = selectType;
    this.selectRange.selectPosition[0].x = startX;
    this.selectRange.selectPosition[0].x = startY;
    this.selectRange.selectPosition[1].x = endX;
    this.selectRange.selectPosition[1].y = endY;
    this.activeCellPosition.x = activeCellX;
    this.activeCellPosition.y = activeCellY;
  }

  changeCellText(text) {
    this.cells[this.activeCellPosition.x][this.activeCellPosition.y].text = text;
  }

  // final status
  changeColWidth(index, width, count) {
    if (count === 1) {
      let actualWidth = width;
      if (actualWidth >= 0) {
        this.colHeaders[index].width = actualWidth;
      } else {
        let i = index - 1;
        while (i >= 0 && actualWidth < 0) {
          actualWidth += this.colHeaders[i].width;
          this.colHeaders[i].width = actualWidth >= 0 ? actualWidth : 0;
          i--;
        }
      }
    } else {
      const actualWidth = width < 0 ? 0 : width;
      for (let i = this.selectRange.selectPosition[0].x; i <= this.selectRange.selectPosition[1].x; i++) {
        this.colHeaders[i].width = actualWidth;
      }
    }
  }

  changeRowHeight(index, height, count) {
    if (count === 1) {
      let actualHeight = height;
      if (actualHeight >= 0) {
        this.colHeaders[index].height = actualHeight;
      } else {
        let i = index - 1;
        while (i >= 0 && actualHeight < 0) {
          actualHeight += this.colHeaders[i].width;
          this.colHeaders[i].height = actualHeight >= 0 ? actualHeight : 0;
          i--;
        }
      }
    } else {
      const actualHeight = height < 0 ? 0 : height;
      for (let i = this.selectRange.selectPosition[0].y; i <= this.selectRange.selectPosition[1].y; i++) {
        this.colHeaders[i].height = actualHeight;
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

  addRow(index) {
    this.cells.splice(index, 0, this.createRow());
    this.cells.pop();
  }

  addRows(index, count) {
    if (this.boundaryCellPosition.y + count > this.rowHeaders.length) {
      throw new 'This behavior will delete existing data！'();
    }
    for (let i = 0; i < count; i++) {
      this.addRows(index);
    }
  }

  removeRows(index, count) {
    for (let i = 0; i < count; i++) {
      this.cells.splice(index, 1);
      this.cells.push(this.createRow());
    }
  }

  addCols(index, count) {
    if (this.boundaryCellPosition.x + count > this.colHeaders.length) {
      throw new 'This behavior will delete existing data！'();
    }
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < this.rowHeaders.length; j++) {
        this.cells[j].splice(index, 0, new Cell());
        this.cells[j].pop();
      }
    }
  }

  removeCols(index, count) {
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < this.rowHeaders.length; j++) {
        this.cells[j].splice(index, 1);
        this.cells[j].push(new Cell());
      }
    }
  }
}
