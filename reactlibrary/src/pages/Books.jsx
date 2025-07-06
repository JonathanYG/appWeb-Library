import React, { useEffect, useState } from "react";
import { StylesReaders } from "../styles/StylesReaders.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import Table from "../components/Table.jsx";
import ModalForm from "../components/ModalForm.jsx";
import { CustomButton } from "../components/CustomButton.jsx";
import { FaPlus } from "react-icons/fa";
import { toast, Bounce } from "react-toastify";
import { getAllBooks, getBooksByTitle, createBook, createCopy, getAvailableCopiesByTitle  } from "../api/BookApi.js";

export function Books() {
    const styles = StylesReaders();

    const [, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [showBookModal, setShowBookModal] = useState(false);
    const [showCopyModal, setShowCopyModal] = useState(false);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [selectedBookTitle, setSelectedBookTitle] = useState("");
    const [newBook, setNewBook] = useState({ author: "", title: "", type: "", image64: null });
    const [loadingCreateBook, setLoadingCreateBook] = useState(false);
    const [loadingCreateCopy, setLoadingCreateCopy] = useState(false);

    const typeOptions = [
        { value: "Ficción", label: "Ficción" },
        { value: "No Ficción", label: "No Ficción" },
        { value: "Infantil", label: "Infantil" },
        { value: "Fantasía", label: "Fantasía" },
        { value: "Novela", label: "Novela" },
        { value: "Ciencia Ficción", label: "Ciencia Ficción" },
    ];

    useEffect(() => {
        fetchBooksWithCopies();
    }, []);

    const fetchBooksWithCopies = async () => {
        try {
            const res = await getAllBooks();
            const books = res.data;
        
            // Para cada libro, obtener las copias disponibles
            const booksWithCopies = await Promise.all(
                books.map(async (book) => {
                try {
                    const copyRes = await getAvailableCopiesByTitle(book.title);
                    const availableCopies = copyRes.data.length || 0;
        
                    return { ...book, availableCopies };
                } catch (err) {
                    console.error(`Error al obtener copias de ${book.title}:`, err);
                    return { ...book, availableCopies: 0 };
                }
                })
            );
            setAllBooks(booksWithCopies);
            setFilteredBooks(booksWithCopies);
        } catch (error) {
            console.error("Error al obtener libros:", error);
            toast.error("Error al obtener libros", { theme: "dark", transition: Bounce });
        }
      };

    const handleSearch = async (text) => {
        if (!text) return fetchBooksWithCopies();

        try {
            const res = await getBooksByTitle(text);
            setFilteredBooks(res.data);
        } catch (error) {
            console.error("Error al buscar libros:", error);
            toast.error("Error al buscar libros", { theme: "dark", transition: Bounce });
        }
    };

    const handleOpenCreateCopy = (book) => {
        setSelectedBookId(book.id);
        setSelectedBookTitle(book.title);
        setShowCopyModal(true);
    };

    const handleCreateBook = async () => {
        if (loadingCreateBook) return;
        const { author, title, type, image64 } = newBook;
        if (!author || !title || !type || !image64) {
            toast.warn("Todos los campos son obligatorios.", { theme: "dark", transition: Bounce });
            return;
        }
    
        try {
            setLoadingCreateBook(true);
            await createBook({ author, title, type, image64 });
            toast.success("Libro creado exitosamente.", { theme: "dark", transition: Bounce });
            setShowBookModal(false);
            setNewBook({ author: "", title: "", type: "", image64: null });
            fetchBooksWithCopies();
            window.location.reload();
        } catch (error) {
            console.error("Error al crear libro:", error);
            toast.error("No se pudo crear el libro.", { theme: "dark", transition: Bounce });
        } finally {
            setLoadingCreateBook(false);
        }
    };

    const handleCreateCopy = async () => {
        if (loadingCreateCopy) return;
    
        if (!selectedBookId) {
            toast.error("Error al identificar el libro.", { theme: "dark", transition: Bounce });
            return;
        }
    
        try {
            setLoadingCreateCopy(true);
            await createCopy(selectedBookId);
            toast.success("Copia registrada exitosamente.", { theme: "dark", transition: Bounce });
            setShowCopyModal(false);
            fetchBooksWithCopies();
            window.location.reload();
        } catch (error) {
            console.error("Error al crear copia:", error);
            toast.error("No se pudo crear la copia.", { theme: "dark", transition: Bounce });
        } finally {
            setLoadingCreateCopy(false);
        }
    };

    const bookColumns = [
        { accessor: "title", label: "Título" },
        { accessor: "author", label: "Autor" },
        { accessor: "type", label: "Tipo" },
        { accessor: "image64", label: "Imagen" },
        { accessor: "availableCopies", label: "Copias Disponibles" },
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
                onCreateCopy={handleOpenCreateCopy}
            />

            <ModalForm
                isOpen={showBookModal}
                onClose={() => setShowBookModal(false)}
                onSubmit={handleCreateBook}
                title="Crear Libro"
                confirmText="¿Estás seguro de que deseas crear este nuevo libro?"
                disabled={loadingCreateBook}
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
                        onChange: (e) => {
                            const file = e.target.value;
                            setNewBook({ ...newBook, image64: file });
                        },
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
                confirmText="¿Estás seguro de que deseas crear una copia de este libro?"
                disabled={loadingCreateCopy}
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
