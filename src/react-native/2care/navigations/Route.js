import React from 'react';
import MainNav from './Main';
import UnsignedViews from './UnsignedViews';
import { useAuth } from '../contexts/AuthContext';

const Route = () => {
  const { user } = useAuth();
  // const user = false;

  return (
    <>
      {
        user
          ? <MainNav />
          : <UnsignedViews />
      }
    </>
  );
};

export default Route;
