import resizeSsDownHandler from './resizeSsDivEvent.js';

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
