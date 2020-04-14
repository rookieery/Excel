/* eslint-disable no-return-assign */
import constants from '../utils/constant.js';

const table = document.getElementsByClassName('table');
export function updateColData(colHeaders, cells) {
  const tableParent = table[0];
  let tableWidth = 36;
  colHeaders.forEach((colHeader) => (tableWidth += colHeader.width));
  table[0].style.width = `${tableWidth}px`;
  for (let i = 0; i <= constants.rowLength; i++) {
    const trParent = tableParent.children[i];
    if (i === 0) {
      for (let j = 1; j <= constants.colLength; j++) {
        trParent.children[j].style.width = `${colHeaders[j - 1].width}px`;
      }
    } else {
      for (let j = 1; j <= constants.colLength; j++) {
        trParent.children[j].style.maxWidth = `${colHeaders[j - 1].width}px`;
        trParent.children[j].innerText = cells[i - 1][j - 1].text;
      }
    }
  }
}

export function updateRowData(rowHeaders, cells) {
  const tableParent = table[0];
  for (let i = 1; i <= constants.rowLength; i++) {
    const trParent = tableParent.children[i];
    for (let j = 0; j <= constants.colLength; j++) {
      if (j === 0) {
        trParent.children[j].style.height = rowHeaders[i - 1].height;
      } else {
        trParent.children[j].innerText = cells[i - 1][j - 1].text;
      }
    }
  }
}
