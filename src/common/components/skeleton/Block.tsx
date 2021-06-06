import React from 'react';
import styles from './style.modules.less';

interface ComponentSettings {
  height?: number | string;
  width?: number | string;
  children?: any
}
export const Block: React.FC<ComponentSettings> = ({
  height = '100%',
  width = '100%',
  children
} = {}) => {
  const dynamicStyle = {};
  dynamicStyle['height'] = height;
  dynamicStyle['width'] = width;

  return (
    <div style={dynamicStyle} className={styles['placeholder-block']}>
      {children}
    </div>
  )
}
