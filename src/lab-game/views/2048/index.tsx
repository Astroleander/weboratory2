import React from 'react';
import Board from './board_view';
import Tile from './tile_view';

const loop = () => {
  let i = 16384;
  let ret:number[] = [];
  while (i > 2) {
    i /= 2;
    ret.push(i);
  }
  return ret.map(i => <Tile value={i} />)
}

const View = () => {
  return (
    <div>
      <Board />
      {/* {loop()} */}
    </div>
  );
}

export default View;
