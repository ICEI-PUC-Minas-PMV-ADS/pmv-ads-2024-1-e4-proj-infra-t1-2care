import Cookies from 'js-cookie';
import { getGeolocationApi } from './otherService';
import { sendAuthenticatedRequest } from './authService';
import { API_URL } from './apiService';
import { toast } from 'react-toastify';

const SERVICE_URL = "/user";

export const registerUser = async (userForm) => {
    let geo = await getGeolocationApi(userForm["post_code"])
    userForm["latitude"] = geo['latitude']
    userForm["longitude"] = geo['longitude']

    try {
        const response = await fetch(`${API_URL}${SERVICE_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userForm)
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }
        return result;
    } catch (error) {
        toast.error('Falha ao registrar, verifique o preenchimento');
        if(error.message.includes("email"))
            toast.error('Este email já está em uso');
    }
};

export const updateUser = async (userForm) => {
    let geo = await getGeolocationApi(userForm["post_code"])
    userForm["latitude"] = geo['latitude']
    userForm["longitude"] = geo['longitude']

    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/edit/`, "PATCH", userForm)
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserData = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}`)
        return response;
    } catch (error) {
        return false
    }
};

export const getUserPicture = () => {
    return Cookies.get('picture') ? Cookies.get('picture') : null;
};

export const getUserType = () => {
    return Cookies.get('user_type') ? Cookies.get('user_type') : null;
};


export const logout = () => {
    var cookieNames = Object.keys(Cookies.get());   
    cookieNames.forEach(function(cookieName) {
        Cookies.remove(cookieName);
    }); 
    window.location.href ="/"
}