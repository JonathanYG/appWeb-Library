import axios from "axios";

const URL_BOOK =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BOOK_BACKEND_URL
    : "http://localhost:8087";

const BookApi = axios.create({
  baseURL: `${URL_BOOK}/api/book`,
});

// Función auxiliar para obtener token al momento de hacer la solicitud
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { Authorization: `Bearer ${token}` };
};

// Crear un libro (y copia automática)
export const createBook = (book) =>
  BookApi.post("/new", book, { headers: getAuthHeaders() });

// Crear una nueva copia de un libro existente
export const createCopy = (bookId) =>
  BookApi.post(`/newcopy/${bookId}`, null, { headers: getAuthHeaders() });

// Obtener todas las copias disponibles de un libro por ID
export const getAvailableCopiesById = (bookId) =>
  BookApi.get(`/copy/available/${bookId}`, { headers: getAuthHeaders() });

// Obtener todas las copias disponibles por título
export const getAvailableCopiesByTitle = (title) =>
  BookApi.get(`/copy/${title}`, { headers: getAuthHeaders() });

// Obtener todos los libros
export const getAllBooks = () =>
  BookApi.get("/all", { headers: getAuthHeaders() });

// Buscar libros por tipo
export const getBooksByType = (type) =>
  BookApi.get(`/all/type/${type}`, { headers: getAuthHeaders() });

// Buscar libros por autor
export const getBooksByAuthor = (author) =>
  BookApi.get(`/all/author/${author}`, { headers: getAuthHeaders() });

// Buscar libros por título
export const getBooksByTitle = (title) =>
  BookApi.get(`/all/title/${title}`, { headers: getAuthHeaders() });
