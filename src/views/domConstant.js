const domConstants = {
  table: document.getElementsByClassName('table')[0],
  divElement: document.getElementsByClassName('divElement')[0],
  fixDivElement: document.getElementsByClassName('fixDivElement')[0],
  headers: document.getElementsByClassName('header'),
  rowHeaders: document.getElementsByClassName('rowHeader'),
  cells: document.getElementsByClassName('cell'),
  corner: document.getElementsByClassName('corner')[0],
  addButton: document.getElementsByClassName('add')[0],
  removeButton: document.getElementsByClassName('remove')[0],
};

export function refresh() {
  [domConstants.table] = document.getElementsByClassName('table');
  [domConstants.divElement] = document.getElementsByClassName('divElement');
  [domConstants.fixDivElement] = document.getElementsByClassName('fixDivElement');
  [domConstants.corner] = document.getElementsByClassName('corner');
}

export default domConstants;
