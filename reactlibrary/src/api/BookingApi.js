import axios from "axios";

const URL_BOOKING =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BOOKING_BACKEND_URL
    : "http://localhost:8087";

const BookingApi = axios.create({
  baseURL: `${URL_BOOKING}/api/booking`,
});

// Función auxiliar para obtener token al momento de hacer la solicitud
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Registrar un nuevo préstamo
export const createBooking = (booking) =>
  BookingApi.post("/new", booking, { headers: getAuthHeaders() });

// Registrar una devolución de préstamo
export const returnBooking = (idBooking, email) =>
  BookingApi.post(`/return/${idBooking}`, null, {
    headers: getAuthHeaders(),
    params: { email },
  });

// Buscar préstamos por email
export const findBookingsByEmail = (email) =>
  BookingApi.get(`/find/${email}`, { headers: getAuthHeaders() });

// Obtener todos los préstamos
export const getAllBookings = () =>
  BookingApi.get("/all", { headers: getAuthHeaders() });
