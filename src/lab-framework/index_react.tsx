import NavLayout from '@/common/layouts/NavLayout.tsx';
import React from 'react';
import { react_routes } from './routes';

const Home = () => {
  return (
    <div>
      <h1>React Section</h1>
      <NavLayout routes={react_routes}></NavLayout>
    </div>
  )
}

export default Home;