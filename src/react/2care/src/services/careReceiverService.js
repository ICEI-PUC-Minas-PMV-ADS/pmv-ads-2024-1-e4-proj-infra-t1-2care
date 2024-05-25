import { API_URL } from './apiService';
import { sendAuthenticatedRequest } from './authService';
import { updateUser } from './userService';
import { toast } from 'react-toastify';


const SERVICE_URL = "/careReceiver";
const CAREGIVER_REQUESTS_SERVICE_URL = "/caregiver/requests"; 

export const updateCareReceiver = async (user, careReceiver) => { 
    try {
        const responseUserUpdate = await updateUser(user)
        const responseCareReceiverUpdate = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/edit/`, "POST", careReceiver)
        toast.success("Dados atualizados com sucesso!");
        return {'user':responseUserUpdate, 'careReceiver':responseCareReceiverUpdate};
    } catch (error) {
        toast.error('Erro ao atualizar dados');
        return false
    } 
};

export const getCareReceiverData = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}`)
        return response;
    } catch (error) {
        return false
    }
};

export const addSpecialCare = async (specialCare) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/special-care-user/`, "POST", specialCare)
        toast.success("Cuidado especial adicionado com sucesso!");
        return response;
    } catch (error) {
        toast.error("Falha ao criar cuidado especial");
        return false
    }
};

export const removeSpecialCare = async (specialCare) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/special-care-user/${specialCare}/`, "DELETE")
        toast.success("Cuidado especial removido com sucesso!");
        return response;
    } catch (error) {
        toast.error("Falha ao remover cuidado especial");
        return false
    }
};

export const getSpecialCareList = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/special-care-user`)
        return response;
    } catch (error) {
        toast.error("Falha ao receber lista de cuidados especiais");
        return false
    }
};