import React from 'react';
import ReactDOM from 'react-dom';

import { createApp } from 'vue'

import ReactSection from './index_react';
import VueSection from './index_vue';
import JsSection from './index_javascript';
import Sandbox from './sandbox';

import './styles.less';
const root = document.querySelector('#root');
/** left part is the router */
const router = document.createElement('section');
router.id = 'router';

/** right part is the sandbox */
const sandbox = Sandbox;
root.appendChild(router);
root.appendChild(sandbox);

const reactRoot = document.createElement('div');
const vueRoot = document.createElement('div');
const jsRoot = document.createElement('div');
reactRoot.id = 'react-list';
vueRoot.id = 'vue-list';
jsRoot.id = 'js-list';

[reactRoot, vueRoot, jsRoot].forEach(element => {
  router.appendChild(element);
});

createApp(VueSection).mount(document.getElementById(vueRoot.id))
ReactDOM.render(React.createElement(ReactSection), document.getElementById(reactRoot.id))
jsRoot.append(...JsSection)