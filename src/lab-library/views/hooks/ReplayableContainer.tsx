
import React, { ReactNode, useState, useEffect, ReactElement } from 'react'
import styles from './index.modules.less';

export const ReplayableChild: React.FC<{ children }> = ({ children }) => {
  const [display, setDisplay] = useState<ReactNode>(children);
  const handleRefresh = () => {
    let clone = React.cloneElement(children, { key: Math.random() }, children.props)
    setDisplay(v => clone)
  }
  const name = children?.props?.hook?.name || ''
  // TODO: embed code display
  // if (name.length) {
  //   import('@/common/hooks/' + name).then(m => {
  //     console.log(String(m[name]))
  //   })  
  // }
  return <section className={styles['replayable-child']} onClick={handleRefresh}>
    <header>
      <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
        <g fill="none" fillRule="evenodd" transform="translate(1 1)">
          <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" strokeWidth=".5"></circle>
          <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" strokeWidth=".5"></circle>
          <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" strokeWidth=".5"></circle>
        </g>
      </svg>
      <span>{name}</span>
    </header>
    <div>
      {display}
    </div>
  </section>
}

export const Replayable:React.FC<{}> = ({ children }) => {
  return <>
    {children && React.Children.map(children, child => <ReplayableChild>{ child }</ReplayableChild>)}
  </>
}