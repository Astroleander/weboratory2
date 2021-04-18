import { filterRoutes } from '@/lab-library/routes/component-folder-parser';
import VueLive from '@/lab-library/components/VueLive';
import React from 'react';

const Buttons = () => {
  const path = 'button/';
  const routes = require.context('@/common/components/button', false, /^(?=\.)/);
  const { react_routes, vue_routes, js_routes } = filterRoutes(path, routes)
  return (
    <div>
      {/* <ReactLive routes={routes}></ReactLive> */}
      <VueLive routes={vue_routes}></VueLive>
    </div>
  )
}

export default Buttons
