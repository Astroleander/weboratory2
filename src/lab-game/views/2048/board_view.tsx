import React, { useEffect, useState } from 'react';
import Tile from './tile_view';
import { useBoard } from './entity/Board';
import './style.scss';
import cls from 'classnames';
import { useSimpleGameController } from '@/common/hook/useSimpleGameController';

const BoardView = () => {
  const [ board ] = useBoard(10, 10);
  const [ addOnLeft, addOnRight, addOnUp, addOnDown ] = useSimpleGameController();

  /** bind controller*/
  useEffect(() => {
    addOnLeft(()    =>    board.move('left'));
    addOnRight(()   =>    board.move('right'));
    addOnUp(()      =>    board.move('up'));
    addOnDown(()    =>    board.move('down'));
  }, []);

  /** board */
  useEffect(() => {
  }, [ board ])

  const size = board.size;
  return (
    <>
    <div className={cls('board')}>
      {
      board.tiles.map((col,c_idx) => (
        <div className={cls('row')} key={c_idx}>
          {
            col.map((tile,r_idx) => {
              return <Tile key={`${r_idx}-${c_idx}`} value={tile.value} />;
            })
          }
        </div>))
      }
    </div>
    </>
  );
}

export default BoardView;
