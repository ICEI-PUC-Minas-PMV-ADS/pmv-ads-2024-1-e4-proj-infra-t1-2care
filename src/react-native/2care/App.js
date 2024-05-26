import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/AuthContext';
import Main from './navigations/Route';
import UnsignedViews from './navigations/UnsignedViews';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        {/*<Main />*/}
        <UnsignedViews />
      </NavigationContainer>
    </AuthProvider>
  );
}
