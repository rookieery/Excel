/* eslint-disable no-param-reassign */
import domConstants from '../views/domConstant.js';

import { hidden } from '../views/divView.js';

function appendInput(inputElement, rows, rect) {
  inputElement.style.width = `${rows[0].getClientRects()[0].width}px`;
  inputElement.style.height = `${rows[0].getClientRects()[0].height}px`;
  inputElement.style.border = '1.5px solid rgb(21, 104, 10)';
  inputElement.style.position = 'fixed';
  inputElement.style.top = `${rect.top}px`;
  inputElement.style.left = `${rect.left}px`;
  inputElement.style.outline = 'none';
  inputElement.style.zIndex = '3';
  domConstants.table.appendChild(inputElement);
  inputElement.focus();
}

function getCellNext(rowHeader, cell) {
  for (let i = 0; i < domConstants.rowHeaders.length; i++) {
    if ((domConstants.rowHeaders)[i].innerText - 1 === rowHeader.innerText) {
      const parent = (domConstants.rowHeaders)[i].parentElement;
      const { children } = parent;
      for (let j = 0; j < children.length; j++) {
        if (children[j].getAttribute('data-index') === cell.getAttribute('data-index')) {
          return children[j];
        }
      }
    }
  }
  return (domConstants.cells)[0];
}
function cellText(cell, text) {
  cell.innerText = text;
  if (parseFloat(text).toString() === 'NaN') {
    cell.style.textAlign = 'left';
  } else {
    cell.style.textAlign = 'right';
  }
}
export default function dblCellHandler(e) {
  hidden();
  const rows = [e.srcElement, e.srcElement.parentElement];
  domConstants.fixDivElement.style.top = `${e.srcElement.getBoundingClientRect().top + 1.5}px`;
  domConstants.fixDivElement.style.left = `${e.srcElement.getBoundingClientRect().left + 1.5}px`;
  const rect = e.srcElement.getBoundingClientRect();
  const inputElement = document.createElement('input');
  setTimeout(() => {
    appendInput(inputElement, rows, rect);
  }, 0);
  const cell = e.srcElement;
  const oldText = cell.innerText;
  if (oldText != null) {
    inputElement.value = oldText;
  }
  const rowHeader = rows[1].getElementsByClassName('rowHeader')[0];
  const cellNext = getCellNext(rowHeader, cell);
  inputElement.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      cellText(cell, inputElement.value);
      // Manually trigger the click event of the next cell
      cellNext.click();
      inputElement.blur();
    }
  }, false);
  inputElement.addEventListener('blur', () => {
    cellText(cell, inputElement.value);
    domConstants.table.removeChild(inputElement);
  }, false);
}
