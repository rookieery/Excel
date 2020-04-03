const constants = {
  table: document.getElementsByClassName('table')[0],
  divElement: document.getElementsByClassName('divElement')[0],
  fixDivElement: document.getElementsByClassName('fixDivElement')[0],
  headers: document.getElementsByClassName('header'),
  rowHeaders: document.getElementsByClassName('rowHeader'),
  cells: document.getElementsByClassName('cell'),
  both: document.getElementsByClassName('both')[0],
  addButton: document.getElementsByClassName('add')[0],
  removeButton: document.getElementsByClassName('remove')[0],
};

export function refresh() {
  [constants.table] = document.getElementsByClassName('table');
  [constants.divElement] = document.getElementsByClassName('divElement');
  [constants.fixDivElement] = document.getElementsByClassName('fixDivElement');
  [constants.both] = document.getElementsByClassName('both');
}

export default constants;
