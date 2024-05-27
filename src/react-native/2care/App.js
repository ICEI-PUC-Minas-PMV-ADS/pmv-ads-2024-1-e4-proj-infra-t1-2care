import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import Route from './navigations/Route';
import UnsignedViews from './navigations/UnsignedViews';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Route />
      </NavigationContainer>
    </AuthProvider>
  );
}
