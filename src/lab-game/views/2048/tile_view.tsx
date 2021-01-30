import { card } from '@/home/utils/creator'
import React from 'react';
import './style.scss';
import cls from 'classnames';

export default function TileView({ value }) {
  return (
    <div className={cls('tile', `tile-${value}`)}>
      {value}
    </div>
  )
}
