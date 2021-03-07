import React, { useLayoutEffect, useState } from 'react';

const useLazyComponent = (location) => {
  const [component, setComponent] = useState<(() => React.ReactElement) | null>(null);
  useLayoutEffect(() => {
    import(`@/${location.pathname.substring(1)}${location.hash.replace(/#\/?/, '')}`).then(m => {
      setComponent(m.default);
    }).catch(e => {
      console.error(e)
    })
  }, [])
  return [ component ] as const;
}

const ViewLayout: any = () => {
  const [ Component ] = useLazyComponent(location);
  if (Component) return Component;
  else return <div>loading...</div>;
}

export default ViewLayout;