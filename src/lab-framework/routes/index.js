const name_parser_in_webpack_5 = (key) => {
  const arr = key.split(/\//);
  let idx = arr.findIndex((v, i, a) => v.includes('.'));
  if (arr[idx].startsWith('index')) idx--;
  return arr[idx];
};
const path_parser_in_webpack_5 = (key) => `views/${key.split(/\//).splice(2).join('/')}`;

const loadRoutes = (routes) => {
  return routes
    .keys()
    .map(key => {
      return ({
        name: name_parser_in_webpack_5(key),
        path: path_parser_in_webpack_5(key),
      })
    });
}

const react_routes = loadRoutes(require.context('@/lab-framework/views/react', true, /^lab.*?index\.[j|t]sx?$/, 'lazy'));
const vue_routes = loadRoutes(require.context('@/lab-framework/views/vue', true, /^lab.*?index\.[j|t]sx?$/, 'lazy'));
const js_routes = loadRoutes(require.context('@/lab-framework/views/js', true, /^lab.*?index\.[j|t]sx?$/, 'lazy'));

export { 
  react_routes,
  vue_routes,
  js_routes
}