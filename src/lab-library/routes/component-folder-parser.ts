export const filterRoutes = (prefix, routes) => {
  if(prefix[prefix.length-1] !== '/') prefix += '/'

  const suffix_map = {
    react_routes: /\.tsx$/,
    vue_routes: /\.vue$/,
    js_routes: /\.[j|t]s$/,
  }
  const result: {[x:string]: [any?]}  = {}

  routes.keys().map((key: string) => {
    key = key.substr(2);

    for (const type in suffix_map) {
      result[type] ??= [];
      const regex: RegExp = suffix_map[type];
      if (regex.test(key)) {
        result[type].push({
          name: key,
          path: prefix + key,
        });
      }
    }
  });
  return result;
}