import React, { useState, ReactElement, ReactNode } from "react";
import { Module } from "webpack";
import { default as defaultFallback } from '@/common/components/fallbacks/Loading';

interface ReactDynamicModule {
  default?: Promise<React.FC> | undefined;
  [component: string]: any;
}

export const useLazyLoading: (asyncImport: ReactDynamicModule, fallback?: ReactElement) => React.ReactElement = (asyncImport, fallback) => {
  const [element, setElement] = useState<React.ReactElement<any, any> | null>(null);
  if (element) return element;

  asyncImport.then(m => {
    let fc: React.FC<{}> = m.default ?? m;
    if (fc) {
      setElement(fc({}));
    }
  }).catch(e => {
    // one hook, one responsibility
    throw e;
  })
  return <React.Fragment>
    {
      element ?
        element
        :
        fallback ? fallback : defaultFallback
    }
  </React.Fragment>;
}