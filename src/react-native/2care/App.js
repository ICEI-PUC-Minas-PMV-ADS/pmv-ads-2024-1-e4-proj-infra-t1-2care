import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import Route from './navigations/Route';
import UnsignedViews from './navigations/UnsignedViews';
import CaregiversProvider from './contexts/CaregiversContext';

export default function App() {
  return (
    <NavigationContainer>
      <CaregiversProvider>
        <AuthProvider>
          <Route />
        </AuthProvider>
      </CaregiversProvider>
    </NavigationContainer>
  );
}
