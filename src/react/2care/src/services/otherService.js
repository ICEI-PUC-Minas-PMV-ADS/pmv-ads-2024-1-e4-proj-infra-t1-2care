
import { apiService } from './apiService';

export const otherService = {
  async getUserData(userId) {
    return apiService.get(`users/${userId}`);
  },
  // Adicione outras funções de serviço conforme necessário
};
