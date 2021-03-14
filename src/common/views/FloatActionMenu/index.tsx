import React from 'react';
import ReactDOM from 'react-dom';
import Dark from './dark';
import FloatActionButton from './floating_button'
import styles from './floating_button.modules.less'

const FloatActionMenu = () => {
  return (
    <>
      <FloatActionButton onClick={() => fab.switchDarkMode()}><Dark/></FloatActionButton>
      <FloatActionButton></FloatActionButton>
      <FloatActionButton></FloatActionButton>
      <FloatActionButton></FloatActionButton>
    </>
  );
}

const fab = {
  switchDarkMode() {
    const html = document.querySelector('html')
    const theme = html?.dataset.theme;
    console.log(theme)
    if (!html) return;

    if (theme === null || undefined) {

    } else if (theme === 'theme-light') {
      html.dataset.theme = 'theme-dark';
    } else {
      html.dataset.theme = 'theme-light';
    }
  },
}

const wrapper = document.querySelector('#float');
const anchor = document.createElement('menuitem');
anchor.className = styles['floating-menu'];

wrapper?.appendChild(anchor);

export default ReactDOM.render(<FloatActionMenu />, anchor);
