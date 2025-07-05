import axios from "axios";

const URL_AUTH =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_AUTH_BACKEND_URL
    : "http://localhost:8087";

const AuthApi = axios.create({
  baseURL: `${URL_AUTH}/api/auth`,
});

// const token = localStorage.getItem("token");
// const headers = { Authorization: `Bearer ${token}` };

// Registrar nuevo usuario
export const registerUser = (userData) =>
  AuthApi.post("/register", userData);

// Obtener todos los usuarios con su rol
export const getAllUsers = () =>
  AuthApi.get("/all");

// Buscar usuario por email
export const getUserByEmail = (email) =>
  AuthApi.get(`/find/${email}`);

// Cambiar estado activo/bloqueado de un usuario
export const toggleUserState = (email) =>
  AuthApi.post(`/toggle-state/${email}`);
