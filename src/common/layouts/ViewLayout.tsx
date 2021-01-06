import React, { useLayoutEffect, useState } from 'react';

const useLazyComponent = (location) => {
  const [component, setComponent] = useState<React.FC|null>(null);
  useLayoutEffect(() => {
    import(`@/${location.pathname.substring(1)}${location.hash.substring(2)}`).then(m => {
      setComponent(m.default);
    })
  }, [])
  return component;
}

const ViewLayout = () => {
  const Component = useLazyComponent(location);
  if (Component) return Component;
  else return <div>loading...</div>;
}

export default ViewLayout;