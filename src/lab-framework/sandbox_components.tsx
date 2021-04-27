import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.modules.less';

export const SourceBoxForFunc: React.FC<{ source: Object }> = ({ source }) => {
  return <pre className={styles['source-box']}>
    {source.toString()}
  </pre>
}

export const CaseBox: React.FC<{testCase: Function}>= ({ testCase }) => {
  const [output, setOutput] = useState<(number | string)[]>(['init component state']);
  
  useEffect(() => {
    testCase([output, setOutput]);
  }, [testCase]);
  return (<>
    <pre className={styles['testcase-box']}>{ testCase.toString() }</pre>
    <div className={styles['running-box']}>{output.map(v => <div key={v}>{v}</div>)}</div>
  </>);
}

export class Sandbox {
  static instanceFactory = ({
    reactNode, vueNode, jsNode
  }: {
      reactNode?: (() => JSX.Element) | JSX.Element,
      // TODO: update type
      vueNode?: any
      jsNode?: any
    }): [Function, Function] => {
    const mount = document.createElement('div');
    mount.className = styles['sandbox-instance'];
    if (reactNode) {
      let jsx;
      if (typeof reactNode === 'function') {
        jsx = reactNode();
      } else {
        jsx = reactNode;
      }
      const onMount = () => {
        ReactDOM.render(jsx, mount);
        return mount;
      } 
      const onUnmount = () => ReactDOM.unmountComponentAtNode(mount)
      return [ onMount, onUnmount ]
    }
    return [()=>{},()=>{}]
  }
}