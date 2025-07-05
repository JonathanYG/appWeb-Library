import React, { useEffect, useState } from "react";
import { StylesReaders } from "../styles/StylesReaders.jsx";
import { SearchBar } from "../components/SearchBar.jsx";
import Table from "../components/Table.jsx";
import ModalConfirm from "../components/ModalConfirm.jsx";
import { toast, Bounce } from "react-toastify";
import { getAllBookings, findBookingsByEmail, returnBooking } from "../api/BookingApi";

export function Returns() {
    const styles = StylesReaders();
    const [, setAllBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loadingReturn, setLoadingReturn] = useState(false);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await getAllBookings();
            const data = res.data.filter(b => b.estado !== "Devuelto");
            setAllBookings(res.data);
            setFilteredBookings(data);
        } catch (error) {
            console.error("Error al obtener préstamos:", error);
            toast.error("No se pudieron cargar los préstamos.", { theme: "dark", transition: Bounce });
        }
    };

    const handleSearch = async (emailInput) => {
        if (!emailInput.trim()) {
            fetchBookings();
            return;
        }
        try {
            const res = await findBookingsByEmail(emailInput);
            const filtered = res.data.filter(b => b.estado !== "Devuelto");
            setFilteredBookings(filtered);
        } catch (error) {
            console.error("Error al buscar préstamos:", error);
            toast.error("No se encontraron resultados.", { theme: "dark", transition: Bounce });
        }
    };

    const handleReturnClick = (booking) => {
        setSelectedBooking(booking);
        setShowConfirm(true);
    };

    const handleConfirmReturn = async () => {
        if (!selectedBooking || loadingReturn) return;
    
        try {
            setLoadingReturn(true);
            await returnBooking(selectedBooking.id, selectedBooking.email);
            toast.success("Devolución registrada exitosamente.", { theme: "dark", transition: Bounce });
            setShowConfirm(false);
            fetchBookings();
            window.location.reload();
        } catch (error) {
            console.error("Error al registrar devolución:", error);
            toast.error("No se pudo registrar la devolución.", { theme: "dark", transition: Bounce });
        } finally {
            setLoadingReturn(false);
        }
    };

    const columns = [
        { accessor: "email", label: "Lector" },
        { accessor: "image64", label: "Imagen" },
        { accessor: "title", label: "Título" },
        { accessor: "author", label: "Autor" },
        { accessor: "type", label: "Tipo" },
        { accessor: "estado", label: "Estado" },
        { accessor: "dateBooking", label: "Fecha Préstamo" },
        { accessor: "dateReturn", label: "Fecha Devolución" },
    ];
    const formatted = filteredBookings.map(b => ({
        ...b,
        estado: b.estado === "Devuelto" ? "Devuelta" : "Prestado",
        dateReturn: b.dateReturn || "Pendiente",
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
