import axios from "axios";

const URL_FINE =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_FINE_BACKEND_URL
    : "http://localhost:8087";

const FineApi = axios.create({
  baseURL: `${URL_FINE}/api/fine`,
});

// const token = localStorage.getItem("token");
// const headers = { Authorization: `Bearer ${token}` };

// Obtener multas por email
export const getFinesByEmail = (email) =>
  FineApi.get(`/find/${email}`);
