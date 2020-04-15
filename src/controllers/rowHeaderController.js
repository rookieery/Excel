/* eslint-disable max-len */
import sheet from './sheet.js';
import portray from '../views/portray.js';
import constants from '../utils/constant.js';
import { updateRowData } from '../views/addAndRemove.js';

export default class RowHeaderController {
  constructor() {
    this.startMoveRowHeaderFlag = false;
    this.startRowHeader = null;
    this.endRowHeader = null;
  }

  addRowHeaderHandler() {
    if (sheet.selectRange.selectType !== constants.rowSelectType) {
      return;
    }
    try {
      sheet.addRows(Math.min(this.startRowHeader.rowIndex, this.endRowHeader.rowIndex) - 1,
        Math.abs(this.startRowHeader.rowIndex - this.endRowHeader.rowIndex) + 1);
    } catch (e) {
      alert('此操作会被动删除已有数据！');
    }
    updateRowData(sheet.rowHeaders, sheet.cells);
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
    RowHeaderController.hiddenButtons();
  }

  removeRowHeaderHandler() {
    if (sheet.selectRange.selectType !== constants.rowSelectType) {
      return;
    }
    sheet.removeRows(Math.min(this.startRowHeader.rowIndex, this.endRowHeader.rowIndex) - 1,
      Math.abs(this.startRowHeader.rowIndex - this.endRowHeader.rowIndex) + 1);
    updateRowData(sheet.rowHeaders, sheet.cells);
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
    RowHeaderController.hiddenButtons();
  }

  static rowHeaderClickHandler(e) {
    if (e.target.className === constants.rowHeaderDivClassName) {
      return;
    }
    const targetRow = e.target.tagName === constants.spanTargetName ? e.target.parentElement.parentElement : e.target.parentElement;
    const rowIndex = targetRow.rowIndex - 1;
    sheet.changeSelectRange(constants.rowSelectType, 0, rowIndex, constants.colLength - 1, rowIndex, 0, rowIndex);
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }

  static refreshSheet(data) {
    if (data.result) {
      portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
        sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
    }
  }

  rowHeaderDownHandler(e) {
    if (e.target.className === constants.rowHeaderDivClassName) {
      return;
    }
    const targetRow = e.target.tagName === constants.spanTargetName ? e.target.parentElement : e.target;
    if (e.button === 2) {
      if (this.startRowHeader === null || this.endRowHeader === null || sheet.selectRange.selectType !== constants.rowSelectType
        || (targetRow.parentElement.rowIndex - this.startRowHeader.rowIndex) * (targetRow.parentElement.rowIndex - this.endRowHeader.rowIndex) > 0) {
        this.startRowHeader = targetRow.parentElement;
        this.endRowHeader = targetRow.parentElement;
        targetRow.click();
      }
      document.getElementsByClassName('add')[0].style.visibility = 'visible';
      document.getElementsByClassName('remove')[0].style.visibility = 'visible';
      return;
    }
    this.startRowHeader = targetRow.parentElement;
    this.startMoveRowHeaderFlag = true;
    sheet.initEvent(RowHeaderController.refreshSheet);
  }

  rowHeaderUpHandler(e) {
    if (e.button === 2 || e.target.className === constants.rowHeaderDivClassName) {
      return;
    }
    const targetRow = e.target.tagName === constants.spanTargetName ? e.target.parentElement : e.target;
    this.endRowHeader = targetRow.parentElement;
    this.startMoveRowHeaderFlag = false;
    sheet.initEvent(null);
  }

  rowHeaderMoveHandler(e) {
    if (e.button === 2 || e.target.className === constants.rowHeaderDivClassName) {
      return;
    }
    if (this.startMoveRowHeaderFlag) {
      const targetRow = e.target.tagName === constants.spanTargetName ? e.target.parentElement : e.target;
      const { rowIndex } = targetRow.parentElement;
      sheet.changeSelectRange(constants.rowSelectType, 0, Math.min(this.startRowHeader.rowIndex, rowIndex) - 1,
        constants.colLength - 1, Math.max(this.startRowHeader.rowIndex, rowIndex) - 1,
        0, this.startRowHeader.rowIndex - 1);
    }
  }

  static rowHeaderMenuHandler(e) {
    e.preventDefault();
  }

  static hiddenButtons() {
    document.getElementsByClassName('add')[0].style.visibility = 'hidden';
    document.getElementsByClassName('remove')[0].style.visibility = 'hidden';
  }
}
