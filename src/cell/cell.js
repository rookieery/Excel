/* eslint-disable prefer-destructuring */
import constants from '../common/constant.js';

import variable from '../common/variable.js';

import { hidden, changeDiv } from '../common/function.js';

import dblCellHandler from './dbCellEvent.js';

import { cellDownHandler, cellMoveHandler, cellUpHandler } from './selectCellEvent.js';

function setHeadsThree(index, rowHeader, heads) {
  for (let i = 0; i < heads.length; i++) {
    if (heads[i].classList.contains('active')) {
      heads[i].classList.remove('active');
    }
    if (heads[i] === rowHeader || heads[i].innerText === index) {
      heads[i].classList.add('selected');
    } else if (heads[i].classList.contains('selected')) {
      heads[i].classList.remove('selected');
    }
  }
}

function cellHandler(e) {
  hidden();
  const index = e.target.getAttribute('data-index');
  const rows = [e.srcElement, e.srcElement.parentElement];
  const rowHeader = rows[1].getElementsByClassName('rowHeader')[0];
  setHeadsThree(index, rowHeader, constants.rowHeaders);
  setHeadsThree(index, rowHeader, constants.headers);
  if (constants.both.classList.contains('active')) {
    constants.both.classList.remove('active');
  }
  (variable.divStatus)[0] = rows[0];
  (variable.divStatus)[1] = rows[0];
  changeDiv();
}

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

  static createCell(index) {
    const cell = document.createElement('td');
    cell.classList.add('cell');
    cell.setAttribute('data-index', index);
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
