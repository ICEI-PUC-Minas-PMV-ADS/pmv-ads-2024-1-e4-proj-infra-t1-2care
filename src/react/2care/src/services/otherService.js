import { sendAuthenticatedRequest } from "./authService.js";
const BASE_URL = "http://127.0.0.1:8000";


export const getGeolocationApi = async (post_code) => {

  try {
    const response = await fetch(`${BASE_URL}/get/location/${post_code}`, {
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