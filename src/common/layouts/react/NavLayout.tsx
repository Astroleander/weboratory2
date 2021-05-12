import React from 'react';

import { Link } from 'react-router-dom';

import cls from 'classnames';
import Alert from '../../components/error/fallbacks/Alert';
import { LayoutStrings } from '../../utils/LayoutStringUtil';

export interface Routes {
  name: string,
  path: string,
}

const NavLayout:React.FC<{
  routes: Routes[]
  with_react_router_dom?: boolean
  className?: any
}> = ({ routes, with_react_router_dom = false, className }) => {

  if (!routes) return <Alert type='error'>{LayoutStrings.Route_Loading_Failed}</Alert>
  else if (!routes.length) return <Alert type='warning'>{LayoutStrings.Route_Empty}</Alert>

  return (<div className={cls('router-list', className)}>
    {with_react_router_dom ?
      <ReactRouterDOMRoutes routes={routes}/> :
      <NaiveRoutes routes={routes}/>}
  </div>)
}

const go = (url) => {
  window.location.hash = `/${url}`
}

const NaiveRoutes:React.FC<{
  routes: Routes[],
}> = ({ routes }) => {
  return (<>
    {
      routes.map(({ name, path }, idx) => {
        return (
          <li onClick={() => go(path)} key={path}>{formatName(name)}</li>
        );
      })
    }
    </>);
}

const ReactRouterDOMRoutes:React.FC<{
  routes: Routes[]
}> = ({ routes }) => {
  return (<>
    {
      routes.map(({ name, path }, idx) => {
        return (
          <li key={`${idx}`}>
            <Link to={path}>
              {formatName(name)}
            </Link>
          </li>
        );
      })
    }
    </>);
}

const formatName = name => {
  return name.replaceAll(/_/g, ' ');
};

export default NavLayout;
