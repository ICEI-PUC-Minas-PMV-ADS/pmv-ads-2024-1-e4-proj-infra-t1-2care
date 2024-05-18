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

function toRad(Value) {
    return Value * Math.PI / 180;
}