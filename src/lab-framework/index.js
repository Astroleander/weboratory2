import React from 'react';
import ReactDOM from 'react-dom';

import { createApp } from 'vue'

import ReactSection from './index_react';
import VueSection from './index_vue';

const root = document.querySelector('#root');
const reactRoot = document.createElement('section');
const vueRoot = document.createElement('section');
reactRoot.id = 'react-section';
vueRoot.id = 'vue-section';

[reactRoot, vueRoot].forEach(element => {
  root.appendChild(element);
});

createApp(VueSection).mount(document.getElementById(vueRoot.id))
ReactDOM.render(React.createElement(ReactSection), document.getElementById(reactRoot.id))
