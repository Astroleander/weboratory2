import React from 'react';
import ExceptionNoMatchRoutes from '../components/error/ExceptionNoMatchRoutes';

import { Link } from 'react-router-dom';

interface Routes {
  name: string,
  path: string,
}

const NavLayout:React.FC<{
  routes: Routes[]
  with_react_router_dom: boolean
}> = ({ routes, with_react_router_dom = false }) => {
  if (!routes || !routes.length) return <ExceptionNoMatchRoutes />

  if (with_react_router_dom) {
    return <ReactRouterDOMRoutes routes={routes} />
  }
  return <NaiveRoutes routes={routes} />
}

const NaiveRoutes:React.FC<{
  routes: Routes[]
}> = ({ routes }) => {
  return null;
}

const ReactRouterDOMRoutes:React.FC<{
  routes: Routes[]
}> = ({ routes }) => {
  console.log(routes)

  return (<>
    {
      routes.map(({ name, path }, idx) => {
        return (
          <Link key={`${idx}`} to={path}>
            <li>{formatName(name)}</li>
          </Link>
        );
      })
    }
    </>);
}

const formatName = name => {
  return name;
};

export default NavLayout;
