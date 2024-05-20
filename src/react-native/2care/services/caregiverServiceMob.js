import { API_URL } from './apiServiceMob';
import { sendAuthenticatedRequest } from './authServiceMob';
import { updateUser } from './userServiceMob';

const SERVICE_URL = "/caregiver";

export const updateCaregiver = async (user, caregiver) => { 
    try {
        const responseUserUpdate = await updateUser(user)
        const responseCaregiverUpdate = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/edit/`, "POST", caregiver)
        //retornar fail ou sucess de acordo.
        alert("updated")
        return {'user':responseUserUpdate, 'caregiver':responseCaregiverUpdate};
    } catch (error) {
        alert('Dados inválidos, gentileza verifique o preenchimento!');
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
        return false
    }
};

export const addSpecialization = async (specialization) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/add/specialization/`, "POST", specialization)
        return response;
    } catch (error) {
        return false
    }
};

export const removeSpecialization = async (specialization) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/remove/specialization/`, "POST", specialization)
        return response;
    } catch (error) {
        console.log(error)
        return false
    }
};

export const getSpecializationList = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/specialization`)
        return response;
    } catch (error) {
        console.log(error)
        return false
    }
};

export const addQualification = async (qualification) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/qualification/`, "POST", qualification)
        return response;
    } catch (error) {
        return false
    }
};

export const removeQualification = async (qualification) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/qualification/${qualification}/`, "DELETE")
        return response;
    } catch (error) {
        console.log(error)
        return false
    }
};

export const getQualificationList = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/qualification`)
        return response;
    } catch (error) {
        console.log(error)
        return false
    }
};


export const addWorkExperience = async (workExperience) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/workExperience/`, "POST", workExperience)
        return response;
    } catch (error) {
        return false
    }
};

export const removeWorkExperience = async (workExperience) => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/workExperience/${workExperience}/`, "DELETE")
        return response;
    } catch (error) {
        console.log(error)
        return false
    }
};

export const getWorkExperienceList = async () => {
    try {
        const response = await sendAuthenticatedRequest(`${API_URL}${SERVICE_URL}/workExperience`)
        return response;
    } catch (error) {
        console.log(error)
        return false
    }
};


