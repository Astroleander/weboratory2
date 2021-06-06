import React from 'react'

import styles from './style.modules.less';

export const Container: React.FC<{ children?, height? }> = ({
  height = '200px',
  children
} = {}) => {
  const dynamicStyle = {};
  dynamicStyle['height'] = height;

  return (
    <div style={dynamicStyle} className={styles['placeholder-container']}>
      {children}
    </div>
  )
}
