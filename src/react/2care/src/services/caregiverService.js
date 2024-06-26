import { API_URL } from './apiService';
import { sendAuthenticatedRequest } from './authService';
import { updateUser } from './userService';
import { toast } from 'react-toastify';

const SERVICE_URL = "/caregiver";

export const updateCaregiver = async (user, caregiver) => { 
    try {
        const responseUserUpdate = await updateUser(user)
        const responseCaregiverUpdate = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/edit/`, "POST", caregiver)
        toast.success("Dados atualizados com sucesso!");
        return {'user':responseUserUpdate, 'caregiver':responseCaregiverUpdate};
    } catch (error) {
        toast.error('Erro ao atualizar dados');
        throw new Error(error.message);
    } 
};

export const getCaregiverData = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}`)
        return response;
    } catch (error) {
        return false
    }
};

export const getEvaluationData = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/ratings`)
        return response;
    } catch (error) {
        toast.error('Falha ao receber lista de avaliações');
        return false
    }
};

export const getAllowedToEvaluate = async (caregiverId) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/ratings/count`, "POST", caregiverId)
        return response;
    } catch (error) {
        return false
    }
};

export const createEvaluation = async (evaluation) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/ratings/`, "POST", evaluation)
        return response;
    } catch (error) {
        toast.error('Falha ao criar avaliação');
        return false
    }
};

export const addSpecialization = async (specialization) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/add/specialization/`, "POST", specialization)
        toast.success('Especialização criada com sucesso');
        return response;
    } catch (error) {
        toast.error('Falha ao criar Especialização');
        return false
    }
};

export const removeSpecialization = async (specialization) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/remove/specialization/`, "POST", specialization)
        toast.success('Especialização removida com sucesso');
        return response;
    } catch (error) {
        toast.error('Falha ao remover Especialização');
        return false
    }
};

export const getSpecializationList = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/specialization`)
        return response;
    } catch (error) {
        toast.error('Falha ao receber lista de Especializações');
        return false
    }
};

export const addQualification = async (qualification) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/qualification/`, "POST", qualification)
        toast.success('Qualificação adicionada com sucesso');
        return response;
    } catch (error) {
        toast.error('Falha ao criar qualificação');
        return false
    }
};

export const removeQualification = async (qualification) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/qualification/${qualification}/`, "DELETE")
        toast.success('Qualificação removida com sucesso');
        return response;
    } catch (error) {
        toast.error('Falha ao remover qualificação');
        return false
    }
};

export const getQualificationList = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/qualification/`)
        return response;
    } catch (error) {
        toast.error('Falha ao receber lista de qualificações');
        return false
    }
};


export const addWorkExperience = async (workExperience) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/workExperience/`, "POST", workExperience)
        toast.success('Experiência de trabalho adicionada com sucesso');
        return response;
    } catch (error) {
        toast.error('Falha ao criar Experiência de trabalho');
        return false
    }
};

export const removeWorkExperience = async (workExperience) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/workExperience/${workExperience}/`, "DELETE")
        toast.success('Experiência de trabalho removida com sucesso');
        return response;
    } catch (error) {
        toast.error('Falha ao remover Experiência de trabalho');
        return false
    }
};

export const getWorkExperienceList = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/workExperience`)
        return response;
    } catch (error) {
        toast.error('Falha ao receber lista de experiência de trabalho');
        return false
    }
};

export const getSelfCalendar = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/my-calendar`)
        return response;
    } catch (error) {
        toast.error('Falha ao receber informações de calendario');
        return false
    }
};

export const editSelfCalendar = async (calendar) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/calendar/update/`, "PUT", calendar)
        return response;
    } catch (error) {
        toast.error('Falha ao receber informações de calendario');
        return false
    }
};

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

export const getRequestsList = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/requests`)
        return response;
    } catch (error) {
        toast.error('Falha ao receber lista de propostas');
        return false
    }
};

export const acceptRequest = async (requestId) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/requests/${requestId}/accept`)
        return response;
    } catch (error) {
        toast.error('Falha ao aceitar proposta');
        return false
    }
};

export const declineRequest = async (requestId) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/requests/${requestId}/decline`)
        return response;
    } catch (error) {
        toast.error('Falha ao recusar proposta');
        return false
    }
};

export const cancelRequest = async (requestId) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/requests/${requestId}/cancel`)
        return response;
    } catch (error) {
        toast.error('Falha ao cancelar proposta');
        return false
    }
};

export const sendProposalToCaregiver = async (proposalData) => { 
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/requests/`, "POST", proposalData);
        return response;
    } catch (error) {
        toast.error('Erro ao enviar proposta para o cuidador:', error);
        toast.error('Por favor, complete seu cadastro e tente novamente:', error);
    } 
};