/**
 * @function useHashRouter
 * 
 * @function useHistoryRouter // TODO
 */
import React, { useState, useEffect } from 'react';

export const useHashRouter = () => {
  const [route, setRoute] = useState(location.hash);
  const [stack, pushHash, popHash] = useStack(location.hash);

  const handleHashchange = (event) => {
    /* 一个完整的路由应该有完善的栈管理规则，但是我懒得这么搞了，只单纯在这个数组里进行栈顶判断 */
    pushHash(location.hash);
    /* event 里是 url, 但是 location.hash 是现成的 hash */
    setRoute(location.hash);
  };  

  /** 利用原生 API 监听 hashchange */
  useEffect(() => {
    window.addEventListener('hashchange', handleHashchange);
    return () => {
      window.removeEventListener('hashchange', handleHashchange);
    }
  },[]);
  
  return [ route.substring(route.indexOf('#')) ];
}

/** 仅包含标准的三个方法接口 */
const useStack = (initial) => {
  const [stack, setStack] = useState<string[]>([ initial ]);

  const pushHash = (route) => {
    if (stack[stack.length - 2] === route) {
      stack.pop();
      setStack(stack);
    } else {
      stack.push(route);
      setStack(stack)
    }
  };

  const popHash = () => {
    stack.pop();
    setStack(stack);
  }

  return [ stack, pushHash, popHash ] as const;
};