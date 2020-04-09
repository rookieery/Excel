import { portrayFrame, portrayBoundary } from './portray.js';
/* eslint-disable max-len */
// time out event resize
function createCorner(corner) {
  const thCorner = document.createElement('th');
  thCorner.innerText = corner.text;
  thCorner.classList.add('corner');
  return thCorner;
}

function createColHeader(colHeader) {
  const thColHeader = document.createElement('th');
  thColHeader.innerText = colHeader.text;
  thColHeader.style.width = `${colHeader.width}px`;
  thColHeader.classList.add('colHeader');
  return thColHeader;
}

function createRowHeader(rowHeader) {
  const tdRowHeader = document.createElement('td');
  tdRowHeader.innerText = rowHeader.text;
  tdRowHeader.style.height = `${rowHeader.height}px`;
  tdRowHeader.classList.add('rowHeader');
  return tdRowHeader;
}

function createCell(dataIndex) {
  const tdCell = document.createElement('td');
  tdCell.classList.add('cell');
  tdCell.setAttribute('data-index', dataIndex);
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
      trOther.appendChild(createCell(colHeaders[j].text));
    }
    table.appendChild(trOther);
  }
  const bigFrame = document.createElement('div');
  bigFrame.classList.add('bigFrame');
  const smallFrame = document.createElement('div');
  smallFrame.classList.add('smallFrame');
  bigFrame.appendChild(smallFrame);
  table.appendChild(bigFrame);
  portrayFrame(activeCellCoordinate, selectUpperLeftCoordinate, selectBottomRightCoordinate);
  portrayBoundary(selectType, activeCellCoordinate, selectUpperLeftCoordinate, selectBottomRightCoordinate);
}
