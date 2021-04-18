import { vueLoader } from '@/home/utils/loader'
import { markRaw } from '@vue/reactivity';
import React, { useLayoutEffect, useState } from 'react'
import { createApp } from 'vue/dist/vue.esm-bundler.js';

const VueLive = ({ routes }) => {
  const [components, setComponent] = useState([]);

  useLayoutEffect(() => {
    let hook = document.getElementById('vue-live-sample');
    if (!hook) return;

    hook.style.height = '100%';

    const app = createApp({
      data: () => ({
        components: components,
      }),
      template: `
        <div>
          <component v-for="component in components" v-bind:is="component.component" :key="component.name"></component>
        </div>
      `,
    });

    const vm = app.mount(hook);

    routes.forEach(route => {
      import('@/common/components/' + route.path).then(m => {
        const module = markRaw(m.default);
        setComponent(v => {
          vm.$data.components.push({ component: module, name: route.name })
          v = vm.$data.components
          return v;
        })
      });
    })
  }, []);

  return (
    <div id='vue-live-sample'>
    </div>
  )
}

export default VueLive
