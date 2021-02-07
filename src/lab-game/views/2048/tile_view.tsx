import React from 'react';
import './style.scss';
import cls from 'classnames';
import Tile, { NIL, TYPE } from './entity/Tile';

export default function TileView({ value, origin_row, origin_col, row, col, type }:React.PropsWithChildren<Tile>) {
  let class_list = [`tile`, `tile-${value}`];
  if (type === TYPE.MG) {
    class_list.push(`tile-merge`)
  } else {
    class_list = class_list.filter(x => `tile-merge`)
  }

  if (value === 0 || origin_col === col && origin_row === row) {
    // pass
  } else if (origin_col === NIL || origin_row === NIL) {
    class_list.push(`tile-new`) 
  } else if (origin_col === col) {
    class_list.push(`tile-mv-col-${origin_row}-to-${row}`)
  } else if (origin_row === row) {
    class_list.push(`tile-mv-row-${origin_col}-to-${col}`)
  }

  return (
    <div className={cls(...class_list)}>
      {value}
    </div>
  )
}
