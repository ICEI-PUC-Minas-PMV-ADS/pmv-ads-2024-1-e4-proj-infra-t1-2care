
import { apiService } from './apiService';

export const authService = {
  async register(userData) {
    return apiService.post('register', userData);
  },
  
  async login(credentials) {
    return apiService.post('login', credentials);
  },
  
  async logout() {
    return apiService.post('logout');
  },

  async refreshToken(token) {
    return apiService.post('token/refresh', { token });
  },

  async verifyToken(token) {
    return apiService.post('token/verify', { token });
  },

  // Adicione outras funções de autenticação conforme necessário
};
