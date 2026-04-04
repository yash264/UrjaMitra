const BASE_URL = "https://api.mapbox.com/geocoding/v5/mapbox.places";
const TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;


export const fetchSuggestions = async (query) => {
    try {
        if (!query) return [];

        const url = `${BASE_URL}/${encodeURIComponent(query)}.json?access_token=${TOKEN}&autocomplete=true&limit=5`;

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error("Failed to fetch location suggestions");
        }

        const data = await res.json();

        return Array.isArray(data.features) ? data.features : [];
    } catch (err) {
        console.error("Suggestion API Error:", err);
        return [];
    }
};