import createBoth from './both.js';
import Header from './head/header.js';
import RowHeader from './head/rowHeader.js';
import Cell from './cell/cell.js';
import { changeDiv } from './common/function.js';
import constants, { refresh } from './common/constant.js';
import variable from './common/variable.js';

export default function createTable() {
  const body = document.getElementsByTagName('body')[0];
  const table = document.createElement('table');
  table.classList.add('table');
  body.appendChild(table);
  const divElement = document.createElement('div');
  divElement.classList.add('divElement');
  const fixDivElement = document.createElement('div');
  fixDivElement.classList.add('fixDivElement');
  divElement.appendChild(fixDivElement);
  table.appendChild(divElement);
  const trFirst = document.createElement('tr');
  trFirst.appendChild(createBoth());
  trFirst.appendChild(new Header('A').createHeader());
  trFirst.appendChild(new Header('B').createHeader());
  table.appendChild(trFirst);
  const trSecond = document.createElement('tr');
  trSecond.appendChild(new RowHeader('1').createRowHeader());
  trSecond.appendChild(Cell.createCell('A'));
  trSecond.appendChild(Cell.createCell('B'));
  table.appendChild(trSecond);
  refresh();
  console.log(constants.table);
  [variable.divStatus[0]] = constants.cells;
  [variable.divStatus[1]] = constants.cells;
  changeDiv();
}
