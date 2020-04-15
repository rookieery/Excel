/* eslint-disable max-len */
import sheet from './sheet.js';
import { updateColWidth, updateRowHeight } from '../views/resize.js';
import portray from '../views/portray.js';
import constants from '../utils/constant.js';

export default class Resize {
  constructor() {
    this.startColHeader = null;
    this.isStartResizeColHeader = false;
    this.isColMultipleChoice = false;
    this.downClientX = 0;
    this.moveClientX = 0;
    this.originalColWidth = 0;
    this.colHeadersWidth = [];
    this.startRowHeader = null;
    this.isStartResizeRowHeader = false;
    this.isRowMultipleChoice = false;
    this.downScreenY = 0;
    this.moveScreenY = 0;
    this.originalRowHeight = 0;
    this.rowHeadersHeight = [];
    this.table = document.getElementsByClassName('table');
    this.bigFrame = document.getElementsByClassName('bigFrame');
    this.smallFrame = document.getElementsByClassName('smallFrame');
  }

  resizeColHeaderDownHandler = (e) => {
    document.addEventListener('mousemove', this.resizeColHeaderMoveHandler);
    document.addEventListener('mouseup', this.resizeColHeaderUpHandler);
    this.bigFrame[0].style.visibility = 'hidden';
    this.smallFrame[0].style.visibility = 'hidden';
    this.startColHeader = e.target.parentElement;
    this.isStartResizeColHeader = true;
    this.downClientX = e.clientX;
    this.originalColWidth = this.startColHeader.clientWidth;
    for (let i = 0; i < sheet.colHeaders.length; i++) {
      this.colHeadersWidth.push(sheet.colHeaders[i].width);
    }
    if (sheet.selectRange.selectType === constants.colSelectType
      && this.startColHeader.cellIndex - 1 >= sheet.selectRange.selectUpperLeftCoordinate.colIndex
      && this.startColHeader.cellIndex - 1 <= sheet.selectRange.selectBottomRightCoordinate.colIndex
      && sheet.selectRange.selectUpperLeftCoordinate.colIndex !== sheet.selectRange.selectBottomRightCoordinate.colIndex) {
      this.isColMultipleChoice = true;
    }
  }

  resizeRowHeaderDownHandler = (e) => {
    document.addEventListener('mousemove', this.resizeRowHeaderMoveHandler);
    document.addEventListener('mouseup', this.resizeRowHeaderUpHandler);
    this.bigFrame[0].style.visibility = 'hidden';
    this.smallFrame[0].style.visibility = 'hidden';
    this.startRowHeader = e.target.parentElement.parentElement;
    this.isStartResizeRowHeader = true;
    this.downClientY = e.clientY;
    this.originalRowHeight = this.startRowHeader.clientHeight;
    this.rowHeadersHeight = [];
    for (let i = 0; i < sheet.rowHeaders.length; i++) {
      this.rowHeadersHeight.push(sheet.rowHeaders[i].height);
    }
    if (sheet.selectRange.selectType === constants.rowSelectType
      && this.startRowHeader.rowIndex - 1 >= sheet.selectRange.selectUpperLeftCoordinate.rowIndex
      && this.startRowHeader.rowIndex - 1 <= sheet.selectRange.selectBottomRightCoordinate.rowIndex
      && sheet.selectRange.selectUpperLeftCoordinate.rowIndex !== sheet.selectRange.selectBottomRightCoordinate.rowIndex) {
      this.isRowMultipleChoice = true;
    }
  }

  resizeColHeaderUpHandler = (e) => {
    document.removeEventListener('mousemove', this.resizeColHeaderMoveHandler);
    document.removeEventListener('mouseup', this.resizeColHeaderUpHandler);
    if (this.isColMultipleChoice) {
      this.colCount = sheet.selectRange.selectBottomRightCoordinate.colIndex - sheet.selectRange.selectUpperLeftCoordinate.colIndex + 1;
      sheet.changeColWidth(sheet.selectRange.selectUpperLeftCoordinate.colIndex, this.colCount, this.startColHeader.offsetWidth);
      updateColWidth(sheet.colHeaders, sheet.selectRange.selectUpperLeftCoordinate.colIndex + this.colCount, this.colCount);
    } else if (sheet.selectRange.selectType === constants.cornerSelectType) {
      sheet.changeColWidth(0, constants.colLength, this.startColHeader.offsetWidth);
      updateColWidth(sheet.colHeaders, constants.colLength, constants.colLength);
    }
    this.bigFrame[0].style.visibility = 'visible';
    this.smallFrame[0].style.visibility = 'visible';
    if (this.isStartResizeColHeader) {
      this.isStartResizeColHeader = false;
      this.downClientX = 0;
      this.moveClientX = 0;
      this.startColHeader = null;
      this.originalColWidth = null;
      this.isColMultipleChoice = false;
      this.colHeadersWidth = [];
    }
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }

