import Cookies from 'js-cookie';
import { getGeolocationApi } from './otherService';
import { API_URL } from './apiService';
import { toast } from 'react-toastify';
import { logout } from './userService';


const SERVICE_URL = "/user";

export const signIn = async ({ email, password }) => {
    try {
        const response = await fetch(`${API_URL}${SERVICE_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
       
        const result = await response.json();
        Cookies.set('access', result["access"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('refresh', result["refresh"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('latitude', result["user"]["latitude"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('longitude', result["user"]["longitude"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('picture', result["user"]["picture"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('user_type', result["user"]["user_type"], { expires: 1, secure: true, sameSite: 'strict' });
        return true;
    } catch (error) {
        toast.error('Email ou senha invalidos');
    }
}

export const tokenRefresh = async () => {
    try {
        const refresh = Cookies.get("refresh")
        const response = await fetch(`${API_URL}${SERVICE_URL}/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh })
        });
        const result = await response.json();
        if (!response.ok) {
            logout()
            throw new Error(JSON.stringify(result));
        }
        const token = result['access']
        if(token){
            Cookies.set('access', token, { expires: 1, secure: true, sameSite: 'strict' });
        }
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAccessToken = async () => {
    return Cookies.get('access')
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
                logout()
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

export const isLoggedIn = () => {
    if( Cookies.get('access') &&  Cookies.get('refresh')){
        return true;
    }else{
        return false
    }
};
