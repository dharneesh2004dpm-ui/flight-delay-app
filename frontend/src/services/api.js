import axios from "axios";

const API = axios.create({
  baseURL: "https://flight-delay-app-x259.onrender.com/api",
});

export const predictDelay = (data) => API.request({ method: "POST", url: "/predict/", data });
export const getStats = () => API.get("/stats/");
export const getHistory = () => API.get("/history/");
export const registerUser = (data) => API.request({ method: "POST", url: "/auth/register/", data });
export const loginUser = (data) => API.request({ method: "POST", url: "/auth/login/", data });