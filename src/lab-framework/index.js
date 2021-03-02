import React from 'react';
import ReactDOM from 'react-dom';

import { createApp } from 'vue'

import ReactSection from './index_react';
import VueSection from './index_vue';
import JsSection from './index_javascript';

const root = document.querySelector('#root');
const reactRoot = document.createElement('section');
const vueRoot = document.createElement('section');
const jsRoot = document.createElement('section');
reactRoot.id = 'react-section';
vueRoot.id = 'vue-section';
jsRoot.id = 'js-section';

[reactRoot, vueRoot, jsRoot].forEach(element => {
  root.appendChild(element);
});

createApp(VueSection).mount(document.getElementById(vueRoot.id))
ReactDOM.render(React.createElement(ReactSection), document.getElementById(reactRoot.id))
jsRoot.append(...JsSection)