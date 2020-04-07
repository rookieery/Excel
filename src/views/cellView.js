import domConstants from '../utils/domConstant.js';

import variable from '../utils/variable.js';

import { hidden, changeDiv } from './divView.js';

import { setHeadsThree } from '../controllers/setHead.js';

export default function cellHandler(e) {
  hidden();
  const index = e.target.getAttribute('data-index');
  const rows = [e.srcElement, e.srcElement.parentElement];
  const rowHeader = rows[1].getElementsByClassName('rowHeader')[0];
  setHeadsThree(index, rowHeader, domConstants.rowHeaders);
  setHeadsThree(index, rowHeader, domConstants.headers);
  if (domConstants.corner.classList.contains('active')) {
    domConstants.corner.classList.remove('active');
  }
  [(variable.divStatus)[0]] = rows;
  [(variable.divStatus)[1]] = rows;
  changeDiv();
}
