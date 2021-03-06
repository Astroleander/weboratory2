import { Routes }  from '@/common/layouts/ts/NavLayout'
const routes:Routes[] = [];

const name_parser_in_webpack_5 = (key) => key.split(/\//)[2]
const path_parser_in_webpack_5 = (key) =>  `views/${key.split(/\//).splice(2).join('/')}`

require.context('@/lab-library/views/', true, /^lab.*?index\.[j|t]sx?$/, 'lazy')
  .keys()
  .forEach(key => {
    routes.push({
      name: name_parser_in_webpack_5(key),
      path: path_parser_in_webpack_5(key),
    })
  })

export { routes }