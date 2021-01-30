class Tile {
  value: number;
  row: number;
  col: number;

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