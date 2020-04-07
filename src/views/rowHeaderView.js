import { setHeadsOne, setHeadsTwo } from '../controllers/setHead.js';

import domConstants from '../utils/domConstant.js';

import variable from '../utils/variable.js';

import { hidden, changeDiv } from './divView.js';

import constants from '../utils/constant.js';

export default function rowHeaderHandler(e) {
  if (e.target.className === constants.rowHeaderDivClassName) {
    return;
  }
  hidden();
  const index = e.target.innerText;
  setHeadsOne(index, domConstants.rowHeaders);
  setHeadsTwo(domConstants.headers);
  if (domConstants.corner.classList.contains('active')) {
    domConstants.corner.classList.remove('active');
  }
  const targetRow = e.target.tagName === 'SPAN' ? e.srcElement.parentElement.parentElement.children : e.srcElement.parentElement.children;
  // eslint-disable-next-line prefer-destructuring
  (variable.divStatus)[0] = targetRow[1];
  (variable.divStatus)[1] = targetRow[targetRow.length - 1];
  changeDiv();
}
