import { getGeolocationApi } from './otherService';

const API_URL = "http://127.0.0.1:8000";

export const signIn = async ({ email, password }) => {
    console.log( email, password )
    try {
        const response = await fetch(`${API_URL}/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username:email, password })
        });
       

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Erro ao fazer login' );
        }

        const result = await response.json();
        localStorage.setItem('token', result.access);

        return result;
    } catch (error) {
        alert('Usuário ou senha inválidos!');
        throw new Error(error.message);
    }
}


export const registerCaregiver = async ({ email, password, confirm_password, name, birth_date, language, phone, user_type, gender, address, post_code, qualifications, work_experience, specializations,
    fixed_unavailable_days, fixed_unavailable_hours, custom_unavailable_days, hour_price, day_price, max_request_km, additional_info }) => {
    let username = email //remover no futuro username daqui e abaixo
    let preferred_contact = 0 //remover no futuro 
    
    let geo = await getGeolocationApi(post_code)
    let latitude = geo['latitude']
    let longitude = geo['longitude']
    try {
        const response = await fetch(`${API_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ preferred_contact, username, email, password, confirm_password, name, birth_date, language, phone, user_type, gender, address, post_code, latitude, longitude, qualifications, work_experience, specializations,
                fixed_unavailable_days, fixed_unavailable_hours, custom_unavailable_days, hour_price, day_price, max_request_km, additional_info })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};


export const registerCarereceiver = async ({ email, password, confirm_password, name, birth_date, language, contact_number, user_type, gender, address, special_care, share_special_care,
    emergency_contact, additional_info }) => {
    
    console.log( email, password, confirm_password, name, birth_date, language, contact_number, user_type, gender, address, special_care, share_special_care,
    emergency_contact, additional_info  )
    
    try {
        const response = await fetch(`${API_URL}/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, confirm_password, name, birth_date, language, contact_number, user_type, gender, address, special_care, share_special_care,
                emergency_contact, additional_info })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Função para verificar se o usuário está autenticado
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    // Verifica se há um token armazenado e se ele é válido
    return !!token;
};
