import dblCellHandler from '../controllers/dbCellEvent.js';

import { cellDownHandler, cellMoveHandler, cellUpHandler } from '../controllers/selectCellEvent.js';

import cellHandler from '../views/cellView.js';

export default class Cell {
  constructor() {
    this._className = 'cell';
    this._text = '';
  }

  get text() {
    return this._text;
  }

  set text(value) {
    this._text = value;
  }

  createCell(index) {
    const cell = document.createElement('td');
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
    cell.innerText = this._text;
    cell.addEventListener('click', (e) => {
      cellHandler(e);
    }, false);
    cell.addEventListener('dblclick', (e) => {
      dblCellHandler(e);
    }, false);
    cell.addEventListener('mousedown', (e) => {
      cellDownHandler(e);
    }, false);
    cell.addEventListener('mouseup', (e) => {
      cellUpHandler(e);
    }, false);
    cell.addEventListener('mousemove', (e) => {
      cellMoveHandler(e);
    }, false);
    return cell;
  }
}
