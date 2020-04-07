import { setHeadsOne, setHeadsTwo } from '../controllers/setHead.js';

import domConstants from '../utils/domConstant.js';

import variable from '../utils/variable.js';

import { hidden, changeDiv } from './divView.js';

import constants from '../utils/constant.js';

function getDivStatus(row, index) {
  for (let i = 1; i < row.length; i++) {
    if (row[i].getAttribute('data-index') === index) {
      return row[i];
    }
  }
  return null;
}

export default function headerHandler(e) {
  if (e.target.className === constants.colHeaderDivClassName) {
    return;
  }
  hidden();
  const event = e.currentTarget;
  const index = event.innerText;
  setHeadsOne(index, domConstants.headers);
  setHeadsTwo(domConstants.rowHeaders);
  if (domConstants.corner.classList.contains('active')) {
    domConstants.corner.classList.remove('active');
  }
  const { rows } = domConstants.table;
  (variable.divStatus)[0] = getDivStatus((rows)[1].children, index);
  (variable.divStatus)[1] = getDivStatus((rows)[rows.length - 1].children, index);
  changeDiv();
}
