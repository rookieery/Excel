class Context {
  constructor() {
    this._startCellFlag = false;
    this.divStatus = [];
  }

  get startCellFlag() {
    return this._startCellFlag;
  }

  set startCellFlag(value) {
    this._startCellFlag = value;
  }
}
const context = new Context();
export default context;
