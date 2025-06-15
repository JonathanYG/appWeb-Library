import React, { useEffect, useState } from "react";
import { StylesReaders } from "../styles/StylesReaders.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import Table from "../components/Table.jsx";
import ModalForm from "../components/ModalForm.jsx";
import { CustomButton } from "../components/CustomButton.jsx";
import { FaPlus } from "react-icons/fa";
import { toast, Bounce } from "react-toastify";

export function Books() {
    const styles = StylesReaders();

    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showBookModal, setShowBookModal] = useState(false);
    const [showCopyModal, setShowCopyModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedBookTitle, setSelectedBookTitle] = useState("");
    const [newBook, setNewBook] = useState({ author: "", title: "", type: "", image64: null });

    const typeOptions = [
        { value: "Ficción", label: "Ficción" },
        { value: "No Ficción", label: "No Ficción" },
        { value: "Infantil", label: "Infantil" },
        { value: "Fantasía", label: "Fantasía" },
    ];

    useEffect(() => {
        const mockBooks = [
            { id: 1, author: "Autor 1", title: "Libro A", type: "Ficción", image64: "📕" },
            { id: 2, author: "Autor 2", title: "Libro B", type: "Fantasía", image64: "📘" },
        ];
        setAllBooks(mockBooks);
        setFilteredBooks(mockBooks);
    }, []);

    const handleSearch = (text) => {
        const lower = text.toLowerCase();
        const filtered = allBooks.filter((b) => b.title.toLowerCase().includes(lower));
        setFilteredBooks(filtered);
    };

    const handleOpenCreateCopy = (book) => {
        setSelectedBookId(book.id);
        setSelectedBookTitle(book.title);
        setShowCopyModal(true);
    };

    const handleCreateBook = () => {
        const { author, title, type, image64 } = newBook;
        if (!author || !title || !type || !image64) {
            toast.warn("Todos los campos son obligatorios.", { theme: "dark", transition: Bounce });
            return;
        }

        const formData = new FormData();
        formData.append("author", author);
        formData.append("title", title);
        formData.append("type", type);
        formData.append("image64", image64);

        // Simulación de éxito
        toast.success("Libro creado exitosamente.", { theme: "dark", transition: Bounce });
        setShowBookModal(false);
        setNewBook({ author: "", title: "", type: "", image64: null });
    };

    const handleCreateCopy = () => {
        if (!selectedBookId) {
          toast.error("Error al identificar el libro.", { theme: "dark", transition: Bounce });
          return;
        }
      
        const copyPayload = {
          bookFK: selectedBookId,
          state: true, // o 1
        };
      
        console.log("Datos a enviar:", copyPayload);
      
        toast.success("Copia registrada exitosamente.", { theme: "dark", transition: Bounce });
        setShowCopyModal(false);
      };
      

    const bookColumns = [
        { accessor: "title", label: "Título" },
        { accessor: "author", label: "Autor" },
        { accessor: "type", label: "Tipo" },
        { accessor: "image64", label: "Imagen" },
    ];

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Gestión de Libros</h1>

            <SearchBar
                styles={styles}
                onSearch={handleSearch}
                placeholder="Buscar por título de libro..."
                showSelect={false}
            />

            <div style={{ ...styles.tableWrapper, marginBottom: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <CustomButton
                    text="Agregar Libro"
                    icon={<FaPlus />}
                    style={styles.buttonAddStyle}
                    hoverStyle={styles.buttonAddStyleAlt}
                    onClick={() => {
                        setNewBook({ author: "", title: "", type: "", image64: null });
                        setShowBookModal(true);
                    }}
                />
            </div>

            <Table
                title="Listado de Libros"
                columns={bookColumns}
                data={filteredBooks}
                rowsPerPage={5}
                onEdit={handleOpenCreateCopy}
            />

            <ModalForm
                isOpen={showBookModal}
                onClose={() => setShowBookModal(false)}
                onSubmit={handleCreateBook}
                title="Crear Libro"
                inputs={[
                    {
                        label: "Autor",
                        name: "author",
                        type: "text",
                        value: newBook.author,
                        onChange: (e) => setNewBook({ ...newBook, author: e.target.value }),
                    },
                    {
                        label: "Título",
                        name: "title",
                        type: "text",
                        value: newBook.title,
                        onChange: (e) => setNewBook({ ...newBook, title: e.target.value }),
                    },
                    {
                        label: "Imagen",
                        name: "image64",
                        type: "file",
                        value: "",
                        onChange: (e) => setNewBook({ ...newBook, image64: e.target.value }),
                    },
                ]}
                selects={[
                    {
                        label: "Tipo",
                        name: "type",
                        value: newBook.type,
                        onChange: (e) => setNewBook({ ...newBook, type: e.target.value }),
                        options: typeOptions,
                    },
                ]}
            />

            <ModalForm
                isOpen={showCopyModal}
                onClose={() => setShowCopyModal(false)}
                onSubmit={handleCreateCopy}
                title={`Crear Copia de: ${selectedBookTitle}`}
                inputs={[
                {
                    label: "Título",
                    name: "book_title",
                    type: "text",
                    value: selectedBookTitle,
                    disabled: true,
                },
                {
                    label: "Estado",
                    name: "state",
                    type: "text",
                    value: "Disponible",
                    disabled: true,
                },
                ]}
            />
        </div>
    );
}
