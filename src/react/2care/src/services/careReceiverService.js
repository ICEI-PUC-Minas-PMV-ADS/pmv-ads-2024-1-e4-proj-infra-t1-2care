import { API_URL } from './apiService';
import { sendAuthenticatedRequest } from './authService';
import { updateUser } from './userService';

const SERVICE_URL = "/careReceiver";

export const updateCareReceiver = async (user, careReceiver) => { 
    try {
        const responseUserUpdate = await updateUser(user)
        const responseCareReceiverUpdate = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/edit/`, "POST", careReceiver)
        //retornar fail ou sucess de acordo.
        alert("updated")

        return {'user':responseUserUpdate, 'careReceiver':responseCareReceiverUpdate};
    } catch (error) {
        alert('Erro ao atualizar dados de Cliente');
        return false
    } 
};

export const getCareReceiverData = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}`)
        return response;
    } catch (error) {
        alert('Não foi possivel receber os dados!');
        return false
    }
};