import axios from "axios";

const API_URL = "http://localhost:5000/api/itinerary";

export const getUserItineraries = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const getSingleItinerary = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
// export const fetchSharedItinerary
export const getSingleItineraryShare = async (id) => {
  const response = await axios.get(`${API_URL}/share/${id}`);
  return response.data;
};
export const deleteItinerary = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
