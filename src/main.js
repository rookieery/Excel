import createTable from './initTable.js';

class Main {
  static start() {
    createTable();
  }
}

window.onload = function () {
  Main.start();
};
