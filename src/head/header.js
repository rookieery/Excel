import resizeEsDownHandler from './resizeEsDivEvent.js';

import displayButton from './button.js';

import { setHeadsOne, setHeadsTwo } from './setHead.js';

import constants from '../common/constant.js';

import variable from '../common/variable.js';

import { hidden, changeDiv } from '../common/function.js';

function getDivStatus(row, index) {
  for (let i = 1; i < row.length; i++) {
    if (row[i].getAttribute('data-index') === index) {
      return row[i];
    }
  }
  return null;
}

function headerHandler(e) {
  if (e.target.className === 'resizeE') {
    return;
  }
  hidden();
  const event = e.currentTarget;
  const index = event.innerText;
  setHeadsOne(index, constants.headers);
  setHeadsTwo(constants.rowHeaders);
  if (constants.both.classList.contains('active')) {
    constants.both.classList.remove('active');
  }
  const { rows } = constants.table;
  (variable.divStatus)[0] = getDivStatus((rows)[1].children, index);
  (variable.divStatus)[1] = getDivStatus((rows)[rows.length - 1].children, index);
  changeDiv();
}

function headerMenuHandler(e) {
  e.preventDefault();
}

function headerUpHandler(e) {
  hidden();
  if (e.target.className === 'resizeE') {
    return;
  }
  if (e.button === 2) {
    variable.headerChange = e.srcElement;
    displayButton(variable.headerChange);
  }
}

export default class Header {
  constructor(text) {
    this._className = 'header';
    this._divClassName = 'resizeE';
    this._text = text;
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  createHeader() {
    const header = document.createElement('th');
    header.classList.add(this._className);
    const resizeE = document.createElement('div');
    const span = document.createElement('span');
    resizeE.classList.add(this._divClassName);
    header.appendChild(span);
    header.appendChild(resizeE);
    header.children[0].innerText = this._text;
    resizeE.addEventListener('mousedown', (e) => {
      resizeEsDownHandler(e);
    }, false);
    header.addEventListener('click', (e) => {
      headerHandler(e);
    }, false);
    header.addEventListener('contextmenu', (e) => {
      headerMenuHandler(e);
    }, false);
    header.addEventListener('mouseup', (e) => {
      headerUpHandler(e);
    }, false);
    return header;
  }
}
