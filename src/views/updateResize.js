/* eslint-disable no-return-assign */
import constants from '../utils/constant.js';

const table = document.getElementsByClassName('table');
export default function updateColWidth(colHeaders, index, ColCount) {
  const tableParent = table[0];
  let tableWidth = 36;
  colHeaders.forEach((colHeader) => (tableWidth += colHeader.width));
  table[0].style.width = `${tableWidth}px`;
  for (let i = 0; i <= constants.rowLength; i++) {
    const trParent = tableParent.children[i];
    for (let j = index; j > index - ColCount; j--) {
      if (i === 0) {
        trParent.children[j].style.width = `${colHeaders[j - 1].width}px`;
      } else {
        trParent.children[j].style.maxWidth = `${colHeaders[j - 1].width}px`;
      }
    }
  }
}
