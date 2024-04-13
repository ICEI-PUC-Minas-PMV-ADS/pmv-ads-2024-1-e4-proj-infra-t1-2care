import jwt_decode from 'jwt-decode'; // Biblioteca para decodificar tokens JWT
import { apiService } from './apiService';

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_MODE : process.env.REACT_APP_PROD_MODE;

export const signIn = async ({ email, password }) => {
    try {
        const response = await fetch(`${API_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }

        // Armazena o token JWT no armazenamento local (localStorage)
        localStorage.setItem('token', result.token);

        return result;
    } catch (error) {
        alert('Usuário ou senha inválidos!');
        throw new Error(error.message);
    }
}


export const registerCaregiver = async ({ email, password, confirm_password, name, birth_date, language, phone, gender, qualifications, work_experience, specializations,
    fixed_unavailable_days, fixed_unavailable_hours, custom_unavailable_days, hour_price, day_price, max_request_km, additional_info }) => {
    try {
        const response = await fetch(`${API_URL}/users/caregiver/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, confirm_password, name, birth_date, language, phone, gender, qualifications, work_experience, specializations,
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


export const registerCarereceiver = async ({ email, password, confirm_password, name, birth_date, language, contact_number, gender, address, special_care, share_special_care,
    emergency_contact, additional_info }) => {
    try {
        const response = await fetch(`${API_URL}/users/carereceiver`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, confirm_password, name, birth_date, language, contact_number, gender, address, special_care, share_special_care,
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
    return token && jwt_decode(token).exp > Date.now() / 1000;
};
