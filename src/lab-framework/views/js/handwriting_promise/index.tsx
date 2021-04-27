import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom';
import styles from '../../../index.modules.less'

import { APromise } from './promise';
import { CaseBox, Sandbox, SourceBoxForFunc } from '@/lab-framework/sandbox_components';

 
const test = ([output, setOutput]) => {
  const executor = (resolve, reject) => {
    setOutput(v => v.concat('[executor] running'));
    setTimeout(() => {
      setOutput(v => { return v; })
      resolve('resolve in executor')
    }, 1000);
  };
  
  setOutput(v => v.concat('test macro task start'));
  setTimeout(() => {
    setOutput(v => v.concat('setTimeout 0 done before micros'))
  })
  const Promise = APromise;
  // generator 0 to 6
  let c = new Promise<string|number>(executor);
  c
  .then((res) => {
    setOutput(v => v.concat(res));
  })
  .then(e => new Promise(r => {
    setOutput(v => v.concat('then 2'))
    new Promise(r => {
      setOutput(v => v.concat('then 2.promise'));
      r('then 2.promise.resolve')
    }).then(r => setOutput(v => v.concat('then 2.promise.then')))
    r(1);
    return new Promise(r => setOutput(v => v.concat('then 2.promise.then.return')))
  })).then((r) => {
    setOutput(v => v.concat('then 3.done'))
  })
  setTimeout(() => {
    setOutput(v => v.concat('setTimeout done after micros'))
  })
  setTimeout(() => {
    setOutput(v => v.concat('setTimeout 1000 done'))
  }, 1000)
  setTimeout(() => {
    setOutput(v => v.concat('setTimeout 1001 done'))
  }, 1001)
  setTimeout(() => {
    setOutput(v => v.concat('setTimeout 3000 done'))
  }, 3000)
  setOutput(v => v.concat('test macro task end'))
}

const Index = () => {
  return (
    <>
      <h1>Promise with A+</h1>
      <SourceBoxForFunc source={APromise}></SourceBoxForFunc>
      <CaseBox testCase={test}></CaseBox>
    </>
  )
}

export default Sandbox.instanceFactory({ reactNode: Index});
