import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './apiServiceMob';
import { useNavigation } from '@react-navigation/native';

const SERVICE_URL = "/user";

export const signIn = async ({ email, password }) => {
    try {
        const response = await fetch(`${API_URL}${SERVICE_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
       
        if (!response.ok) {
            const errorData = await response.json();
            if (errorData.detail.includes('longitude')) {
                throw new Error("CEP inválido. Por favor, verifique o CEP digitado.");
            } else {
                throw new Error(errorData.detail || 'Erro ao fazer login');
            }
        }

        const result = await response.json();
        
        await AsyncStorage.setItem('access', result.access);
        await AsyncStorage.setItem('refresh', result.refresh);
        await AsyncStorage.setItem('latitude', result.user.latitude);
        await AsyncStorage.setItem('longitude', result.user.longitude);
        await AsyncStorage.setItem('picture', result.user.picture);
        await AsyncStorage.setItem('user_type', result.user.user_type);
        
        return true;
    } catch (error) {
        alert('Usuário ou senha inválidos!');
        throw new Error(error.message);
    }
}

export const getAccessToken = async () => {
    try {
        const access = await AsyncStorage.getItem('access');
        return access;
    } catch (error) {
        throw new Error('Erro ao obter o token de acesso:', error);
    }
};


export const tokenRefresh = async () => {
    try {
        
        const refresh = await AsyncStorage.getItem('refresh');


        const response = await fetch(`${API_URL}${SERVICE_URL}/token/refresh/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh })
        });

        const result = await response.json();
        
        if (!response.ok) {
            await AsyncStorage.removeItem('access');
            await AsyncStorage.removeItem('refresh');
            throw new Error(JSON.stringify(result));
        }
        const token = result['access'];
        if (token) {
            await AsyncStorage.setItem('access', token);
        }
        return token;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const sendAuthenticatedRequest = async (url, method = 'GET', data = null) => {
    try {
        let access = await getAccessToken();
        const requestOptions = {
            method: method,
            headers: {
                'Authorization': `Bearer ${access}`,
                'Content-Type': 'application/json'
            }
        };

        if (data) {
            requestOptions.body = JSON.stringify(data);
        }

        let response = await fetch(`${url}`, requestOptions);

        if (response.status === 401 || response.status === 403) {
            try {
                let newAccessToken = await tokenRefresh();
                requestOptions.headers['Authorization'] = `Bearer ${newAccessToken}`;
                response = await fetch(`${url}`, requestOptions);
                if (!response.ok) {
                    throw new Error('Erro ao tentar usar o token atualizado.');
                }
            } catch (refreshError) {
                logout(() => useNavigation().navigate('Login'));
                
                throw new Error('Erro ao atualizar o token de acesso.');
            }
        }
        
        if (!response.ok) {
            throw new Error(JSON.stringify(response));
        }

        const result = await response.json();

        return result;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const isLogged = async () => {
    const access = await AsyncStorage.getItem('access');
    const refresh = await AsyncStorage.getItem('refresh');
    return access && refresh;
};


  export const getUserData = async () => {
    try {
        const token = await AsyncStorage.getItem('access');
        const response = await fetch(`${API_URL}${SERVICE_URL}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados do usuário');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
};

export const getCaregiverData = async () => {
    try {
        const token = await AsyncStorage.getItem('access');
        const response = await fetch(`${API_URL}${SERVICE_URL}/caregiver/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Erro ao buscar dados do cuidador');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const logout = async (navigateToLogin) => {
    try {
        await AsyncStorage.removeItem('access');
        await AsyncStorage.removeItem('refresh');

        const accessItem = await AsyncStorage.getItem('access');
        const refreshItem = await AsyncStorage.getItem('refresh');

        if (!accessItem && !refreshItem) {
            console.log('Logout realizado com sucesso!!');
        } else {
            console.log('Erro: Os itens de armazenamento local não foram removidos corretamente após o logout.');
        }

        if (navigateToLogin) {
            navigateToLogin();
        } else {
            console.error('Erro ao redirecionar para a tela de login: Função navigateToLogin não fornecida.');
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error.message);
    }
};