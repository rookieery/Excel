import variable from '../common/variable.js';

import constants from '../common/constant.js';
// 调用class来实现
function addHandler() {
  if (variable.headerChange == null) { // insert row
    const index = Number(variable.rowHeaderChange.innerText);
    const row = constants.table.insertRow(index);
    constants.table.style.height = `${constants.table.getBoundingClientRect().height + row.getBoundingClientRect().height}px`;
    const rowHeader = row.insertCell(0);
    appendRowHeader(rowHeader, index);
    for (var i = 1; i <= headers.length; i++) {
      appendCells(row, headers[i - 1].innerText, i);
    }
    for (var i = 0; i < rowHeaders.length; i++) {
      if (Number(rowHeaders[i].children[0].innerText) >= index) {
        rowHeaders[i].children[0].innerText = i + 1;
      }
    }
    rowHeader.click();
    rowHeaderChange = null;
  } else { // insert column
    const { rows } = table;
    var index = headerChange.innerText;
    let clickHeader;
    const cellMinWidth = window.getComputedStyle(cells[0], null).getPropertyValue('min-width');
    const minWidth = cellMinWidth.substring(0, cellMinWidth.length - 2);
    table.style.width = `${table.getBoundingClientRect().width + Number(minWidth)}px`;
    for (var i = 0; i < rows.length; i++) {
      if (i == 0) { // insert th
        clickHeader = appendTh(rows, index);
      } else { // insert td
        appendTd(rows, index, i);
      }
    }
    clickHeader.click();
    headerChange = null;
  }
  hidden();
}
function removeHandler() {
  const { rows } = table;
  if (headerChange == null) { // remove row
    var index = rowHeaderChange.innerText;
    if (Number(index) === rows.length - 1) {
      return;
    }
    const deleteHeight = rowHeaderChange.tagName == 'SPAN' ? rowHeaderChange.parentElement.getBoundingClientRect().height : rowHeaderChange.getBoundingClientRect().height;
    table.style.height = `${table.getBoundingClientRect().height - deleteHeight}px`;
    table.deleteRow(index);
    const rowHeader = removeRowHeader(Number(index));
    rowHeader.click();
    rowHeaderChange = null;
  } else { // remove column
    var index = headerChange.innerText;
    if (index.charCodeAt() - 'A'.charCodeAt() == headers.length - 1) {
      return;
    }
    const deleteWidth = headerChange.tagName == 'SPAN' ? headerChange.parentElement.getBoundingClientRect().width : headerChange.getBoundingClientRect().width;
    table.style.width = `${table.getBoundingClientRect().width - deleteWidth}px`;
    let clickHeader;
    for (let i = 0; i < rows.length; i++) {
      if (i == 0) { // remove th
        clickHeader = removeTh(rows, index);
      } else { // remove td
        removeTd(rows, index, i);
      }
    }
    clickHeader.click();
    headerChange = null;
  }
  hidden();
}

export default function displayButton(headChange) {
  headChange.click();
  constants.addButton.style.visibility = 'visible';
  constants.removeButton.style.visibility = 'visible';
  constants.addButton.addEventListener('click', addHandler, false);
  constants.removeButton.addEventListener('click', removeHandler, false);
}
