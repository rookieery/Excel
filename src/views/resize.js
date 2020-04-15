/* eslint-disable no-return-assign */
import constants from '../utils/constant.js';

const table = document.getElementsByClassName('table');
export function updateColWidth(colHeaders, index, colCount) {
  const tableParent = table[0];
  for (let i = 0; i <= constants.rowLength; i++) {
    const trParent = tableParent.children[i];
    for (let j = index; j > index - colCount; j--) {
      if (i === 0) {
        trParent.children[j].style.width = `${colHeaders[j - 1].width}px`;
      } else {
        trParent.children[j].style.maxWidth = `${colHeaders[j - 1].width}px`;
      }
    }
  }
  let tableWidth = 36;
  colHeaders.forEach((colHeader) => (tableWidth += colHeader.width));
  table[0].style.width = `${tableWidth}px`;
}

export function updateRowHeight(rowHeaders, index, rowCount) {
  const tableParent = table[0];
  for (let i = index; i > index - rowCount; i--) {
    const trParent = tableParent.children[i];
    trParent.children[0].style.height = `${rowHeaders[i - 1].height}px`;
    trParent.children[0].style.lineHeight = `${rowHeaders[i - 1].height}px`;
  }
  let tableHeight = 25;
  rowHeaders.forEach((rowHeader) => (tableHeight += rowHeader.height));
  table[0].style.height = `${tableHeight}px`;
}
