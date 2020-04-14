/* eslint-disable max-len */
import sheet from './sheet.js';
import updateColWidth from '../views/updateResize.js';
import portray from '../views/portray.js';

export default class Resize {
  constructor() {
    this.startColHeader = null;
    this.startResizeEsFlag = false;
    this.downScreenX = 0;
    this.oldMoveScreenX = 0;
    this.newMoveScreenX = 0;
    this.oldEvent = null;
    this.ColCount = 1;
    this.table = document.getElementsByClassName('table');
    this.bigFrame = document.getElementsByClassName('bigFrame');
    this.smallFrame = document.getElementsByClassName('smallFrame');
    this.upEvent = null;
  }

  resizeEsDownHandler = (e) => {
    this.startColHeader = e.target.parentElement;
    this.startResizeEsFlag = true;
    this.downScreenX = e.clientX;
    this.oldEvent = e;
    this.bigFrame[0].style.visibility = 'hidden';
    this.smallFrame[0].style.visibility = 'hidden';
    this._originalColWidth = parseInt(e.target.parentElement.style.width);
    console.log(this.downScreenX);
  }

  resizeEsUpHandler = (e) => {
    if (sheet.selectRange.selectType === 'colHeader'
      && this.startColHeader.cellIndex - 1 >= sheet.selectRange.selectUpperLeftCoordinate.colIndex
      && this.startColHeader.cellIndex - 1 <= sheet.selectRange.selectBottomRightCoordinate.colIndex) {
      this.ColCount = sheet.selectRange.selectBottomRightCoordinate.colIndex - sheet.selectRange.selectUpperLeftCoordinate.colIndex + 1;
      sheet.changeColWidth(sheet.selectRange.selectUpperLeftCoordinate.colIndex, this.ColCount, this.startColHeader.offsetWidth);
      updateColWidth(sheet.colHeaders, sheet.selectRange.selectUpperLeftCoordinate.colIndex + this.ColCount, this.ColCount); // indexRange
    }
    this.bigFrame[0].style.visibility = 'visible';
    this.smallFrame[0].style.visibility = 'visible';
    if (this.startResizeEsFlag) {
      this.startResizeEsFlag = false;
      this.downScreenX = 0;
      this.oldMoveScreenX = 0;
      this.newMoveScreenX = 0;
      this.startColHeader = null;
    }
    portray(sheet.selectRange.selectType, sheet.selectRange.selectUpperLeftCoordinate,
      sheet.selectRange.selectBottomRightCoordinate, sheet.activeCellCoordinate);
  }

  resizeEsMoveHandler = (e) => {
    if (this.startResizeEsFlag) {
      this.newMoveScreenX = e.clientX;
      // if (this.oldMoveScreenX === 0) {
      //   this.oldMoveScreenX = this.downScreenX;
      // }
      console.log('--- ', parseInt(this.startColHeader.style.width));
      const newWidth = this._originalColWidth + this.newMoveScreenX -  this.downScreenX;
      console.log(this.newMoveScreenX -  this.downScreenX);
      console.log('+++ ', newWidth);
      sheet.changeColWidth(this.startColHeader.cellIndex - 1, 1, newWidth);
      console.log('===> ', this.sta);
      this.startColHeader.style.width = newWidth + 'px';
      updateColWidth(sheet.colHeaders, this.startColHeader.cellIndex, 1);
    //   console.log(this.startColHeader);
    //  this.oldMoveScreenX = this.newMoveScreenX;
    }
  }
}
