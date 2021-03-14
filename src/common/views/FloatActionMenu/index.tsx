import React from 'react';
import ReactDOM from 'react-dom';
import Dark from './icon_dark';
import Home from './icon_home';
import Back from './icon_back';
import FloatActionButton from './floating_button'
import styles from './floating_button.modules.less'

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
    if (!html) return;

    if (theme === null || undefined) {

    } else if (theme === 'theme-light') {
      html.dataset.theme = 'theme-dark';
    } else {
      html.dataset.theme = 'theme-light';
    }
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
