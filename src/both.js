/* eslint-disable prefer-destructuring */
import constants from './common/constant.js';

import variable from './common/variable.js';

import { hidden, changeDiv } from './common/function.js';

function bothHandler() {
  hidden();
  (variable.divStatus)[0] = (constants.cells)[0];
  const { rows } = constants.table;
  const lastRow = rows[rows.length - 1].children;
  (variable.divStatus)[1] = lastRow[lastRow.length - 1];
  changeDiv();
  for (let i = 0; i < constants.headers.length; i++) {
    (constants.headers)[i].classList.add('active');
  }
  for (let i = 0; i < constants.rowHeaders.length; i++) {
    (constants.rowHeaders)[i].classList.add('active');
  }
  constants.both.classList.add('active');
}

export default function createBoth() {
  const both = document.createElement('th');
  both.classList.add('both');
  both.innerText = '/';
  both.addEventListener('click', bothHandler, false);
  return both;
}
