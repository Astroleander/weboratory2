import cls from 'classnames';
import { LayoutStrings } from '../utils/LayoutStringUtil';
import styles from '../styles/alert.modules.less';

/** Pure TS Routes 的 Alert 直接在这里写了，我不打算写一个 pure 版本的控件组 */
export interface Routes {
  name: string,
  path: string,
}

const NavLayout:(any) => HTMLDivElement = (routes) => {
  const container = document.createElement('div');
  if (!routes) {
    container.classList.add(cls(styles.alert, styles.error));
    container.innerHTML = LayoutStrings.Route_Loading_Failed;
    return container;
  } else if (!routes.length) {
    container.classList.add(cls(styles.alert, styles.warning));
    container.innerHTML = LayoutStrings.Route_Empty;
    return container;
  }
  container.classList.add(cls('router-list'));
  container.append(...Routes(routes));
  return container;
}

const go = (url) => {
  window.location.hash = `/${url}`
}

const Routes: (any) => HTMLOListElement[] = ({ routes }) => {
  return routes.map(({ name, path }, idx) => {
    const li = document.createElement('li');
    li.onclick = () => go(path);
    li.innerHTML = formatName(name);
    return routes;
  });
}

const formatName = name => {
  return name.replace(/_/, ' ');
};

export default NavLayout;
