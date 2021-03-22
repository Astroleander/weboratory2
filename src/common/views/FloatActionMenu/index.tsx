import React from 'react';
import ReactDOM from 'react-dom';
import Dark from './icon_dark';
import Home from './icon_home';
import Back from './icon_back';
import FloatActionButton from './floating_button'
import styles from './floating_button.modules.less'

export const THEME = 'THEME';
export const initTheme = () => {
  const theme = localStorage.getItem(THEME);
  const root = document.querySelector('html');
  if (!root) {
    console.error('[INIT ERROR] can not find <html> tag. ');
    return;
  };
  if (theme) {
    root.dataset.theme = theme;
  } else {
    root.dataset.theme = 'theme-light';
  }
};

const FloatActionMenu = () => {
  return (
    <>
      <FloatActionButton onClick={() => fab.switchDarkMode()}><Dark/></FloatActionButton>
      <FloatActionButton onClick={() => fab.backToHome()}><Home /></FloatActionButton>
      <FloatActionButton onClick={() => fab.backToPrev()}><Back /></FloatActionButton>
      <FloatActionButton></FloatActionButton>
    </>
  );
}

const fab = {
  switchDarkMode() {
    const html = document.querySelector('html')
    const theme = html?.dataset.theme;
    let value;
    if (!html) return;

    if (theme === null || undefined) {

    } else if (theme === 'theme-light') {
      value = 'theme-dark';
    } else {
      value = 'theme-light';
    }
    html.dataset.theme = value;
    localStorage.setItem(THEME, value);
  },
  backToHome() {
    location.href = location.origin;
  },
  backToPrev() {
    history.go(-1);
  }
}

const wrapper = document.querySelector('#float');
const anchor = document.createElement('menuitem');
anchor.className = styles['floating-menu'];

wrapper?.appendChild(anchor);

export default ReactDOM.render(<FloatActionMenu />, anchor);
