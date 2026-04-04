const BASE_URL = "https://api.openchargemap.io/v3/poi";

const API_KEY = process.env.REACT_APP_OCM_API_KEY; // optional


export const fetchEVStations = async (lat, lng) => {
  try {
    const url = `${BASE_URL}?output=json&latitude=${lat}&longitude=${lng}&distance=50&distanceunit=KM&maxresults=50&key=${API_KEY}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch EV stations");
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("EV API Error:", err);
    return [];
  }
};