import React, { useState } from "react";
import { StylesHome } from "../styles/StylesHome.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import { CardBook } from "../components/CardBook.jsx";

const libros = [
  {
    titulo: "La Gran Aventura",
    autor: "Juan Pérez",
    categoria: "Ficción",
    imagen: "a",
  },
  {
    titulo: "Enciclopedia de la Ciencia",
    autor: "Emily Johnson",
    categoria: "No Ficción",
    imagen: "a",
  },
  {
    titulo: "Biblioteca Mística",
    autor: "Miguel Blanco",
    categoria: "Fantasía",
    imagen: "a",
  },
  {
    titulo: "Explorador Espacial",
    autor: "Sara Villalobos",
    categoria: "Ciencia Ficción",
    imagen: "a",
  },
  {
    titulo: "Sueños Nocturnos",
    autor: "David León",
    categoria: "Fantasía",
    imagen: "a",
  },
  {
    titulo: "Biblioteca del Cielo",
    autor: "Emma Torres",
    categoria: "Fantasía",
    imagen: "a",
  },
];

export function Home() {
  const styles = StylesHome();

  // Estado donde se guarda la búsqueda "oficial"
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos los tipos");

  // Opciones para el select
  const categorias = ["Todos los tipos", "Ficción", "No Ficción", "Fantasía", "Ciencia Ficción"];

  // Filtrado basado en la búsqueda oficial (cuando presionan "Buscar")
  const librosFiltrados = libros.filter((libro) => {
    const coincideTexto =
      libro.titulo.toLowerCase().includes(searchText.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchText.toLowerCase());

    const coincideCategoria =
      selectedCategory === "Todos los tipos" || libro.categoria === selectedCategory;

    return coincideTexto && coincideCategoria;
  });

  // Función que se pasa al SearchBar para actualizar búsqueda al pulsar "Buscar"
  function handleSearch(newSearchText, newCategory) {
    setSearchText(newSearchText);
    setSelectedCategory(newCategory);
  }

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
        {librosFiltrados.map((libro, index) => (
          <CardBook key={index} libro={libro} styles={styles} />
        ))}
      </div>
    </div>
  );
};

