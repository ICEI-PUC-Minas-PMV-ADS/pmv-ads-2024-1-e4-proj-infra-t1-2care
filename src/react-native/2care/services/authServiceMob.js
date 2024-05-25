import AsyncStorage from '@react-native-async-storage/async-storage';
//import Cookies from 'js-cookie';
//import { getGeolocationApi } from './otherServiceMob';
import { API_URL } from './apiServiceMob';
import { useNavigation } from '@react-navigation/native';

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
            } else
            throw new Error(errorData.detail || 'Erro ao fazer login' );
        }

        {/*const result = await response.json();
        Cookies.set('access', result["access"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('refresh', result["refresh"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('latitude', result["user"]["latitude"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('longitude', result["user"]["longitude"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('picture', result["user"]["picture"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('user_type', result["user"]["user_type"], { expires: 1, secure: true, sameSite: 'strict' });
    return true;*/}

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
        
        const refresh = await AsyncStorage.getItem('refresh');
        const response = await fetch(`${API_URL}${SERVICE_URL}/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh })
        });

        const result = await response.json();
        
        if (!response.ok) {
            //logout TODO
            
            {/*Cookies.remove('access', { secure: true, sameSite: 'strict' });
            Cookies.remove('refresh', { secure: true, sameSite: 'strict' });*/}

            await AsyncStorage.removeItem('access');
            await AsyncStorage.removeItem('refresh');

            throw new Error(JSON.stringify(result));
        }
        const token = result['access']
        if(token){
            
            {/*Cookies.set('access', token, { expires: 1, secure: true, sameSite: 'strict' });*/}
            await AsyncStorage.setItem('access', token);

        }
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAccessToken = async () => {
    {/*return Cookies.get('access')*/}
    return await AsyncStorage.getItem('access');
};

export const sendAuthenticatedRequest = async (url, method = 'GET', data = null) => {
    try {
        let access = await getAccessToken();
        const requestOptions = {
            method: method,
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            requestOptions.body = JSON.stringify(data);
        }

        let response = await fetch(`${url}`, requestOptions);

        if (response.status === 401 || response.status === 403) {
            let newAccessToken = await tokenRefresh();
            requestOptions.headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(`${url}`, requestOptions);
            if (response.status === 401 || response.status === 403) {
                // logout TODO
                {/*Cookies.remove('access', { secure: true, sameSite: 'strict' });
                Cookies.remove('refresh', { secure: true, sameSite: 'strict' });*/}
                await AsyncStorage.removeItem('access');
                await AsyncStorage.removeItem('refresh');
            }
        }
        
        if (!response.ok) {
            throw new Error(JSON.stringify(response));
        }

        const result = await response.json();

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

{/*
export const isLoggedIn = () => {
    if( Cookies.get('access') &&  Cookies.get('refresh')){
        return true;
    }else{
        //logout TODO
        Cookies.remove('access', { secure: true, sameSite: 'strict' });
        Cookies.remove('refresh', { secure: true, sameSite: 'strict' });
        return false
    }
};*/}

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