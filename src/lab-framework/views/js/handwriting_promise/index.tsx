import React from 'react'
import ReactDOM from 'react-dom';

const Index = () => {
  return (
    <>
      <h1>Promise with A+</h1>
    </>
  )
}

const mount = document.createElement('div');
ReactDOM.render(<Index />, mount);
export default [mount, () => ReactDOM.unmountComponentAtNode(mount)];
