import variable from '../utils/variable.js';

import domConstants from './domConstant.js';

export function hidden() {
  domConstants.addButton.style.visibility = 'hidden';
  domConstants.removeButton.style.visibility = 'hidden';
}
export function changeFixDiv() {
  domConstants.fixDivElement.style.width = `${(variable.divStatus)[0].getBoundingClientRect().width - 4}px`;
  domConstants.fixDivElement.style.height = `${(variable.divStatus)[0].getBoundingClientRect().height - 4}px`;
  domConstants.fixDivElement.style.top = `${(variable.divStatus)[0].getBoundingClientRect().top + 1.5}px`;
  domConstants.fixDivElement.style.left = `${(variable.divStatus)[0].getBoundingClientRect().left + 1.5}px`;
}
export function changeDiv() {
  domConstants.divElement.style.height = `${Math.max((variable.divStatus)[1].getBoundingClientRect().bottom - (variable.divStatus)[0].getBoundingClientRect().top,
    (variable.divStatus)[0].getBoundingClientRect().bottom - (variable.divStatus)[1].getBoundingClientRect().top)}px`;
  domConstants.divElement.style.width = `${Math.max((variable.divStatus)[1].getBoundingClientRect().right - (variable.divStatus)[0].getBoundingClientRect().left,
    (variable.divStatus)[0].getBoundingClientRect().right - (variable.divStatus)[1].getBoundingClientRect().left)}px`;
  domConstants.divElement.style.top = `${Math.min((variable.divStatus)[0].getBoundingClientRect().top, (variable.divStatus)[1].getBoundingClientRect().top)}px`;
  domConstants.divElement.style.left = `${Math.min((variable.divStatus)[0].getBoundingClientRect().left, (variable.divStatus)[1].getBoundingClientRect().left)}px`;
  changeFixDiv();
  // fixDivText((variable.divStatus)[0]);
}
