import domConstants from '../utils/domConstant.js';

import variable from '../utils/variable.js';

import { hidden, changeDiv } from './divView.js';

export default function cornerHandler() {
  hidden();
  [(variable.divStatus)[0]] = (domConstants.cells);
  const { rows } = domConstants.table;
  const lastRow = rows[rows.length - 1].children;
  (variable.divStatus)[1] = lastRow[lastRow.length - 1];
  changeDiv();
  for (let i = 0; i < domConstants.headers.length; i++) {
    (domConstants.headers)[i].classList.add('active');
  }
  for (let i = 0; i < domConstants.rowHeaders.length; i++) {
    (domConstants.rowHeaders)[i].classList.add('active');
  }
  domConstants.corner.classList.add('active');
}
