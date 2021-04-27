import { SourceBoxForFunc, CaseBox, Sandbox } from '@/lab-framework/sandbox_components';
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from '../../../index.modules.less';
import { LimitPromise } from './limited_promise';

const test = ([output, setOutput]) => {
  for (let i = 0; i < 20; i++) {
    const r = () => LimitPromise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(i)
        }, 3000);
      },
      2
    );
    r().then(result => setOutput(v => v.concat(result as any)))
  }
}

const Index = () => {
  return (
    <>
      <h1>Deep Clone</h1>
      <SourceBoxForFunc source={LimitPromise}></SourceBoxForFunc>
      <CaseBox testCase={test}></CaseBox>
    </>
  )
}

export default Sandbox.instanceFactory({ reactNode: Index});
