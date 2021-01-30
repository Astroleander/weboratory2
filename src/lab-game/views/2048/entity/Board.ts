import Tile from './Tile';
import { useReducer, useEffect } from 'react';

const FOUR_PROBABILTY = 0.2;

const init = (row, col) => new Board(col, row);

const reducer = (state, action) => {
  if (action === 'moved') {
    state = { ...state }
  }
  return state;
}

const useBoard:(row:number, col:number) => [ any ] = (row, col) => {
  const [board, dispatch] = useReducer(reducer, {}, () => init(row, col));
  useEffect(() => {
    // printBoard(board)
  }, [board]);

  return [ new Proxy(board, {
    set(target, prop, r) {
      if (prop === 'count') {
        dispatch('moved');
      } 
      return Reflect.set(target, prop, r);
    },
  }) ];
}

class Board {
  size: { row:number, col:number };
  tiles: Tile[][];
  lose: boolean;
  count: number = 0;
  canMove: boolean = true;
  hasMoved: boolean = true;

  constructor (csize = 4, rsize = 0) {
    /** 注意，你想要一个 7 x 5 的游戏格子的话, 实际上是 a[5][7] 的数组 */
    if (rsize) {
      this.size = { row:rsize, col:csize };
    } else {
      this.size = { row:csize, col:csize };
    }
    this.tiles = [];
    for (let i = 0; i < this.size.col; i++) {
      if (!this.tiles[i]) { this.tiles[i] = Array(4); }
      for (let j = 0; j < this.size.row; j++) {
        this.tiles[i][j] = new Tile(i, j);
      }
    };
    this.lose = false;
    this.addRandomTile();
  }

  /**
   * 
   */
  addRandomTile() {
    if (!this.hasMoved) {
      return;
    }
    const available:{row: number, col: number}[] = [];
    for (let i = 0; i < this.size.col; i++) {
      for (let j = 0; j < this.size.row; j++) {
        if (this.tiles[i][j].value === 0) {
          available.push({ row: i, col: j });
        }
      }
    };

    const random_index = ~~(Math.random() * available.length);
    const { row, col } = available[random_index];
    const new_value = Math.random() > FOUR_PROBABILTY ? 2 : 4;
    this.updateTile(row, col, new_value);
    this.hasMoved = false;
  }

  updateTile(row, col, value) {
    const tile = this.tiles[row][col];
    tile.value = value;
  }

  move(direction) {
    console.log(direction)
    if (!this.canMove) return;
    new Promise<void>((res, rej) => {
      this.canMove = false;
      switch (direction) {
        case 'left':
          this.moveLeft();
          break;
        case 'right':
          this.moveRight();
          break;
        case 'up':
          this.moveUp();
          break;
        case 'down':
          this.moveDown();
          break;
        default:
          break;
      }
      this.checkLose();
      this.addRandomTile();
      this.count++;
      res();
    }).then(() => this.canMove = true);
  }

  moveLeft() {
    for (let i = 0; i < this.size.col; i++) {
      for (let j = 1; j < this.size.row; j++) {
        const tile = this.tiles[i][j];
        if (tile.value !== 0) {
          /** [head-tail] 查找前驱, 如果 left 是 0, 则查找到下一个不是 0 的前驱*/
          let shift = 1, head, tail;
          do {
            head = this.tiles[i][j - shift];
            tail = this.tiles[i][j - shift + 1];

            /** 如果目标点为 0, 对头部进行 shift。否则进行对目标点的尾部进行 merge */
            if (!head || (head.value !== 0 && head.value !== tile.value)) {
              if (tail.col !== tile.col) this.shiftInto(tail, tile);
              break;
            } else if (head.value === tile.value) {
              this.mergeInto(head, tile);
              break;
            }

            shift ++;
          } while (head);
        }
      }
    }
  }

  moveRight() {
    for (let i = 0; i < this.size.col; i++) {
      for (let j = this.size.row - 1; j >= 0 ; j--) { // 为保证效果，现在应该从右到左
        const tile = this.tiles[i][j];
        if (tile.value !== 0) {
          /** [tail-head] 查找前驱, 如果 right 是 0, 则查找到下一个不是 0 的后继*/
          let shift = 1, head, tail;
          do {
            head = this.tiles[i][j + shift];
            tail = this.tiles[i][j + shift - 1];

            /** 如果目标点为 0, 对头部进行 shift。否则进行对目标点的尾部进行 merge */
            if (!head || (head.value !== 0 && head.value !== tile.value)) {
              if (tail.col !== tile.col) this.shiftInto(tail, tile);
              break;
            } else if (head.value === tile.value) {
              this.mergeInto(head, tile);
              break;
            }

            shift ++;
          } while (head);
        }
      }
    }
  }

  moveUp() {
    for (let i = 1; i < this.size.col; i++) {
      for (let j = 0; j < this.size.row; j++) { // 为保证效果，现在应该从右到左
        const tile = this.tiles[i][j];
        if (tile.value !== 0) {
          /** [head]
           *  [tail] 
           *  查找前驱, 如果 up 是 0, 则查找到下一个不是 0 的上面
           */
          let shift = 1, head, tail;
          do {
            head = i - shift < 0 ? null : this.tiles[i - shift][j];
            tail = this.tiles[i - shift + 1][j];

            /** 如果目标点为 0, 对头部进行 shift。否则进行对目标点的尾部进行 merge */
            if (!head || (head.value !== 0 && head.value !== tile.value)) {
              if (tail.row !== tile.row) this.shiftInto(tail, tile);
              break;
            } else if (head.value === tile.value) {
              this.mergeInto(head, tile);
              break;
            }

            shift ++;
          } while (head);
        }
      }
    }
  }

  moveDown() {
    for (let i = this.size.col - 1; i >= 0; i--) {
      for (let j = 0; j < this.size.row; j++) { // 为保证效果，现在应该从右到左
        const tile = this.tiles[i][j];
        if (tile.value !== 0) {
          /** [tail]
           *  [head] 
           *  查找前驱, 如果 right 是 0, 则查找到下一个不是 0 的下体
           */
          let shift = 1, head, tail;
          do {
            head = i + shift > this.size.col - 1 ? null : this.tiles[i + shift][j];
            tail = this.tiles[i + shift - 1][j];

            /** 如果目标点为 0, 对头部进行 shift。否则进行对目标点的尾部进行 merge */
            if (!head || (head.value !== 0 && head.value !== tile.value)) {
              if (tail.row !== tile.row) this.shiftInto(tail, tile);
              break;
            } else if (head.value === tile.value) {
              this.mergeInto(head, tile);
              break;
            }

            shift ++;
          } while (head);
        }
      }
    }
  }

  shiftInto(target, source) {
    target.value = source.value;
    this.clearTile(source.row, source.col);
    this.hasMoved = true;
  }

  mergeInto(target, source) {
    target.value *= 2;
    this.clearTile(source.row, source.col);
    this.hasMoved = true;
  }

  clearTile(row, col) {
    this.updateTile(row, col, 0);
  }

  /**
   * 
   */
  checkLose() {

  }
}

const printBoard = (board) => {
  for (let i = 0; i < board.size.col; i++) {
    console.log(board.tiles[i].map(e => e.value))
  }
  console.log('')
}

export default Board;
export { useBoard };