import React, { useState, useEffect } from "react";
import { StylesHome } from "../styles/StylesHome.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import { CardBook } from "../components/CardBook.jsx";
import {
  getAllBooks,
  getBooksByAuthor,
  getBooksByTitle,
  getBooksByType,
  getAvailableCopiesById,
} from "../api/BookApi.js";

export function Home() {
  const styles = StylesHome();

  const [libros, setLibros] = useState([]);
  const [, setSearchText] = useState("");
  const [, setSelectedCategory] = useState("Todos los tipos");

  // Opciones para el select
  const categorias = ["Todos los tipos", "Ficción", "No Ficción", "Infantil", "Fantasía","Novela", "Ciencia Ficción"];

  // Cargar todos los libros al iniciar
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await getAllBooks();
      const librosConEstado = await Promise.all(
        response.data.map(async (libro) => {
          const copias = await getAvailableCopiesById(libro.id);
          return { ...libro, disponible: copias.data.length > 0 };
        })
      );
      setLibros(librosConEstado);
    } catch (error) {
      console.error("Error al cargar libros:", error);
    }
  };

  const handleSearch = async (newSearchText, newCategory) => {
    setSearchText(newSearchText);
    setSelectedCategory(newCategory);

    try {
      let resultado = [];

      if (newSearchText.trim() !== "") {
        // Prioridad: título > autor
        resultado = await getBooksByTitle(newSearchText);
        if (resultado.data.length === 0) {
          resultado = await getBooksByAuthor(newSearchText);
        }
      } else if (newCategory !== "Todos los tipos") {
        resultado = await getBooksByType(newCategory);
      } else {
        resultado = await getAllBooks();
      }

      const librosConEstado = await Promise.all(
        resultado.data.map(async (libro) => {
          const copias = await getAvailableCopiesById(libro.id);
          return { ...libro, disponible: copias.data.length > 0 };
        })
      );

      setLibros(librosConEstado);
    } catch (error) {
      console.error("Error al buscar libros:", error);
    }
  };

  return (
    <div style={styles.contenedorEstilo}>
      <SearchBar
        styles={styles}
        onSearch={handleSearch}
        options={categorias}
        placeholder="Buscar libros por título o autor..."
        defaultOption="Todos los tipos"
        showSelect={true}
      />

      <h2 style={styles.tituloColeccionEstilo}>Explora Nuestra Colección</h2>

      <div style={styles.gridLibrosEstilo}>
        {libros.map((libro, index) => (
          <CardBook key={index} libro={libro} styles={styles} />
        ))}
      </div>
    </div>
  );
};