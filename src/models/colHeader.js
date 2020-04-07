import resizeEsDownHandler from '../controllers/resizeEsDivEvent.js';

import headerHandler from '../views/colHeaderView.js';

import { headerMenuHandler, headerUpHandler } from '../controllers/headController.js';

import constants from '../utils/constant.js';

export default class Header {
  constructor(text) {
    this._className = 'header';
    this._divClassName = constants.colHeaderDivClassName;
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
