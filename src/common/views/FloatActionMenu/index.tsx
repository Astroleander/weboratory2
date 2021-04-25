import React from 'react';
import ReactDOM from 'react-dom';
import Dark from './icon_dark';
import Home from './icon_home';
import Back from './icon_back';
import FloatActionButton from './floating_button'
import styles from './floating_button.modules.less'
import { toggle as toggleDarkMode } from '@/common/modules/darkmode';

const wrapper = document.querySelector('#float');
const anchor = document.createElement('menuitem');
anchor.className = styles['floating-menu'];
wrapper?.appendChild(anchor);

const FloatActionMenu = () => {
  return (
    <>
      <FloatActionButton onClick={() => fab.switchDarkMode()}><Dark/></FloatActionButton>
      <FloatActionButton onClick={() => fab.backToHome()}><Home /></FloatActionButton>
      <FloatActionButton onClick={() => fab.backToPrev()}><Back /></FloatActionButton>
      <FloatActionButton onClick={() => fab.hiddenFAB()}>H/S</FloatActionButton>
      {/* <FloatActionButton></FloatActionButton> */}
    </>
  );
}

const fab = {
  switchDarkMode() {
    toggleDarkMode()
  },
  backToHome() {
    location.href = location.origin;
  },
  backToPrev() {
    history.go(-1);
  },
  hiddenFAB() {
    anchor.classList.toggle(styles['hidden'])
  }
}

export default ReactDOM.render(<FloatActionMenu />, anchor);
