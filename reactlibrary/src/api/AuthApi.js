import axios from "axios";

const URL_AUTH =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_AUTH_BACKEND_URL
    : "http://localhost:8087";

const AuthApi = axios.create({
  baseURL: `${URL_AUTH}/api/auth`,
});

// Función auxiliar para obtener token al momento de hacer la solicitud
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Registrar nuevo usuario (público)
export const registerUser = (userData) =>
  AuthApi.post("/register", userData);

// Iniciar sesión y obtener token (público)
export const loginRequest = (loginData) =>
  AuthApi.post("/login", loginData);

// Obtener todos los usuarios con su rol (privado)
export const getAllUsers = () =>
  AuthApi.get("/all", { headers: getAuthHeaders() });

// Buscar usuario por email (privado)
export const getUserByEmail = (email) =>
  AuthApi.get(`/find/${email}`, { headers: getAuthHeaders() });

// Cambiar estado activo/bloqueado (privado)
export const toggleUserState = (email) =>
  AuthApi.post(`/toggle-state/${email}`, null, { headers: getAuthHeaders() });
