import React, { useEffect, useState, useCallback } from 'react';
import Tile from './tile_view';
import Board, { useBoard } from './entity/Board';
import './style.scss';
import cls from 'classnames';
import { useSimpleGameController } from '@/common/hook/useSimpleGameController';

const BoardView = () => {
  const [ board ] = useBoard(8,8);
  const [ highScore, setHighScore ] = useState(0);
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
    if (board.lose && board.score > highScore) {
      setHighScore(board.score)
    };
  }, [ board ])
  return (
    <>
    <div className='hud'>
      <Score v={ board.score } t={'High Score'}/>
      <Count v={ board.count }/>
      <Score v={ board.score > highScore ? board.score : highScore }/>
      <button onClick={() => { board.reset();}}>reset</button>
      <div className='text hint'>{board.lose?'you lose':''}</div>
    </div>
    <div className={cls('board')}>
      {
      board.tiles.map((col,c_idx) => (
        <div className={cls('row')} key={c_idx}>
          {
            col.map((tile,r_idx) => {
              return <Tile key={`${r_idx}-${c_idx}`} {...tile} />;
            })
          }
        </div>))
      }
    </div>
    </>
  );
}

const Score = ({ v, t='Score' }) => (<div className='text'><span>{t}:</span>{v}</div>)
const Count = ({ v }) => (<div className='text'>{v}</div>)

export default BoardView;
