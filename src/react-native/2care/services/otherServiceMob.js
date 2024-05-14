import { sendAuthenticatedRequest } from "./authServiceMob.js";
import { API_URL } from './apiServiceMob.js';

const SERVICE_URL = "/core";

export const getGeolocationApi = async (post_code) => {

  try {
    const response = await fetch(`${API_URL}${SERVICE_URL}/get/location/${post_code}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
        const result = await response.json();
        throw new Error(JSON.stringify(result));
    }

    const result = await response.json();

    return {"latitude": Number(result["results"][0]["geometry"]["location"]["lat"].toFixed(6)), "longitude": Number(result["results"][0]["geometry"]["location"]["lng"].toFixed(6))};
} catch (error) {
    throw new Error(error.message);
}
};