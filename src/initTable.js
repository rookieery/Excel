import createBoth from './models/corner.js';
import Header from './models/colHeader.js';
import RowHeader from './models/rowHeader.js';
import Cell from './models/cell.js';
import { changeDiv } from './views/divView.js';
import domConstants, { refresh } from './utils/domConstant.js';
import variable from './utils/variable.js';
import Frame from './models/frame.js';


export default function createTable() {
  const body = document.getElementsByTagName('body')[0];
  const table = document.createElement('table');
  table.classList.add('table');
  body.appendChild(table);
  table.appendChild(new Frame().createFrame());
  const trFirst = document.createElement('tr');
  trFirst.appendChild(createBoth());
  for (let i = 0; i < 10; i++) {
    trFirst.appendChild(new Header(String.fromCharCode('A'.charCodeAt() + i)).createHeader());
  }
  table.appendChild(trFirst);
  for (let i = 0; i < 20; i++) {
    const trSecond = document.createElement('tr');
    trSecond.appendChild(new RowHeader(`${i + 1}`).createRowHeader());
    for (let j = 0; j < 10; j++) {
      trSecond.appendChild(new Cell().createCell(String.fromCharCode('A'.charCodeAt() + j)));
    }
    table.appendChild(trSecond);
  }
  refresh();
  [variable.divStatus[0]] = domConstants.cells;
  [variable.divStatus[1]] = domConstants.cells;
  changeDiv();
}
