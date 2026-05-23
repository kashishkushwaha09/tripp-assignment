import axios from "axios";

const API = axios.create({
  baseURL: "https://tripp-assignment-1.onrender.com/api",
});

export default API;