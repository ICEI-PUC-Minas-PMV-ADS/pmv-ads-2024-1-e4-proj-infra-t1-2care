// import { API_URL } from './apiService';
// import { toast } from 'react-toastify';

const SERVICE_URL = "/caregiver";
export const API_URL = "http://127.0.0.1:8000/api";
//const API_URL = process.env.NODE_ENV === 'development' ? REACT_APP_DEV_MODE : REACT_APP_PROD_MODE;

export const getCaregiverList = async () => {
    try {
        const response = await fetch(`${API_URL}${SERVICE_URL}/list`)
        
        if (!response.ok) {
            throw new Error(JSON.stringify(response));
        }
        return await response.json();
    } catch (error) {
        toast.error('Falha ao receber lista de cuidadores');
        return false
    }
};
