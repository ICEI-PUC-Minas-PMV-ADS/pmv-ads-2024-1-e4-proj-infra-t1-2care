import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
    return await AsyncStorage.getItem('access');
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
            let newAccessToken = await tokenRefresh();
            requestOptions.headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(`${url}`, requestOptions);
            if (response.status === 401 || response.status === 403) {
                await AsyncStorage.removeItem('access');
                await AsyncStorage.removeItem('refresh');
            }
        }

        if (!response.ok) {
            throw new Error(JSON.stringify(response));
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};