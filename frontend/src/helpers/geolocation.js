export const getDistance = (a, b) => {
    const R = 6371;
    const dLat = (b[1] - a[1]) * Math.PI / 180;
    const dLng = (b[0] - a[0]) * Math.PI / 180;

    const lat1 = a[1] * Math.PI / 180;
    const lat2 = b[1] * Math.PI / 180;

    const aVal =
        Math.sin(dLat / 2) ** 2 +
        Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    return R * (2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal)));
};