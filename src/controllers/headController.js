import variable from '../utils/variable.js';

import { hidden } from '../views/divView.js';

import constants from '../utils/constant.js';

import domConstants from '../utils/domConstant.js';

function displayButton(headChange) {
  headChange.click();
  domConstants.addButton.style.visibility = 'visible';
  domConstants.removeButton.style.visibility = 'visible';
  domConstants.addButton.addEventListener('click', addHandler, false);
  domConstants.removeButton.addEventListener('click', removeHandler, false);
}

export function headerMenuHandler(e) {
  e.preventDefault();
}

export function headerUpHandler(e) {
  hidden();
  if (e.target.className === constants.colHeaderDivClassName) {
    return;
  }
  if (e.button === 2) {
    variable.headerChange = e.srcElement;
    displayButton(variable.headerChange);
  }
}

export function rowHeaderUpHandler(e) {
  hidden();
  if (e.target.className === constants.rowHeaderDivClassName) {
    return;
  }
  if (e.button === 2) {
    domConstants.rowHeaderChange = e.srcElement;
    displayButton(domConstants.rowHeaderChange);
  }
}

export function rowHeaderMenuHandler(e) {
  e.preventDefault();
}
