import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);

export const runExperiment = (data) => API.post("/experiments", data);
export const listExperiments = () => API.get("/experiments");
export const getExperimentById = (id) => API.get(`/experiments/${id}`);

export default {
  registerUser,
  loginUser,
  runExperiment,
  listExperiments,
  getExperimentById,
};
