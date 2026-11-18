import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const predictDelay = (data) => API.post("/predict/", data);
export const getStats = () => API.get("/stats/");
export const getHistory = () => API.get("/history/");
export const registerUser = (data) => API.post("/auth/register/", data);
export const loginUser = (data) => API.post("/auth/login/", data);