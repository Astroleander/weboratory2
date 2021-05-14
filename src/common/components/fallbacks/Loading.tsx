import React from 'react';
import styles from './loading.modules.less';

enum LoadingType {
  CIRCLE = 1,
  DUAL_RING = 2,
  FACEBOOK = 3,
  HEART = 4,
  RING = 5,
  ROLLER = 6,
  DEFAULT = 7,
  ELLIPSIS = 8,
  GRID = 9,
  HOURGLASS = 10,
  RIPPLE = 1,
  SPINER = 11,
}

// power by https://loading.io/css/

const mapper = {
  [LoadingType.CIRCLE]: <div className={styles["lds-circle"]}><div></div></div>,
  [LoadingType.DUAL_RING]: <div className={styles["lds-dual-ring"]}></div>,
  [LoadingType.FACEBOOK]: <div className={styles["lds-facebook"]}><div></div><div></div><div></div></div>,
  [LoadingType.HEART]: <div className={styles["lds-heart"]}><div></div></div>,
  [LoadingType.RING]: <div className={styles["lds-ring"]} ><div></div><div></div><div></div><div></div></div >,
  [LoadingType.ROLLER]: <div className={styles["lds-roller"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>,
  [LoadingType.DEFAULT]: <div className={styles["lds-default"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>,
  [LoadingType.ELLIPSIS]: <div className={styles["lds-ellipsis"]}><div></div><div></div><div></div><div></div></div>,
  [LoadingType.GRID]: <div className={styles["lds-grid"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>,
  [LoadingType.HOURGLASS]: <div className={styles["lds-hourglass"]}></div>,
  [LoadingType.RIPPLE]: <div className={styles["lds-ripple"]}><div></div><div></div></div>,
  [LoadingType.SPINER]: <div className={styles["lds-spinner"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
}

const Loading: React.FC<{ type?}> = ({ type = LoadingType.RIPPLE }: { type?: LoadingType}) => {
  return type ? mapper[type] : <span>Loading...</span>
};

export default Loading;

