/* eslint-disable max-len */
import RowHeader from '../src/models/rowHeader.js';
import ColHeader from '../src/models/colHeader.js';
import Cell from '../src/models/cell.js';
import Corner from '../src/models/corner.js';
import SelectRange from '../src/models/selectRange.js';
import Coordinate from '../src/models/coordinate.js';
import Sheet from '../src/models/Sheet.js';


function refreshExcel(data) {
  console.log(data);
}


function testInit() {
  const expectData = {
    rowHeaders: [new RowHeader('1'), new RowHeader('2'), new RowHeader('3'), new RowHeader('4')],
    colHeaders: [new ColHeader('A'), new ColHeader('B'), new ColHeader('C'), new ColHeader('D')],
    cells: [
      [new Cell(), new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell(), new Cell()],
      [new Cell(), new Cell(), new Cell(), new Cell()],
    ],
    corner: new Corner('/'),
    activeCellCoordinate: new Coordinate(0, 0),
    boundaryCellCoordinate: new Coordinate(-1, -1),
    selectRange: new SelectRange(),
  };

  const sheet = new Sheet();
  sheet.init(4, 4);
  sheet.initEvent(refreshExcel);

  if (JSON.stringify(expectData.rowHeaders) !== JSON.stringify(sheet.rowHeaders)) {
    console.log('error');
  }

  // test insert column
  sheet.updateCellText(1, 1, 'a');
  expectData.boundaryCellCoordinate.rowIndex = 1;
  expectData.boundaryCellCoordinate.colIndex = 1;
  if (JSON.stringify(expectData.boundaryCellCoordinate) !== JSON.stringify(sheet.boundaryCellCoordinate)) {
    console.log('error');
  }

  sheet.changeSelectRange('col', 0, 0, 0, 3, 0, 0);
  sheet.changeColWidth(0, 1, 100);
  // sheet.changeSelectRange('row', 0, 1, 3, 2, 0, 1);
  sheet.changeRowHeight(1, 2, 200);
  // sheet.changeSelectRange('col', 0, 0, 1, 3, 0, 0);
  sheet.addCols(0, 2);
  // sheet.changeSelectRange('row', 1, 1, 3, 1, 1, 1);
  sheet.addRows(1, 1);

  const columnC = new ColHeader('C');
  columnC.width = 100;
  const expectColumnHeaders = [new ColHeader('A'), new ColHeader('B'), columnC, new ColHeader('D')];
  const row3 = new RowHeader('3');
  const row4 = new RowHeader('4');
  row3.height = 200;
  row4.height = 200;
  const exceptRowHeaders = [new RowHeader('1'), new RowHeader('2'), row3, row4];
  if (JSON.stringify(exceptRowHeaders) !== JSON.stringify(sheet.rowHeaders)) {
    console.log('error');
  }
  if (JSON.stringify(expectColumnHeaders) !== JSON.stringify(sheet.colHeaders)) {
    console.log('error');
  }
  if (sheet.cells[2][3].text !== 'a') {
    console.log('error');
  }
  // sheet.changeSelectRange('corner', 0, 0, 3, 3, 0, 0);
  sheet.changeRowHeight(0, 4, 50);
  for (let i = 0; i < 4; i++) {
    exceptRowHeaders[i].height = 50;
  }
  if (JSON.stringify(exceptRowHeaders) !== JSON.stringify(sheet.rowHeaders)) {
    console.log('error');
  }
  sheet.changeRowHeight(2, 1, -120);
  exceptRowHeaders[0].height = 30;
  exceptRowHeaders[1].height = 0;
  exceptRowHeaders[2].height = 0;
  if (JSON.stringify(exceptRowHeaders) !== JSON.stringify(sheet.rowHeaders)) {
    console.log('error');
  }
  // sheet.changeSelectRange('row', 0, 0, 3, 3, 0, 0);
  sheet.changeRowHeight(0, 4, 60);
  for (let i = 0; i < 4; i++) {
    exceptRowHeaders[i].height = 60;
  }
  if (JSON.stringify(exceptRowHeaders) !== JSON.stringify(sheet.rowHeaders)) {
    console.log('error');
  }
  // sheet.changeSelectRange('row', 1, 1, 3, 2, 1, 1);
  try {
    sheet.addRows(1, 2);
    console.log('error');
  } catch (error) {
    console.log('success to catch row error!');
  }
  if (sheet.boundaryCellCoordinate.colIndex !== 3 || sheet.boundaryCellCoordinate.rowIndex !== 2) {
    console.log('error');
  }
  sheet.removeCols(2, 2);

  if (sheet.boundaryCellCoordinate.colIndex !== -1 || sheet.boundaryCellCoordinate.rowIndex !== -1) {
    console.log('error');
  }
  expectColumnHeaders[2] = new ColHeader('C');
  expectColumnHeaders[3] = new ColHeader('D');
  if (JSON.stringify(expectColumnHeaders) !== JSON.stringify(sheet.colHeaders)) {
    console.log('error');
  }
  sheet.updateCellText(0, 0, '1863781');
  try {
    sheet.addCols(0, 4);
    console.log('error');
  } catch (error) {
    console.log('success to catch col error!');
  }
  sheet.changeColWidth(0, 1, 111);
  sheet.changeColWidth(1, 2, 222);
  sheet.changeColWidth(2, 2, 200);
  expectColumnHeaders[0].width = 111;
  expectColumnHeaders[1].width = 222;
  expectColumnHeaders[2].width = 200;
  expectColumnHeaders[3].width = 200;
  if (JSON.stringify(expectColumnHeaders) !== JSON.stringify(sheet.colHeaders)) {
    console.log('error');
  }
  sheet.changeColWidth(3, 1, -1000);
  expectColumnHeaders[0].width = 0;
  expectColumnHeaders[1].width = 0;
  expectColumnHeaders[2].width = 0;
  expectColumnHeaders[3].width = 0;
  if (JSON.stringify(expectColumnHeaders) !== JSON.stringify(sheet.colHeaders)) {
    console.log('error');
  }
  sheet.removeCols(0, 4);
  sheet.removeRows(0, 4);
  if (JSON.stringify(expectData.cells) !== JSON.stringify(sheet.cells)) {
    console.log('error');
  }
  sheet.updateCellText(2, 3, '123456');
  sheet.removeRows(3, 1);
  if (sheet.boundaryCellCoordinate.colIndex !== -1 || sheet.boundaryCellCoordinate.rowIndex !== -1) {
    console.log('error');
  }
  console.log('success!');
}
testInit();


