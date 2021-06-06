import React from 'react'
import styles from './style.modules.less';

export const Lines: React.FC<{ count? }> = (props) => {
  const { count } = props;
  const Arr = <>
    {Array(count || 3).fill(0).map((e,i) => <Line key={i}/>) }
  </>
  console.log(Arr)
  return <>
    {Arr}
  </>
}

export const Line: React.FC<{}> = () => {
  return (
    <div className={styles['placeholder-line']}>
      {/* 123 */}
    </div>
  )
}