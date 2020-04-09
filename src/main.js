import initSheet from './controllers/initController.js';

class Main {
  static start() {
    initSheet();
  }
}

window.onload = function () {
  Main.start();
};
