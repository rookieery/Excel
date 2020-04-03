import variable from './variable.js';

import constants from './constant.js';

export function hidden() {
  constants.addButton.style.visibility = 'hidden';
  constants.removeButton.style.visibility = 'hidden';
}
export function changeFixDiv() {
  constants.fixDivElement.style.width = `${(variable.divStatus)[0].getBoundingClientRect().width - 4}px`;
  constants.fixDivElement.style.height = `${(variable.divStatus)[0].getBoundingClientRect().height - 4}px`;
  constants.fixDivElement.style.top = `${(variable.divStatus)[0].getBoundingClientRect().top + 1.5}px`;
  constants.fixDivElement.style.left = `${(variable.divStatus)[0].getBoundingClientRect().left + 1.5}px`;
}
export function changeDiv() {
  constants.divElement.style.height = `${Math.max((variable.divStatus)[1].getBoundingClientRect().bottom - (variable.divStatus)[0].getBoundingClientRect().top,
    (variable.divStatus)[0].getBoundingClientRect().bottom - (variable.divStatus)[1].getBoundingClientRect().top)}px`;
  constants.divElement.style.width = `${Math.max((variable.divStatus)[1].getBoundingClientRect().right - (variable.divStatus)[0].getBoundingClientRect().left,
    (variable.divStatus)[0].getBoundingClientRect().right - (variable.divStatus)[1].getBoundingClientRect().left)}px`;
  constants.divElement.style.top = `${Math.min((variable.divStatus)[0].getBoundingClientRect().top, (variable.divStatus)[1].getBoundingClientRect().top)}px`;
  constants.divElement.style.left = `${Math.min((variable.divStatus)[0].getBoundingClientRect().left, (variable.divStatus)[1].getBoundingClientRect().left)}px`;
  changeFixDiv();
  // fixDivText((variable.divStatus)[0]);
}
