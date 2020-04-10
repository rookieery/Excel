import Sheet from '../models/Sheet.js';

const sheet = new Sheet();
const viewSheet = {
  corner: sheet.corner,
  rowHeaders: sheet.rowHeaders,
  colHeaders: sheet.colHeaders,
  cells: sheet.cells,
  selectType: sheet.selectRange.selectType,
  activeCellCoordinate: sheet.activeCellCoordinate,
  selectUpperLeftCoordinate: sheet.selectRange.selectUpperLeftCoordinate,
  selectBottomRightCoordinate: sheet.selectRange.selectBottomRightCoordinate,
};
export { viewSheet };
export default sheet;
