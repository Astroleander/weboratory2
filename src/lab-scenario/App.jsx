import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ViewLayout from '@/common/layouts/react/ViewLayout';
import NavLayout from '@/common/layouts/ts/NavLayout';

import { routes } from './routes'
import OverlaysLayout from '@/common/layouts/react/OverlaysLayout';

const Container = (props) => {
  return (
    <>
    <OverlaysLayout />
    <HashRouter>
      <Switch>
        <Route
          path='/views'
          component={() => <ViewLayout />}
        />
        <Route
          path=''
          component={() => <NavLayout routes={routes} with_react_router_dom/>}
        />
      </Switch>
    </HashRouter>
    </>
  );
}

const App = (props) => {
  return (
    <Container />
  )
}

export default App;
