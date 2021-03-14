import React from 'react';
import styles from './floating_button.modules.less';

const float_button = (props) => {
  return (
    <div className={styles['floating-button']} {...props}>
    </div>
  );
}

export default float_button;
