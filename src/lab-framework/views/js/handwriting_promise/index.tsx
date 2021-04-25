import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { APromise } from './promise';
import styles from './index.modules.less'

const CodePlaneOfClass: React.FC<{ source: Object }> = ({ source }) => {
  return <pre className={styles['code-source-plane']}>
    {source.toString()}
  </pre>
}

const CasePlane: React.FC<{}> = ({}) => {
  const [state, setState] = useState<(number | string)[]>(['init component state']);
  const timer = useRef<any>(0);
  const test_format = useRef<any>(0);
  useEffect(() => {
    const executor = (resolve, reject) => {
      setState(v => v.concat('[executor] running'));
      timer.current = setInterval(() => {
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
    const test = () => {
      setState(v => v.concat('test macro task start'));
      const Promise = APromise;
      // generator 0 to 6
      let c = new Promise<string|number>(executor);
      c.then((res) => {
        setState(v => v.concat(res));
        clearInterval(timer.current);
        timer.current = null;
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
      setState(v => v.concat('test macro task end'))
    }
    test();
    test_format.current = test.toString()
  }, []);
  return (<>
    <pre className={styles['test-case-plane']}>{test_format.current}</pre>
    <div className={styles['showing-case-plane']}>{state.map(v => <div key={v}>{v}</div>)}</div>
  </>);
}

const Index = () => {
  
  return (
    <>
      <h1>Promise with A+</h1>
      <CodePlaneOfClass source={APromise}></CodePlaneOfClass>
      <CasePlane></CasePlane>
    </>
  )
}

const mount = document.createElement('div');
mount.className = styles['sandbox-instance'];

export default [
  () => {
    ReactDOM.render(<Index />, mount);
    return mount;
  },
  () => ReactDOM.unmountComponentAtNode(mount)
];
