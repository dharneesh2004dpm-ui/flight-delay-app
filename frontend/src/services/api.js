import axios from "axios";

const API = axios.create({
  baseURL: "https://flight-delay-app-x259.onrender.com/api",
});

export const predictDelay = (data) => [invalid URL]("/predict/", data);
export const getStats = () => API.get("/stats/");
export const getHistory = () => API.get("/history/");
export const registerUser = (data) => [invalid URL]("/auth/register/", data);
export const loginUser = (data) => [invalid URL]("/auth/login/", data);