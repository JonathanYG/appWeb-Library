import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StylesHeader } from "../styles/StylesHeader.jsx";
import { CustomButton } from '../components/CustomButton.jsx';
import ModalTable from '../components/ModalTable.jsx';
import ModalForm from "../components/ModalForm.jsx";
import { toast, Bounce } from "react-toastify";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolling, setScrolling] = useState(false);
  const styles = StylesHeader(scrolling);
  const [logueado, setLogueado] = useState(false);
  const [rol, setRol] = useState(null);
  const [modalPrestamosOpen, setModalPrestamosOpen] = useState(false);
  const [modalMultasOpen, setModalMultasOpen] = useState(false);
  const [prestamosData, setPrestamosData] = useState([]);
  const [multasData, setMultasData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fakeBooks = [
    { value: 'copy001', label: '1984' },
    { value: 'copy002', label: 'Fahrenheit 451' },
    { value: 'copy003', label: 'El Principito' },
  ];
  const fakeUsers = [
    { value: 'john@bookhub.com', label: 'john@bookhub.com' },
    { value: 'jane@bookhub.com', label: 'jane@bookhub.com' },
  ];
  const today = new Date().toISOString().split("T")[0];
  const inputsCreateLoan = [
    {
      label: "Fecha Préstamo",
      name: "dateBooking",
      type: "text",
      value: today,
      onChange: () => {}, // no editable
      disabled: true,
    },
    {
      label: "Estado",
      name: "state",
      type: "text",
      value: "Prestado",
      onChange: () => {},
      disabled: true,
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setLogueado(!!token);
    const userData = JSON.parse(localStorage.getItem('usuario'));
    setRol(userData?.rol || null);

    // Simulación (reemplaza con fetch o props reales)
    setPrestamosData([
      {
        image64: "", title: "Cien Años de Soledad", author: "G. G. Márquez",
        type: "Novela", state: true, dateBooking: "2025-05-10", dateReturn: "2025-06-10"
      },
    ]);
    // Simulación (reemplaza con fetch o props reales)
    setMultasData([
      { amount: 500, description: "Retraso en entrega", state: true },
    ]);

  }, [location.pathname]);

  const handleLogoClick = () => {
    if (location.pathname === '/login' || location.pathname === '/register') return navigate(location.pathname);
    navigate('/home');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const renderBotones = () => {
    // if (location.pathname === '/login' || location.pathname === '/register') {
    //   return null;
    // }

    const renderBtn = (texto, ruta, customClick) => (
      <CustomButton
        text={texto}
        onClick={customClick ? customClick : () => navigate(ruta)}
        style={styles.botonTexto}
        hoverStyle={styles.botonTextoHover}
      />
    );

    if (!logueado) {
      return (
        <>
          {renderBtn("Home", "/home")}
          {renderBtn("About", "/about")}
          {renderBtn("Login", "/login")}
        </>
      );
    }
    if (rol === 'ADMIN') {
      return (
        <>
          {renderBtn("Home", "/home")}
          {renderBtn("Nuevo Libro", "/books")}
          {renderBtn("Préstamo", "", () => {
            setSelectedUser(null);
            setSelectedBook(null);
            setShowCreateModal(true);
          })}
          {renderBtn("Devolución", "/returns")}
          {renderBtn("Lectores", "/readers")}
          {renderBtn("Salir", "", handleLogout)}
        </>
      );
    }
    return (
      <>
        {renderBtn("Home", "/home")}
        {renderBtn("Mis Préstamos", "", () => setModalPrestamosOpen(true))}
        {renderBtn("Mis Multas", "", () => setModalMultasOpen(true))}
        {renderBtn("Salir", "", handleLogout)}
      </>
    );
  };

  const columnsPrestamos = [
    { accessor: "image64", label: "Imagen" },
    { accessor: "title", label: "Título" },
    { accessor: "author", label: "Autor" },
    { accessor: "type", label: "Tipo" },
    { accessor: "state", label: "Estado" },
    { accessor: "dateBooking", label: "Fecha Préstamo" },
    { accessor: "dateReturn", label: "Fecha Devolución" },
  ];

  const columnsMultas = [
    { accessor: "description", label: "Descripción" },
    { accessor: "amount", label: "Monto" },
    { accessor: "state", label: "Estado" },
  ];

  const transformPrestamos = prestamosData.map(item => ({
    ...item,
    state: item.state ? "Prestado" : "Libre",
  }));

  const transformMultas = multasData.map(item => ({
    ...item,
    state: item.state ? "Activo" : "Inactivo",
  }));

  const onSubmitCreateLoan = () => {
    // Validación de campos
    if (!selectedBook && !selectedUser) {
      return toast.warn("Selecciona usuario y libro.");
    }
    if (!selectedBook) {
      return toast.warn("Selecciona un libro.");
    }
    if (!selectedUser) {
      return toast.warn("Selecciona un usuario.");
    }
  
    const today = new Date().toISOString().split("T")[0];
  
    const newLoan = {
      copybookFK: selectedBook.value,
      userFK: selectedUser.value,
      dateBooking: today,
      dateReturn: "",
      state: 1,
    };
  
    console.log("Enviar a backend:", newLoan);
    toast.success("Préstamo registrado.");
    setShowCreateModal(false);
  };
  
  const selectsCreateLoan = [
    {
      label: "Usuario",
      name: "user",
      value: selectedUser?.value || '',
      onChange: (e) =>
        setSelectedUser(fakeUsers.find((u) => u.value === e.target.value)),
      options: fakeUsers,
    },
    {
      label: "Libro",
      name: "book",
      value: selectedBook?.value || '',
      onChange: (e) =>
        setSelectedBook(fakeBooks.find((b) => b.value === e.target.value)),
      options: fakeBooks,
    },
  ];

  return (
    <header style={styles.barraNavegacion}>
      <div style={styles.logoContainer}>
        <span style={styles.logoTexto} onClick={handleLogoClick}>
          <b>Book</b><span style={{ color: '#E74C3C' }}>Hub</span>
        </span>
      </div>

      <nav style={styles.botones}>
        {renderBotones()}
      </nav>

      {/* Modal Mis Préstamos */}
      <ModalTable
        isOpen={modalPrestamosOpen}
        onClose={() => setModalPrestamosOpen(false)}
        columns={columnsPrestamos}
        data={transformPrestamos}
        title="Mis Préstamos"
      />

      {/* Modal Mis Multas */}
      <ModalTable
        isOpen={modalMultasOpen}
        onClose={() => setModalMultasOpen(false)}
        columns={columnsMultas}
        data={transformMultas}
        title="Mis Multas"
      />

      <ModalForm
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Nuevo Préstamo"
        onSubmit={onSubmitCreateLoan}
        selects={selectsCreateLoan}
        inputs={inputsCreateLoan}
      />
    </header>
  );
}
