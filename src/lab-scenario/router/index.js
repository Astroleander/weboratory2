const routes = [];

const name_praser_in_webpack_5 = (key) => key.split(/\//)[2]
const path_praser_in_webpack_5 = (key) =>  `views/${key.split(/\//).splice(2).join('/')}`

require.context('@/lab-scenario/views/', true, /^lab.*?index\.[j|t]sx?$/)
  .keys()
  .forEach(key => {
    routes.push({
      name: name_praser_in_webpack_5(key),
      path: path_praser_in_webpack_5(key),
    })
  })

export { routes }