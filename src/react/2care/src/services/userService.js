import { sendAuthenticatedRequest } from "./authService.js";

const API_URL = "http://127.0.0.1:8000";

export const getUserByEmail = async (email) => {
  try {
    const result = await sendAuthenticatedRequest(`/register?email=${encodeURIComponent(email)}`, 'GET');
    return result;
  } catch (error) {
    throw new Error(`Erro ao obter usuário por e-mail: ${error.message}`);
  }
};

export const getUsers = async () => {
    try {
        const result = await sendAuthenticatedRequest('/user/list/', 'GET');
        return result;
    } catch (error) {
        throw new Error(`Erro ao obter a lista de usuários: ${error.message}`);
    }
};

export const getUserById = async (userId) => {
    try {
        const result = await sendAuthenticatedRequest(`/user/${userId}/details`, 'GET');
        return result;
    } catch (error) {
        throw new Error(`Erro ao obter detalhes do usuário: ${error.message}`);
    }
};

export const updateUser = async (userId, userData) => {
    try {
        const result = await sendAuthenticatedRequest(`/user/${userId}/update`, 'PUT', userData);
        return result;
    } catch (error) {
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
};

export const deleteUser = async (userId) => {
    try {
        const result = await sendAuthenticatedRequest(`/user/${userId}/delete`, 'DELETE');
        return result.message;
    } catch (error) {
        throw new Error(`Erro ao excluir usuário: ${error.message}`);
    }
};

export default {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
};
