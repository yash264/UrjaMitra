const token = process.env.REACT_APP_MAPBOX_TOKEN;

export const geocode = async (place) => {
    const token = process.env.REACT_APP_MAPBOX_TOKEN;

    const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=${token}`
    );

    const data = await res.json();

    if (!data.features || data.features.length === 0) {
        throw new Error(`Location not found: ${place}`);
    }

    return data.features[0].center;
};

export const getRoute = async (src, dst) => {
    const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${src[0]},${src[1]};${dst[0]},${dst[1]}?geometries=geojson&access_token=${token}`
    );
    const data = await res.json();
    return data.routes[0];
};