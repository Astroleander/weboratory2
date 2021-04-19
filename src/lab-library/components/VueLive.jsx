import { ErrorTemplateNotFound } from '@/common/utils/ExceptionUtils';
import { vueLoader } from '@/home/utils/loader'
import { markRaw } from '@vue/reactivity';
import React, { useLayoutEffect, useState } from 'react'
import { createApp } from 'vue/dist/vue.esm-bundler.js';

const VueLive = ({ routes }) => {
  const [components, setComponent] = useState([]);

  useLayoutEffect(() => {
    let hook = document.getElementById('vue-live-sample');
    hook.style.height = '100%';

    if (!hook) return;

    const app = createApp({
      data: () => ({ components: components }),
      template: `
        <component v-for="component in components" v-bind:is="component.component" :key="component.name" :name="component.name"></component>
      `,
    });

    const vm = app.mount(hook);
    const loadModule = (m, r) => {
      if (!m.default.render) throw new ErrorTemplateNotFound(r.path)
      setComponent(v => {
        vm.$data.components.push({ component: markRaw(m.default), name: r.name })
        v = vm.$data.components
        return v;
      })
    }
    routes.forEach(route => {
      import('@/common/components/' + route.path)
        .then(m => loadModule(m, route))
        .catch(e => console.error(e));
    })
  }, []);

  return (
    <div id='vue-live-sample'>
    </div>
  )
}

export default VueLive
