/* eslint-disable max-len */
import portray from './portray.js';

import RowHeaderController from '../controllers/rowHeaderController.js';
import ColHeaderController from '../controllers/colHeaderController.js';
import cornerClickHandler from '../controllers/cornerController.js';
import Cell from '../controllers/cellController.js';
/* eslint-disable max-len */
// time out event resize
const colHeaderController = new ColHeaderController();
const rowHeaderController = new RowHeaderController();
const cell = new Cell();
function createCorner(corner) {
  const thCorner = document.createElement('th');
  thCorner.innerText = corner.text;
  thCorner.classList.add('corner');
  thCorner.addEventListener('click', (e) => {
    cornerClickHandler(e);
  }, false);
  return thCorner;
}

function createColHeader(colHeader) {
  const thColHeader = document.createElement('th');
  const resizeE = document.createElement('div');
  const span = document.createElement('span');
  thColHeader.classList.add('colHeader');
  resizeE.classList.add('resizeE');
  thColHeader.appendChild(span);
  thColHeader.appendChild(resizeE);
  thColHeader.children[0].innerText = colHeader.text;
  // resizeE.addEventListener('mousedown', resizeEsDownHandler, false);
  thColHeader.style.width = `${colHeader.width}px`;
  thColHeader.addEventListener('click', (e) => {
    ColHeaderController.colHeaderClickHandler(e);
  }, false);
  thColHeader.addEventListener('mousedown', (e) => {
    colHeaderController.colHeaderDownHandler(e);
  }, false);
  thColHeader.addEventListener('mouseup', (e) => {
    colHeaderController.colHeaderUpHandler(e);
  }, false);
  thColHeader.addEventListener('mousemove', (e) => {
    colHeaderController.colHeaderMoveHandler(e);
  }, false);
  thColHeader.addEventListener('contextmenu', (e) => {
    ColHeaderController.colHeaderMenuHandler(e);
  }, false);
  return thColHeader;
}

function createRowHeader(rowHeader) {
  const tdRowHeader = document.createElement('td');
  const resizeS = document.createElement('div');
  const span = document.createElement('span');
  tdRowHeader.classList.add('rowHeader');
  resizeS.classList.add('resizeS');
  tdRowHeader.appendChild(span);
  tdRowHeader.appendChild(resizeS);
  tdRowHeader.children[0].innerText = rowHeader.text;
  tdRowHeader.style.height = `${rowHeader.height}px`;
  // resizeS.addEventListener('mousedown', resizeSsDownHandler, false);
  tdRowHeader.addEventListener('click', (e) => {
    RowHeaderController.rowHeaderClickHandler(e);
  }, false);
  tdRowHeader.addEventListener('mousedown', (e) => {
    rowHeaderController.rowHeaderDownHandler(e);
  }, false);
  tdRowHeader.addEventListener('mouseup', (e) => {
    rowHeaderController.rowHeaderUpHandler(e);
  }, false);
  tdRowHeader.addEventListener('mousemove', (e) => {
    rowHeaderController.rowHeaderMoveHandler(e);
  }, false);
  tdRowHeader.addEventListener('contextmenu', (e) => {
    RowHeaderController.rowHeaderMenuHandler(e);
  }, false);
  return tdRowHeader;
}

function createCell(dataIndex, colWidth) {
  const tdCell = document.createElement('td');
  tdCell.style.maxWidth = `${colWidth}px`;
  tdCell.classList.add('cell');
  tdCell.setAttribute('data-index', dataIndex);
  tdCell.addEventListener('click', (e) => {
    Cell.cellClickHandler(e);
  }, false);
  tdCell.addEventListener('dblclick', (e) => {
    cell.cellDbClickHandler(e);
  }, false);
  tdCell.addEventListener('mousedown', (e) => {
    cell.cellDownHandler(e);
  }, false);
  document.addEventListener('mouseup', (e) => {
    cell.cellUpHandler(e);
  }, false);
  tdCell.addEventListener('mousemove', (e) => {
    cell.cellMoveHandler(e);
  }, false);
  return tdCell;
}
function BindButtonEvent() {
  const addButton = document.getElementsByClassName('add')[0];
  const removeButton = document.getElementsByClassName('remove')[0];
  addButton.addEventListener('click', () => {
    colHeaderController.addColHeaderHandler();
  }, false);
  removeButton.addEventListener('click', () => {
    colHeaderController.removeColHeaderHandler();
  }, false);
  addButton.addEventListener('click', () => {
    rowHeaderController.addRowHeaderHandler();
  }, false);
  removeButton.addEventListener('click', () => {
    rowHeaderController.removeRowHeaderHandler();
  }, false);
}
export default function initTable(corner, rowHeaders, colHeaders,
  selectType, activeCellCoordinate, selectUpperLeftCoordinate, selectBottomRightCoordinate) {
  const body = document.getElementsByTagName('body')[0];
  const table = document.createElement('table');
  table.classList.add('table');
  body.appendChild(table);
  const trFirst = document.createElement('tr');
  trFirst.appendChild(createCorner(corner));
  colHeaders.forEach((colHeader) => trFirst.appendChild(createColHeader(colHeader)));
  table.appendChild(trFirst);
  for (let i = 0; i < rowHeaders.length; i++) {
    const trOther = document.createElement('tr');
    trOther.appendChild(createRowHeader(rowHeaders[i]));
    for (let j = 0; j < colHeaders.length; j++) {
      trOther.appendChild(createCell(colHeaders[j].text, colHeaders[j].width));
    }
    table.appendChild(trOther);
  }
  const bigFrame = document.createElement('div');
  bigFrame.classList.add('bigFrame');
  const smallFrame = document.createElement('div');
  smallFrame.classList.add('smallFrame');
  table.appendChild(bigFrame);
  table.appendChild(smallFrame);
  portray(selectType, selectUpperLeftCoordinate, selectBottomRightCoordinate, activeCellCoordinate);
  BindButtonEvent();
}
