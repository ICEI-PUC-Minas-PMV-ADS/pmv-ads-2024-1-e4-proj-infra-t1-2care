import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import UnsignedViews from './navigations/UnsignedViews';
import CaregiversProvider from './contexts/CaregiversContext';
import MainNav from './navigations/Main';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <CaregiversProvider>
          <MainNav />
        </CaregiversProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
