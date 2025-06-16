import React, { useEffect, useState } from "react";
import { StylesReaders } from "../styles/StylesReaders.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import Table from "../components/Table.jsx";
import ModalConfirm from "../components/ModalConfirm.jsx";
import { toast, Bounce } from "react-toastify";

export function Returns() {
    const styles = StylesReaders();
    const [allBookings, setAllBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);

    // Simula datos obtenidos desde el backend
    useEffect(() => {
        const fakeData = [
            {
                email: "john@bookhub.com",
                title: "Cien Años de Soledad",
                copyBookFK: 1,
                author: "Gabriel García Márquez",
                type: "Ficción",
                image64: "📚",
                state: true,
                dateBooking: "2024-06-01",
                dateReturn: "",
            },
            {
                email: "john@bookhub.com",
                title: "1984",
                copyBookFK: 2,
                author: "George Orwell",
                type: "Ficción",
                image64: "📕",
                state: true,
                dateBooking: "2024-05-15",
                dateReturn: "",
            },
            {
                email: "jane@bookhub.com",
                title: "El Principito",
                copyBookFK: 3,
                author: "Antoine de Saint-Exupéry",
                type: "Infantil",
                image64: "📘",
                state: true,
                dateBooking: "2024-06-10",
                dateReturn: "",
            },
        ];

        setAllBookings(fakeData);
        setFilteredBookings(fakeData.filter(b => b.state === true));
    }, []);

    // Filtra por email y por estado activo
    const handleSearch = (emailInput) => {
        const result = allBookings
            .filter(b => b.email.toLowerCase().includes(emailInput.toLowerCase()))
            .filter(b => b.state === true);

        setFilteredBookings(result);
    };

    const handleReturnClick = (booking) => {
        setSelectedBooking(booking);
        setShowConfirm(true);
    };

    const handleConfirmReturn = () => {
        if (!selectedBooking) return;
      
        const today = new Date().toISOString().split("T")[0];
      
        const payload = {
            userFK: selectedBooking.email,
            copyBookFK: selectedBooking.copyBookFK,
            state: false,
            dateReturn: today,
        };
      
        console.log("Payload a enviar:", payload);
      
        const updated = allBookings.map((b) =>
            b === selectedBooking ? { ...b, state: false, dateReturn: today } : b
        );
      
        setAllBookings(updated);
        setFilteredBookings(updated.filter(b => b.email === selectedBooking.email && b.state === true));
        setShowConfirm(false);
      
        toast.success("Devolución registrada exitosamente.", {
            theme: "dark",
            transition: Bounce,
        });
    };

    const columns = [
        { accessor: "email", label: "Lector" },
        { accessor: "image64", label: "Imagen" },
        { accessor: "title", label: "Título" },
        { accessor: "author", label: "Autor" },
        { accessor: "type", label: "Tipo" },
        { accessor: "state", label: "Estado" },
        { accessor: "dateBooking", label: "Fecha Préstamo" },
        { accessor: "dateReturn", label: "Fecha Devolución" },
    ];
    const formatted = filteredBookings.map(b => ({
        ...b,
        state: b.state === true ? "Activa" : "Devuelta",
        dateReturn: b.dateReturn || "Pendiente"
    }));

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Registrar Devolución</h1>
            <SearchBar
                styles={styles}
                onSearch={handleSearch}
                showSelect={false}
                placeholder="Buscar por email del lector..."
            />
            <div style={styles.tableWrapper}>
                <Table
                    title="Reservas Activas"
                    columns={columns}
                    data={formatted}
                    rowsPerPage={5}
                    onReturn={handleReturnClick}
                />
            </div>
            <ModalConfirm
                isOpen={showConfirm}
                message={`¿Confirmas la devolución del libro "${selectedBooking?.title}" de ${selectedBooking?.email}?`}
                onCancel={() => setShowConfirm(false)}
                onConfirm={handleConfirmReturn}
            />
        </div>
    );
}
