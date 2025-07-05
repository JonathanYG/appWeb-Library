import axios from "axios";

const URL_BOOKING =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BOOKING_BACKEND_URL
    : "http://localhost:8087";

const BookingApi = axios.create({
  baseURL: `${URL_BOOKING}/api/booking`,
});

// const token = localStorage.getItem("token");
// const headers = { Authorization: `Bearer ${token}` };

// Registrar un nuevo préstamo
export const createBooking = (booking) =>
  BookingApi.post("/new", booking);

// Registrar una devolución de préstamo
export const returnBooking = (idBooking, email) =>
  BookingApi.post(`/return/${idBooking}`, null, {
    params: { email },
  });

// Buscar préstamos por email
export const findBookingsByEmail = (email) =>
  BookingApi.get(`/find/${email}`);

// Obtener todos los préstamos
export const getAllBookings = () =>
  BookingApi.get("/all");
