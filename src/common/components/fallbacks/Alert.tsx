import React from 'react';
import cls from 'classnames';
import styles from '@/common/styles/alert.modules.less';

interface Alert {
  type?: string,
  closable?: boolean, // TODO: @see https://element.eleme.io/#/zh-CN/component/alert
  'show-icon'?: boolean, // TODO: @see https://element.eleme.io/#/zh-CN/component/alert
}

const Alert: React.FC<Alert> = ({ type='', closable=false, 'show-icon':string=false, children } = {
}) => {
  return (
    <div className={cls(styles.alert, styles[type])}>
      {children}
    </div>
  );
}

export default Alert;
