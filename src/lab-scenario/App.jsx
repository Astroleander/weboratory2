import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import ViewLayout from '@/common/layouts/ViewLayout';
import NavLayout from '@/common/layouts/NavLayout';

import { routes } from './router'
import OverlaysLayout from '@/common/layouts/OverlaysLayout';

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
