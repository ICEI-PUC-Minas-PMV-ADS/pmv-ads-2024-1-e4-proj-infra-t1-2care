import { API_URL } from './apiService';
import { sendAuthenticatedRequest } from './authService';
import { updateUser } from './userService';

const CARE_RECEIVER_SERVICE_URL = "/careReceiver";
const CAREGIVER_REQUESTS_SERVICE_URL = "/caregiver/requests"; // Ajuste a URL conforme sua configuração

export const updateCareReceiver = async (user, careReceiver) => { 
    try {
        const responseUserUpdate = await updateUser(user)
        const responseCareReceiverUpdate = await sendAuthenticatedRequest(`${API_URL}${CARE_RECEIVER_SERVICE_URL}/edit/`, "POST", careReceiver)
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
        const response = await sendAuthenticatedRequest(`${API_URL}${CARE_RECEIVER_SERVICE_URL}`)
        return response;
    } catch (error) {
        alert('Não foi possivel receber os dados!');
        return false
    }
};

export const sendProposalToCaregiver = async (proposalData) => { 
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${CAREGIVER_REQUESTS_SERVICE_URL}`, "POST", proposalData);
        return response;
    } catch (error) {
        console.error('Erro ao enviar proposta para o cuidador:', error);
        throw error;
    } 
};
