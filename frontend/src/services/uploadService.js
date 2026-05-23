import axios from "axios";

const API_URL = "http://localhost:5000/api/upload";

export const uploadDocument = async (file, token) => {
  const formData = new FormData();

  formData.append("document", file);

  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};