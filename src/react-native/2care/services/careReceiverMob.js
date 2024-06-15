import { API_URL } from './apiServiceMob';
import { sendAuthenticatedRequest } from './authServiceMob';
import { updateUser } from './userServiceMob';

const CARE_RECEIVER_SERVICE_URL = "/careReceiver";
const CAREGIVER_REQUESTS_SERVICE_URL = "/caregiver/requests"; 
export const updateCareReceiver = async (user, careReceiver) => { 
    try {
        const responseUserUpdate = await updateUser(user);
        const responseCareReceiverUpdate = await sendAuthenticatedRequest(`${API_URL}${CARE_RECEIVER_SERVICE_URL}/edit/`, "POST", careReceiver);
        alert("Dados atualizados com sucesso!");
        return { 'user': responseUserUpdate, 'careReceiver': responseCareReceiverUpdate };
    } catch (error) {
        alert('Erro ao atualizar dados');
        return false;
    } 
};
export const getCareReceiverData = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${CARE_RECEIVER_SERVICE_URL}`)
        return response;
    } catch (error) {
        return false
    }
};

export const getCareReceiverSpecialCare = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${CARE_RECEIVER_SERVICE_URL}/special-care-user`)
        return response;
    } catch (error) {
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

export const createEvaluation = async (evaluation) => {
        try {
            const response = await sendAuthenticatedRequest(`${API_URL}/caregiver/ratings/create`, "POST", evaluation);
            return response;
        } catch (error) {
            console.error('Erro ao enviar avaliação:', error.response ? error.response.data : error.message);
            throw new Error('Erro ao enviar avaliação: ' + (error.response ? error.response.data : error.message));
        }
    };

