const NIL = -1;
export const TYPE = {
  MV: 0xDDD,
  MG: 0x333,
  NL: -1
}
class Tile {
  value: number;
  row: number;
  col: number;

  /** for animate */
  type: number = TYPE.NL;
  origin_row: number = NIL;
  origin_col: number = NIL;

  constructor(row, col, value = 0) {
    this.row = row;
    this.col = col;

    this.value = value | 0;
  }
  updateValue(new_value) {
    this.value = new_value;
  }
  remove() {
    this.value = 0;
  }
}

export default Tile;
export { NIL };