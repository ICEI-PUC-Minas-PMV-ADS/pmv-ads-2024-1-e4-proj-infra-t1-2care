import { API_URL } from './apiServiceMob';

const SERVICE_URL = "/caregiver";
//const API_URL = process.env.NODE_ENV === 'development' ? REACT_APP_DEV_MODE : REACT_APP_PROD_MODE;

export const getCaregiverList = async () => {
    try {
        const response = await fetch(`${API_URL}${SERVICE_URL}/list`)
        
        if (!response.ok) {
            throw new Error(JSON.stringify(response));
        }
        return await response.json();
    } catch (error) {
        console.log('Falha ao receber lista de cuidadores ' + error);
        return false
    }
};

function toRad(Value) {
    return Value * Math.PI / 180;
}

export const calcDistanceKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the Earth in km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radLat1) * Math.cos(radLat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    var d = R * c;
    return d.toFixed(1);
}