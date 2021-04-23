import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { APromise } from './promise';

/** 有 BUG, 我总觉得 then 的新 promise 对象没有复用已有的微任务队列 */
const Index = () => {
  const [state, setState] = useState<(number | string)[]>(['init component']);
  const ref = useRef<any>(0);
  useEffect(() => {
    setState(v => v.concat('outter start'));
    const executor = (resolve, reject) => {
      setState(v => v.concat('executor running'));
      ref.current = setInterval(() => {
        setState(v => {
          const add = Number.isNaN(Number(v[v.length - 1])) ? 0 : Number(v[v.length - 1]) + 1;
          return v.concat(add)
        })
        setState(v => {
          if (v.length > 10) resolve('try end in then 1')
          return v;
        })
      }, 100);
    };
    const Promise = APromise
    let c = new Promise<string|number>(executor);
    c.then((res) => {
      setState(v => v.concat(res));
      clearInterval(ref.current);
      ref.current = null;
    }).then(e => new Promise(r => {
      setState(v => v.concat('then 2'))

      new Promise(r => {
        setState(v => v.concat('then 2.promise'));
        r(1)
      }).then(r => setState(v => v.concat('then 2.promise.then')))
      r(1);
      return new Promise(r => setState(v => v.concat('then 2.promise.then.return')))
    })).then((r) => {
      setState(v => v.concat('then 3.done'))
    })
    setState(v => v.concat('outter end'))
  },[]);
  
  
  return (
    <>
      <h1>Promise with A+</h1>
      <div>{ state.map(v => <div key={v}>{v}</div>) }</div>
    </>
  )
}

const mount = document.createElement('div');

export default [
  () => {
    ReactDOM.render(<Index />, mount);
    return mount;
  },
  () => ReactDOM.unmountComponentAtNode(mount)
];
