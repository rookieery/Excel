import portray from './portray.js';

import {
  rowHeaderClickHandler, rowHeaderDownHandler, rowHeaderUpHandler, rowHeaderMoveHandler,
} from '../controllers/rowHeaderController.js';
import {
  colHeaderClickHandler, colHeaderDownHandler, colHeaderUpHandler, colHeaderMoveHandler,
} from '../controllers/colHeaderController.js';
import cornerClickHandler from '../controllers/cornerController.js';
import {
  cellClickHandler, cellDbClickHandler, cellDownHandler, cellUpHandler, cellMoveHandler,
} from '../controllers/cellController.js';
/* eslint-disable max-len */
// time out event resize
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
    colHeaderClickHandler(e);
  }, false);
  thColHeader.addEventListener('mousedown', (e) => {
    colHeaderDownHandler(e);
  }, false);
  document.addEventListener('mouseup', (e) => {
    colHeaderUpHandler(e);
  }, false);
  thColHeader.addEventListener('mousemove', (e) => {
    colHeaderMoveHandler(e);
  }, false);
  // header.addEventListener('contextmenu', headerMenuHandler, false);
  // header.addEventListener('mouseup', headerUpHandler, false);
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
    rowHeaderClickHandler(e);
  }, false);
  tdRowHeader.addEventListener('mousedown', (e) => {
    rowHeaderDownHandler(e);
  }, false);
  document.addEventListener('mouseup', (e) => {
    rowHeaderUpHandler(e);
  }, false);
  tdRowHeader.addEventListener('mousemove', (e) => {
    rowHeaderMoveHandler(e);
  }, false);
  // tdRowHeader.addEventListener('contextmenu', rowHeaderMenuHandler, false);
  // tdRowHeader.addEventListener('mouseup', rowHeaderUpHandler, false);
  return tdRowHeader;
}

function createCell(dataIndex, colWidth) {
  const tdCell = document.createElement('td');
  tdCell.style.maxWidth = `${colWidth}px`;
  tdCell.classList.add('cell');
  tdCell.setAttribute('data-index', dataIndex);
  tdCell.addEventListener('click', (e) => {
    cellClickHandler(e);
  }, false);
  tdCell.addEventListener('dblclick', (e) => {
    cellDbClickHandler(e);
  }, false);
  tdCell.addEventListener('mousedown', (e) => {
    cellDownHandler(e);
  }, false);
  document.addEventListener('mouseup', (e) => {
    cellUpHandler(e);
  }, false);
  tdCell.addEventListener('mousemove', (e) => {
    cellMoveHandler(e);
  }, false);
  return tdCell;
}

export default function initTable(corner, rowHeaders, colHeaders, cells,
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
    for (let j = 0; j < cells.length; j++) {
      trOther.appendChild(createCell(colHeaders[j].text, colHeaders[j].width));
    }
    table.appendChild(trOther);
  }
  const bigFrame = document.createElement('div');
  bigFrame.classList.add('bigFrame');
  const smallFrame = document.createElement('div');
  smallFrame.classList.add('smallFrame');
  bigFrame.appendChild(smallFrame);
  table.appendChild(bigFrame);
  portray(selectType, selectUpperLeftCoordinate, selectBottomRightCoordinate, activeCellCoordinate);
}
