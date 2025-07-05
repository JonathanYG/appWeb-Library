import axios from "axios";

const URL_BOOK =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === "production"
    ? import.meta.env.VITE_BOOK_BACKEND_URL
    : "http://localhost:8087";

const BookApi = axios.create({
  baseURL: `${URL_BOOK}/api/book`,
});

// const token = localStorage.getItem("token");
// const headers = { Authorization: `Bearer ${token}` };

// Crear un libro (y copia automática)
export const createBook = (book) =>
  BookApi.post("/new", book);

// Crear una nueva copia de un libro existente
export const createCopy = (bookId) =>
  BookApi.post(`/newcopy/${bookId}`, null);

// Obtener todas las copias disponibles de un libro por ID
export const getAvailableCopiesById = (bookId) =>
  BookApi.get(`/copy/available/${bookId}`);

// Obtener todas las copias disponibles por título
export const getAvailableCopiesByTitle = (title) =>
  BookApi.get(`/copy/${title}`);

// Obtener todos los libros
export const getAllBooks = () =>
  BookApi.get("/all");

// Buscar libros por tipo
export const getBooksByType = (type) =>
  BookApi.get(`/all/type/${type}`);

// Buscar libros por autor
export const getBooksByAuthor = (author) =>
  BookApi.get(`/all/author/${author}`);

// Buscar libros por título
export const getBooksByTitle = (title) =>
  BookApi.get(`/all/title/${title}`);
