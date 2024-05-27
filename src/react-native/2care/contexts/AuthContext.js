import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signIn as authSignIn, isLogged as checkIsLogged, logout as authLogout } from '../services/authServiceMob';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const loggedIn = await checkIsLogged();
      if (loggedIn) {
        const user = {
          access: await AsyncStorage.getItem('access'),
          refresh: await AsyncStorage.getItem('refresh'),
          latitude: await AsyncStorage.getItem('latitude'),
          longitude: await AsyncStorage.getItem('longitude'),
          user_type: await AsyncStorage.getItem('user_type'),
          picture: await AsyncStorage.getItem('picture'),  
        };
        setUser(user);
      }
    };

    loadUser();
  }, []);

  const signIn = async (credentials) => {
    const result = await authSignIn(credentials);
    if (result) {
      const user = {
        access: await AsyncStorage.getItem('access'),
        refresh: await AsyncStorage.getItem('refresh'),
        latitude: await AsyncStorage.getItem('latitude'),
        longitude: await AsyncStorage.getItem('longitude'),
        user_type: await AsyncStorage.getItem('user_type'),
        picture: await AsyncStorage.getItem('picture'),
      };
      setUser(user);
    }
  };

  const logout = async () => {
    const navigateToLogin = () => {
      console.log("Usuário deslogado");
      navigation.navigate("Login");
    };
    await authLogout(navigateToLogin);
    setUser(null);
  };
  

  return (
    <AuthContext.Provider value={{ user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