  resizeRowHeaderUpHandler = (e) => {
    document.removeEventListener('mousemove', this.resizeRowHeaderMoveHandler);
    document.removeEventListener('mouseup', this.resizeRowHeaderUpHandler);
    if (this.isRowMultipleChoice) {
      this.rowCount = sheet.selectRange.selectBottomRightCoordinate.rowIndex - sheet.selectRange.selectUpperLeftCoordinate.rowIndex + 1;
      sheet.changeRowHeight(sheet.selectRange.selectUpperLeftCoordinate.rowIndex, this.rowCount, this.startRowHeader.offsetHeight);
      updateRowHeight(sheet.rowHeaders, sheet.selectRange.selectUpperLeftCoordinate.rowIndex + this.rowCount, this.rowCount);
    } else if (sheet.selectRange.selectType === constants.cornerSelectType) {
      sheet.changeRowHeight(0, constants.rowLength, this.startRowHeader.offsetHeight);
      updateRowHeight(sheet.rowHeaders, constants.rowLength, constants.rowLength);
    }
    this.bigFrame[0].style.visibility = 'visible';
    this.smallFrame[0].style.visibility = 'visible';
    if (this.isStartResizeRowHeader) {
      this.isStartResizeRowHeader = false;
      this.downClientY = 0;
      this.moveClientY = 0;
      this.startRowHeader = null;
      this.originalRowHeight = null;
      this.isRowMultipleChoice = false;
      this.rowHeadersHeight = [];
    }
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }

  resizeColHeaderMoveHandler = (e) => {
    if (this.isStartResizeColHeader) {
      const indexBoundary = this.isColMultipleChoice ? sheet.selectRange.selectUpperLeftCoordinate.colIndex : 0;
      this.moveClientX = e.clientX;
      let newWidth = this.originalColWidth + this.moveClientX - this.downClientX;
      let index = this.startColHeader.cellIndex - 1;
      if (newWidth >= constants.colResizeMinWidth) {
        sheet.changeColWidth(this.startColHeader.cellIndex - 1, 1, newWidth);
      } else {
        sheet.changeColWidth(this.startColHeader.cellIndex - 1, 1, constants.colResizeMinWidth);
        newWidth -= constants.colResizeMinWidth;
        index--;
        while (index >= indexBoundary && newWidth < 0) {
          if (newWidth + this.colHeadersWidth[index] >= constants.colResizeMinWidth) {
            sheet.changeColWidth(index, 1, newWidth + this.colHeadersWidth[index]);
            break;
          }
          newWidth += (this.colHeadersWidth[index] - constants.colResizeMinWidth);
          sheet.changeColWidth(index, 1, constants.colResizeMinWidth);
          index--;
        }
        index = index < indexBoundary ? indexBoundary : index;
      }
      updateColWidth(sheet.colHeaders, this.startColHeader.cellIndex, this.startColHeader.cellIndex - index);
    }
  }

  resizeRowHeaderMoveHandler = (e) => {
    if (this.isStartResizeRowHeader) {
      const indexBoundary = this.isRowMultipleChoice ? sheet.selectRange.selectUpperLeftCoordinate.rowIndex : 0;
      this.moveClientY = e.clientY;
      let newHeight = this.originalRowHeight + this.moveClientY - this.downClientY;
      let index = this.startRowHeader.rowIndex - 1;
      if (newHeight >= constants.rowResizeMinHeight) {
        sheet.changeRowHeight(this.startRowHeader.rowIndex - 1, 1, newHeight);
      } else {
        sheet.changeRowHeight(this.startRowHeader.rowIndex - 1, 1, constants.rowResizeMinHeight);
        newHeight -= constants.rowResizeMinHeight;
        index--;
        while (index >= indexBoundary && newHeight < 0) {
          if (newHeight + this.rowHeadersHeight[index] >= constants.rowResizeMinHeight) {
            sheet.changeRowHeight(index, 1, newHeight + this.rowHeadersHeight[index]);
            break;
          }
          newHeight += (this.rowHeadersHeight[index] - constants.rowResizeMinHeight);
          sheet.changeRowHeight(index, 1, constants.rowResizeMinHeight);
          index--;
        }
        index = index < indexBoundary ? indexBoundary : index;
      }
      updateRowHeight(sheet.rowHeaders, this.startRowHeader.rowIndex, this.startRowHeader.rowIndex - index);
    }
  }
}
