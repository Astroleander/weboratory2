import { createApp } from 'vue';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

interface HTMLWrapperElement extends HTMLElement {}
type ComponentLoader = (match_loader: any, tag: string) => HTMLWrapperElement

const createContainer:(tag: string) => HTMLWrapperElement = (tag) => {
  let hook = document.createElement('div');
  hook.id = `${tag}-sample`;
  hook.style.height = '100%';
  return hook;
}

export const htmlLoader:ComponentLoader = (Component, tag) => {
  let Container = createContainer(tag);
  Container.innerHTML = Component;
  return Container;
}

export const vueLoader:ComponentLoader = (Component, tag) => {
  let Container = createContainer(tag);

  const app = createApp(Component);
  app.mount(Container);

  return Container;
}

export const reactLoader:ComponentLoader = (Component, tag) => {
  let Container = createContainer(tag);

  ReactDOM.render(React.createElement(Component), Container);

  return Container;
}

export const svelteLoader:ComponentLoader = (Component, tag) => {
  let Container = createContainer(tag);
  new Component({
    target: Container
  });
  return Container;
};

interface LoaderRule {
  rule: RegExp,
  loader: Function
}

const loaderMapping:Array<LoaderRule> = [
  { rule: /\.svelte$/,   loader: svelteLoader},
  { rule: /\.vue$/,      loader: vueLoader},
  { rule: /\.[j|t]sx$/,  loader: reactLoader},
  { rule: /\.html$/,     loader: htmlLoader},
];

export const selectedLoader = (file_name) => {
  const result = loaderMapping.find(each => each.rule.test(file_name));
  return result;
}