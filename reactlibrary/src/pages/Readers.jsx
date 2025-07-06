import React, { useState, useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';
import { SearchBar } from '../components/SearchBar.jsx';
import { StylesReaders } from '../styles/StylesReaders.jsx';
import Table from '../components/Table.jsx';
import ModalTable from '../components/ModalTable.jsx';
import ModalForm from '../components/ModalForm.jsx';
import { getAllUsers, toggleUserState, getUserByEmail } from '../api/AuthApi.js';
import { findBookingsByEmail } from '../api/BookingApi.js';
import { getFinesByEmail } from '../api/FineApi.js';

export function Readers() {
    const styles = StylesReaders();

    const [filteredReaders, setFilteredReaders] = useState([]);
    const [, setAllReaders] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedReader, setSelectedReader] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);

    useEffect(() => {
        fetchAllUsers();
    }, []);

    const fetchAllUsers = async () => {
        try {
            const res = await getAllUsers();
            const users = res.data
                .filter(u => u && u.rol && u.email) // valida que u, rol y email existan
                .filter(u => u.rol.toLowerCase() === 'lector');
    
            setAllReaders(users);
            setFilteredReaders(users);
        } catch (error) {
            console.error("Error al cargar los usuarios:", error);
            toast.error("Error al cargar los usuarios", { theme: 'dark', transition: Bounce });
        }
    };

    const handleSearch = async (text) => {
        if (!text) return fetchAllUsers();

        try {
            const res = await getUserByEmail(text);
            const usuario = res.data;
            if (usuario.rol.toLowerCase() === 'lector') {
                setFilteredReaders([usuario]);
            } else {
                setFilteredReaders([]);
            }
        } catch (error) {
            console.error("Error al buscar el usuario:", error);
            setFilteredReaders([]);
        }
    };

    const columns = [
        { accessor: 'email', label: 'Email' },
        { accessor: 'lastName', label: 'Apellido' },
        { accessor: 'name', label: 'Nombre' },
        { accessor: 'state', label: 'Estado' },
        { accessor: 'rol', label: 'Rol' },
    ];
    const reservationColumns = [
        { accessor: "image64", label: "Imagen" },
        { accessor: "title", label: "Título" },
        { accessor: "author", label: "Autor" },
        { accessor: "type", label: "Tipo" },
        { accessor: "estado", label: "Estado" },
        { accessor: "dateBooking", label: "Fecha Préstamo" },
        { accessor: "dateReturn", label: "Fecha Devolución" },
    ];  
    const finesColumns = [
        { accessor: 'description', label: 'Descripción' },
        { accessor: 'amount', label: 'Monto' },
        { accessor: 'state', label: 'Estado' },
    ];
    const formInputs = selectedReader ? [
        { label: 'Correo Electrónico', name: 'email', type: 'email', value: selectedReader.email, disabled: true },
        { label: 'Nombre', name: 'name', type: 'text', value: selectedReader.name, disabled: true },
        { label: 'Apellido', name: 'lastName', type: 'text', value: selectedReader.lastName, disabled: true },
    ] : [];
    const formSelects = selectedReader ? [
        {
            label: 'Estado',
            name: 'state',
            value: selectedReader.state,
            disabled: true,
            options: [
                { label: 'Activo', value: 'Activo' },
                { label: 'Bloqueado', value: 'Bloqueado' },
            ],
        },
    ] : [];
    const formattedReaders = filteredReaders.map(r => ({
        ...r,
        state: r.state ? 'Activo' : 'Bloqueado',
    }));

    const handleToggleStatus = async (reader) => {
        try {
            await toggleUserState(reader.email);
            fetchAllUsers();
            toast.success(`Estado del lector ${reader.email} modificado`, { theme: 'dark', transition: Bounce });
            window.location.reload();
        } catch (error) {
            console.error("Error al cambiar el estado del lector:", error);
            toast.error("No se pudo cambiar el estado del lector", { theme: 'dark', transition: Bounce });
        }
    };

    const handleViewReservations = async (reader) => {
        try {
            const res = await findBookingsByEmail(reader.email);
            const data = Array.isArray(res.data) ? res.data : [];
            console.log("Reservas obtenidas:", data);
            setModalTitle(`Reservas de ${reader.email}`);
            setModalData(data);
            setShowModal(true);
        } catch (error) {
            console.error("Error al obtener reservas:", error);
            toast.error("Error al obtener reservas", { theme: 'dark', transition: Bounce });
        }
    };

    const handleViewFines = async (reader) => {
        console.log("Obteniendo multas para el lector:", reader);
        try {
            const res = await getFinesByEmail(reader.email);
            const data = Array.isArray(res.data) ? res.data : [];
            const formatted = data.map(f => ({
                ...f,
                state: f.state ? 'Pagada' : 'Activa',
            }));
            setModalTitle(`Multas de ${reader.email}`);
            setModalData(formatted);
            setShowModal(true);
        } catch (error) {
            console.error("Error al obtener multas:", error);
            toast.error("Error al obtener multas", { theme: 'dark', transition: Bounce });
        }
    };

    const handleEditReader = (reader) => {
        setSelectedReader(reader);
        setShowFormModal(true);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Gestión de Lectores</h1>

            <SearchBar
                styles={styles}
                onSearch={handleSearch}
                showSelect={false}
                placeholder="Buscar por email..."
            />

            <div style={styles.tableWrapper}>
                <Table
                    title="Lista de Lectores"
                    columns={columns}
                    data={formattedReaders}
                    rowsPerPage={5}
                    onEdit={handleEditReader}
                    onToggleStatus={handleToggleStatus}
                    onViewReservations={handleViewReservations}
                    onViewFines={handleViewFines}
                />
            </div>
            
            <ModalTable
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={modalTitle}
                data={modalData}
                columns={modalTitle.includes('Multas') ? finesColumns : reservationColumns}
            />
        
            <ModalForm
                isOpen={showFormModal}
                onClose={() => setShowFormModal(false)}
                title={`Detalle de ${selectedReader?.email}`}
                inputs={formInputs}
                selects={formSelects}
                showPasswordToggle={true}
                submitText="Guardar"
            /> 
        
        </div>
    );
}