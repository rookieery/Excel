import resizeSsDownHandler from './resizeSsDivEvent.js';

import displayButton from './button.js';

import { setHeadsOne, setHeadsTwo } from './setHead.js';

import constants from '../common/constant.js';

import variable from '../common/variable.js';

import { hidden, changeDiv } from '../common/function.js';

function rowHeaderUpHandler(e) {
  hidden();
  if (e.target.className === 'resizeS') {
    return;
  }
  if (e.button === 2) {
    constants.rowHeaderChange = e.srcElement;
    displayButton(constants.rowHeaderChange);
  }
}
function rowHeaderMenuHandler(e) {
  e.preventDefault();
}

function rowHeaderHandler(e) {
  if (e.target.className === 'resizeS') {
    return;
  }
  hidden();
  const index = e.target.innerText;
  setHeadsOne(index, constants.rowHeaders);
  setHeadsTwo(constants.headers);
  if (constants.both.classList.contains('active')) {
    constants.both.classList.remove('active');
  }
  const targetRow = e.target.tagName === 'SPAN' ? e.srcElement.parentElement.parentElement.children : e.srcElement.parentElement.children;
  // eslint-disable-next-line prefer-destructuring
  (variable.divStatus)[0] = targetRow[1];
  (variable.divStatus)[1] = targetRow[targetRow.length - 1];
  changeDiv();
}

export default class RowHeader {
  constructor(text) {
    this._className = 'header';
    this._divClassName = 'resizeS';
    this._text = text;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  createRowHeader() {
    const rowHeader = document.createElement('td');
    rowHeader.classList.add(this._className);
    const resizeS = document.createElement('div');
    const span = document.createElement('span');
    resizeS.classList.add(this._divClassName);
    rowHeader.appendChild(span);
    rowHeader.appendChild(resizeS);
    rowHeader.children[0].innerText = this._text;
    resizeS.addEventListener('mousedown', (e) => {
      resizeSsDownHandler(e);
    }, false);
    rowHeader.addEventListener('click', (e) => {
      rowHeaderHandler(e);
    }, false);
    rowHeader.addEventListener('contextmenu', (e) => {
      rowHeaderMenuHandler(e);
    }, false);
    rowHeader.addEventListener('mouseup', (e) => {
      rowHeaderUpHandler(e);
    }, false);
    return rowHeader;
  }
}
