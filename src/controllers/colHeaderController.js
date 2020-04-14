/* eslint-disable max-len */
import sheet from './sheet.js';
import portray from '../views/portray.js';
import constants from '../utils/constant.js';
import { updateColData } from '../views/updateData.js';

export default class ColHeaderController {
  constructor() {
    this.startMoveColHeaderFlag = false;
    this.startColHeader = null;
    this.endColHeader = null;
  }

  addColHeaderHandler() {
    if (sheet.selectRange.selectType !== 'colHeader') {
      return;
    }
    try {
      sheet.addCols(Math.min(this.startColHeader.cellIndex, this.endColHeader.cellIndex) - 1,
        Math.abs(this.startColHeader.cellIndex - this.endColHeader.cellIndex) + 1);
    } catch (e) {
      alert('此操作会被动删除已有数据！');
    }
    updateColData(sheet.colHeaders, sheet.cells);
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
    ColHeaderController.hiddenButtons();
  }

  removeColHeaderHandler() {
    if (sheet.selectRange.selectType !== 'colHeader') {
      return;
    }
    sheet.removeCols(Math.min(this.startColHeader.cellIndex, this.endColHeader.cellIndex) - 1,
      Math.abs(this.startColHeader.cellIndex - this.endColHeader.cellIndex) + 1);
    updateColData(sheet.colHeaders, sheet.cells);
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
    ColHeaderController.hiddenButtons();
  }

  static colHeaderClickHandler(e) {
    if (e.target.className === 'resizeE') {
      return;
    }
    const targetCol = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target;
    const colIndex = targetCol.cellIndex - 1;
    sheet.changeSelectRange('colHeader', colIndex, 0, colIndex, constants.rowLength - 1, colIndex, 0);
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }

  static refreshSheet(data) {
    if (data.result) {
      portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
        sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
    }
  }

  colHeaderDownHandler(e) {
    if (e.target.className === 'resizeE') {
      return;
    }
    const targetCol = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target;
    if (e.button === 2) {
      if (this.startColHeader === null || this.endColHeader === null || sheet.selectRange.selectType !== 'colHeader'
        || (targetCol.cellIndex - this.startColHeader.cellIndex) * (targetCol.cellIndex - this.endColHeader.cellIndex) > 0) {
        this.startColHeader = targetCol;
        this.endColHeader = targetCol;
        // ColHeaderController.colHeaderClickHandler(e);
        targetCol.click();
      }
      document.getElementsByClassName('add')[0].style.visibility = 'visible';
      document.getElementsByClassName('remove')[0].style.visibility = 'visible';
      return;
    }
    this.startColHeader = targetCol;
    this.startMoveColHeaderFlag = true;
    sheet.initEvent(ColHeaderController.refreshSheet);
  }

  colHeaderUpHandler(e) {
    if (e.button === 2 || e.target.className === 'resizeE') {
      return;
    }
    const targetCol = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target;
    this.endColHeader = targetCol;
    this.startMoveColHeaderFlag = false;
    sheet.initEvent(null);
  }

  colHeaderMoveHandler(e) {
    if (e.button === 2 || e.target.className === 'resizeE') {
      return;
    }
    if (this.startMoveColHeaderFlag) {
      const targetCol = e.target.tagName === 'SPAN' ? e.target.parentElement : e.target;
      const colIndex = targetCol.cellIndex;
      sheet.changeSelectRange('colHeader', Math.min(this.startColHeader.cellIndex, colIndex) - 1, 0,
        Math.max(this.startColHeader.cellIndex, colIndex) - 1, constants.rowLength - 1,
        this.startColHeader.cellIndex - 1, 0);
    }
  }

  static colHeaderMenuHandler(e) {
    e.preventDefault();
  }

  static hiddenButtons() {
    document.getElementsByClassName('add')[0].style.visibility = 'hidden';
    document.getElementsByClassName('remove')[0].style.visibility = 'hidden';
  }
}
