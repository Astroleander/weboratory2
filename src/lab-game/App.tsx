import React from 'react';
import { useHashRouter } from '@/common/hooks/useRouter';
import ViewLayout from '@/common/layouts/react/ViewLayout';
import NavLayout from '@/common/layouts/react/NavLayout';

import { routes } from './routes'

import cls from 'classnames'

export default function () {
  const [ route ] = useHashRouter();
  return <Router route={route} />
}

const Router = ({ route }) => {
  if (route !== '') {
    return <ViewLayout />;
  }
  return <NavLayout routes={routes} className={cls('game')}/>;
}