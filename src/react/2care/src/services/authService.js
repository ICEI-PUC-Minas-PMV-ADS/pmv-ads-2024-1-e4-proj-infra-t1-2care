import Cookies from 'js-cookie';
import { getGeolocationApi } from './otherService';
import { API_URL } from './apiService';

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
            throw new Error(errorData.detail || 'Erro ao fazer login' );
        }

        const result = await response.json();
        Cookies.set('access', result["access"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('refresh', result["refresh"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('latitude', result["user"]["latitude"], { expires: 1, secure: true, sameSite: 'strict' });
        Cookies.set('longitude', result["user"]["longitude"], { expires: 1, secure: true, sameSite: 'strict' });

        return true;
    } catch (error) {
        alert('Usuário ou senha inválidos!');
        throw new Error(error.message);
    }
}


export const registerCaregiver = async ({ email, password, confirm_password, name, birth_date, language, phone, user_type, gender, address, post_code, qualifications, work_experience, specializations,
    fixed_unavailable_days, fixed_unavailable_hours, custom_unavailable_days, hour_price, day_price, max_request_km, additional_info }) => {

    let geo = await getGeolocationApi(post_code)
    let latitude = geo['latitude']
    let longitude = geo['longitude']

    console.log(email, password, confirm_password, name, birth_date, language, phone, user_type, gender, address, post_code, qualifications, work_experience, specializations,
        fixed_unavailable_days, fixed_unavailable_hours, custom_unavailable_days, hour_price, day_price, max_request_km, additional_info)

    try {
        const response = await fetch(`${API_URL}${SERVICE_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password, confirm_password, name, birth_date, language, phone, user_type, gender, address, post_code, latitude, longitude, qualifications, work_experience, specializations,
                fixed_unavailable_days, fixed_unavailable_hours, custom_unavailable_days, hour_price, day_price, max_request_km, additional_info })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }
        return result;
    } catch (error) {
        alert('Dados inválidos, gentileza verifique o preenchimento!');
        throw new Error(error.message);
    }
};

export const registerCarereceiver = async ({ email, password, confirm_password, name, birth_date, language, phone, contact_number, user_type, gender, address, post_code, special_care, share_special_care,
    emergency_contact, additional_info }) => {
    
    let geo = await getGeolocationApi(post_code)
    let latitude = geo['latitude']
    let longitude = geo['longitude']

    console.log( email, password, confirm_password, name, birth_date, language, phone, contact_number, user_type, gender, address, post_code, special_care, share_special_care,
        emergency_contact, additional_info  )
    
    try {
        const response = await fetch(`${API_URL}${SERVICE_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, confirm_password, name, birth_date, language, phone, user_type, gender, address, post_code, latitude, longitude })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }
        return result;
    } catch (error) {
        alert('Dados inválidos, gentileza verifique o preenchimento!');
        throw new Error(error.message);
    }
    };

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
            //logout TODO
            Cookies.remove('access', { secure: true, sameSite: 'strict' });
            Cookies.remove('refresh', { secure: true, sameSite: 'strict' });
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

        let response = await fetch(`${API_URL}${SERVICE_URL}${url}`, requestOptions);

        if (response.status === 401 || response.status === 403) {
            let newAccessToken = await tokenRefresh();
            requestOptions.headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(`${API_URL}${url}`, requestOptions);
            if (response.status === 401 || response.status === 403) {
                // logout TODO
                Cookies.remove('access', { secure: true, sameSite: 'strict' });
                Cookies.remove('refresh', { secure: true, sameSite: 'strict' });
            }
        }

        const result = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const isLoggedIn = () => {
    if( Cookies.get('access') &&  Cookies.get('refresh')){
        return true;
    }else{
        //logout TODO
        Cookies.remove('access', { secure: true, sameSite: 'strict' });
        Cookies.remove('refresh', { secure: true, sameSite: 'strict' });
        return false
    }
};
