import AsyncStorage from '@react-native-async-storage/async-storage';
//import Cookies from 'js-cookie';
//import { getGeolocationApi } from './otherServiceMob';
import { API_URL } from './apiServiceMob';
import { sendAuthenticatedRequest } from './commonServiceMob';  //commonServiceMob

const SERVICE_URL = "/user";

export const signIn = async ({ email, password }) => {
    try {
        const response = await fetch(`${API_URL}${SERVICE_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
       
        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.detail.includes('longitude')) {
                throw new Error("CEP inválido. Por favor, verifique o CEP digitado.");
            } else {
                throw new Error(errorData.detail || 'Erro ao fazer login');
            }
        }

        const result = await response.json();
        await AsyncStorage.setItem('access', result["access"]);
        await AsyncStorage.setItem('refresh', result["refresh"]);
        await AsyncStorage.setItem('latitude', result["user"]["latitude"]);
        await AsyncStorage.setItem('longitude', result["user"]["longitude"]);
        await AsyncStorage.setItem('picture', result["user"]["picture"]);
        await AsyncStorage.setItem('user_type', result["user"]["user_type"]);
        
        return true;
    } catch (error) {
        alert('Usuário ou senha inválidos!');
        throw new Error(error.message);
    }
}

export const tokenRefresh = async () => {
    try {
        const refresh = await AsyncStorage.getItem("refresh");
        const response = await fetch(`${API_URL}${SERVICE_URL}/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh })
        });
        const result = await response.json();
        if (!response.ok) {
            await AsyncStorage.removeItem('access');
            await AsyncStorage.removeItem('refresh');
            throw new Error(JSON.stringify(result));
        }
        const token = result['access'];
        if (token) {
            await AsyncStorage.setItem('access', token);
        }
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const isLogged = async () => {
    const access = await AsyncStorage.getItem('access');
    const refresh = await AsyncStorage.getItem('refresh');
    return access && refresh;
};

export const logout = async (navigateToLogin) => {
    try {
      await AsyncStorage.removeItem('access');
      await AsyncStorage.removeItem('refresh');
      navigateToLogin();
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
};