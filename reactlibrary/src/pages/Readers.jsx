import React, { useState, useEffect } from 'react';
// import { Bounce, toast } from 'react-toastify';
import { SearchBar } from '../components/SearchBar.jsx';
import { StylesReaders } from '../styles/StylesReaders.jsx';
import Table from '../components/Table.jsx';
import ModalTable from '../components/ModalTable.jsx';
import ModalForm from '../components/ModalForm.jsx';

export function Readers() {
    const styles = StylesReaders();

    const [filteredReaders, setFilteredReaders] = useState([]);
    const [allReaders, setAllReaders] = useState([]);
    const [modalData, setModalData] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedReader, setSelectedReader] = useState(null);
    const [showFormModal, setShowFormModal] = useState(false);

    // Simulación de carga inicial de lectores
    useEffect(() => {
        const sampleData = [
            { id: 1, email: 'jane@bookhub.com', lastName: 'Doe', Name: 'Jane', password: '••••••', state: true },
            { id: 2, email: 'john@bookhub.com', lastName: 'Smith', Name: 'John', password: '••••••', state: false },
        ];
        setAllReaders(sampleData);
        setFilteredReaders(sampleData);
    }, []);

    const handleSearch = (text) => {
        const lower = text.toLowerCase();
        const filtered = allReaders.filter(r => r.email.toLowerCase().includes(lower));
        setFilteredReaders(filtered);
    };

    const columns = [
        { accessor: 'email', label: 'Email' },
        { accessor: 'lastName', label: 'Apellido' },
        { accessor: 'Name', label: 'Nombre' },
        { accessor: 'password', label: 'Contraseña' },
        { accessor: 'state', label: 'Estado' },
    ];
    const reservationColumns = [
        { accessor: "image64", label: "Imagen" },
        { accessor: "title", label: "Título" },
        { accessor: "author", label: "Autor" },
        { accessor: "type", label: "Tipo" },
        { accessor: "state", label: "Estado" },
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
        { label: 'Nombre', name: 'Name', type: 'text', value: selectedReader.Name, disabled: true },
        { label: 'Apellido', name: 'lastName', type: 'text', value: selectedReader.lastName, disabled: true },
        { label: 'Contraseña', name: 'password', type: 'password', value: selectedReader.password, disabled: true },
    ] : [];
    const formSelects = selectedReader ? [
        {
            label: 'Estado',
            name: 'state',
            value: selectedReader.state === 'Activo',
            disabled: true,
            options: [
                { label: 'Activo', value: true },
                { label: 'Inactivo', value: false },
            ],
        },
    ] : [];
    const formattedReaders = filteredReaders.map(r => ({
        ...r,
        state: r.state ? 'Activo' : 'Boqueado',
    }));

    // Simula actualizacion de datos en "base de datos"
    // const handleSubmitEdit = (formData) => {
    //     const values = Object.values(formData);
    //     const hasEmpty = values.some((v) => v === '' || v === null || v === undefined);
      
    //     if (hasEmpty) {
    //       toast.warn("Por favor completa todos los campos.", {
    //         theme: 'dark',
    //         transition: Bounce,
    //       });
    //       return;
    //     }
      
    //     // Simula actualización en el "backend"
    //     setAllReaders(prev =>
    //       prev.map(reader =>
    //         reader.email === formData.email ? { ...formData, state: formData.state === 'Activo' } : reader
    //       )
    //     );
      
    //     setFilteredReaders(prev =>
    //       prev.map(reader =>
    //         reader.email === formData.email ? { ...formData, state: formData.state === 'Activo' } : reader
    //       )
    //     );
      
    //     toast.success("Datos del lector actualizados correctamente.", {
    //       theme: 'dark',
    //       transition: Bounce,
    //     });
      
    //     setShowFormModal(false); // cerrar el modal
    // };

    // Simula cambio de estado en "base de datos"
    const handleToggleStatus = async (reader) => {
        const nuevoEstado = reader.state === 'Activo' ? 'Boqueado' : 'Activo';

        // Simulación de "actualización" local
        setAllReaders(prev =>
            prev.map(u =>
                u.email === reader.email ? { ...u, state: nuevoEstado === 'Activo' } : u
            )
        );

        setFilteredReaders(prev =>
            prev.map(u =>
                u.email === reader.email ? { ...u, state: nuevoEstado === 'Activo' } : u
            )
        );
    };

    // Simula obtener reservas por email
    const handleViewReservations = (reader) => {
        const fakeReservations = [
            {
                image64: "", title: "Cien Años de Soledad", author: "G. G. Márquez",
                type: "Novela", state: true, dateBooking: "2025-05-10", dateReturn: "2025-06-10"
            },
            {
                image64: "", title: "El Principito", author: "Antoine de Saint-Exupéry",
                type: "Fábula", state: false, dateBooking: "2025-04-15", dateReturn: "2025-05-15"
            },
            {
                image64: "", title: "1984", author: "George Orwell",
                type: "Distopía", state: true, dateBooking: "2025-03-20", dateReturn: "2025-04-20"
            },
        ];

        const formattedFines = fakeReservations.map(f => ({
            ...f,
            state: f.state ? 'Prestado' : 'Libre',
        }));

        setModalTitle(`Reservas de ${reader.email}`);
        setModalData(formattedFines);
        setShowModal(true);
    };

    // Simula obtener multas por email
    const handleViewFines = (reader) => {
        const fakeFines = [
            { description: 'Retraso en devolución', amount: '$5', state: true },
            { description: 'Libro perdido', amount: '$20', state: false },
        ];

        const formattedFines = fakeFines.map(f => ({
            ...f,
            state: f.state ? 'Activa' : 'Pagada',
        }));

        setModalTitle(`Multas de ${reader.email}`);
        setModalData(formattedFines);
        setShowModal(true);
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
                // onSubmit={handleSubmitEdit}
            /> 
        
        </div>
    );
}