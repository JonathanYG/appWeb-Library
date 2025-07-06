import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StylesHeader } from "../styles/StylesHeader.jsx";
import { CustomButton } from '../components/CustomButton.jsx';
import ModalTable from '../components/ModalTable.jsx';
import ModalForm from "../components/ModalForm.jsx";
import { toast, Bounce } from "react-toastify";
import { useUser } from '../context/UserContext';
import { findBookingsByEmail } from '../api/BookingApi';
import { getFinesByEmail } from '../api/FineApi';
import { getAllUsers } from "../api/AuthApi";
import { getAllBooks, getAvailableCopiesById  } from "../api/BookApi";
import { createBooking } from "../api/BookingApi";

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

  const [usersOptions, setUsersOptions] = useState([]);
  const [booksOptions, setBooksOptions] = useState([]);
  const [loadingCreateLoan, setLoadingCreateLoan] = useState(false);

  const { logoutUsuario, usuarioContext } = useUser();

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

  const fetchBooks = async () => {
    try {
      const res = await getAllBooks();
      const books = res.data;
  
      const booksWithAvailableCopies = [];
  
      for (const book of books) {
        const resCopies = await getAvailableCopiesById(book.id);
        const availableCopies = resCopies.data;
  
        if (availableCopies.length > 0) {
          booksWithAvailableCopies.push({
            value: availableCopies[0].id,
            label: book.title
          });
        }
      }
  
      setBooksOptions(booksWithAvailableCopies);
    } catch (error) {
      console.error("Error al obtener libros con copias disponibles:", error);
      toast.error("No se pudieron cargar los libros.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getAllUsers();
        const options = res.data
        .filter(u => u.state === true)
        .map(u => ({
          value: u.email,
          label: u.email
        }));
        setUsersOptions(options);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        toast.error("No se pudieron cargar los usuarios.");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolling(window.scrollY > 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogueado(!!token);
    setRol(usuarioContext?.rol || null);
  }, [usuarioContext]);

  const handleLogoClick = () => {
    if (location.pathname === '/login' || location.pathname === '/register') return navigate(location.pathname);
    navigate('/home');
  };

  const handleLogout = () => {
    logoutUsuario();
    navigate('/login');
  };

  const handleMostrarPrestamos = async () => {
    try {
      const res = await findBookingsByEmail(usuarioContext.email);
      setPrestamosData(res.data);
      setModalPrestamosOpen(true);
    } catch (error) {
      console.error("Error al obtener préstamos:", error);
      toast.error("No se pudieron cargar los préstamos.");
    }
  };
  
  const handleMostrarMultas = async () => {
    try {
      const res = await getFinesByEmail(usuarioContext.email);
      setMultasData(res.data);
      setModalMultasOpen(true);
    } catch (error) {
      console.error("Error al obtener multas:", error);
      toast.error("No se pudieron cargar las multas.");
    }
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
    if (rol === 'ROLE_ADMIN') {
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
        {renderBtn("Mis Préstamos", "", handleMostrarPrestamos)}
        {renderBtn("Mis Multas", "", handleMostrarMultas)}
        {renderBtn("Salir", "", handleLogout)}
      </>
    );
  };

  const columnsPrestamos = [
    { accessor: "image64", label: "Imagen" },
    { accessor: "title", label: "Título" },
    { accessor: "author", label: "Autor" },
    { accessor: "type", label: "Tipo" },
    { accessor: "estado", label: "Estado" },
    { accessor: "dateBooking", label: "Fecha Préstamo" },
    { accessor: "dateReturn", label: "Fecha Devolución" },
  ];

  const columnsMultas = [
    { accessor: "description", label: "Descripción" },
    { accessor: "amount", label: "Monto" },
    { accessor: "state", label: "Estado" },
  ];

  const transformPrestamos = Array.isArray(prestamosData)
  ? prestamosData.map(item => ({
      ...item,
      state: item.state ? "Prestado" : "Libre",
    }))
  : [];

  const transformMultas = Array.isArray(multasData)
  ? multasData.map(item => ({
      ...item,
      state: item.state ? "Activo" : "Inactivo",
    }))
  : [];

  const onSubmitCreateLoan = async () => {
    if (loadingCreateLoan) return;
  
    if (!selectedBook || !selectedUser) {
      toast.warn("Selecciona un usuario y un libro.");
      return;
    }
  
    const newLoan = {
      copybookFk: selectedBook.value,
      userFk: selectedUser.value,
    };
  
    try {
      setLoadingCreateLoan(true);
      await createBooking(newLoan);
      toast.success(`Préstamo registrado para ${selectedUser.label} - ${selectedBook.label}`);
      setShowCreateModal(false);
      setSelectedUser(null);
      setSelectedBook(null);
      await fetchBooks();
      window.location.reload();
    } catch (error) {
      console.error("Error al registrar préstamo:", error);
      toast.error("No se pudo registrar el préstamo.");
    } finally {
      setLoadingCreateLoan(false);
    }
  };
  
  const selectsCreateLoan = [
    {
      label: "Usuario",
      name: "user",
      value: selectedUser?.value || '',
      onChange: (e) =>
        setSelectedUser(usersOptions.find((u) => u.value === e.target.value)),
      options: usersOptions,
    },
    {
      label: "Libro",
      name: "book",
      value: selectedBook?.value || '',
      onChange: (e) =>
        setSelectedBook(booksOptions.find((b) => b.value === e.target.value)),
      options: booksOptions,
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
        disabled={loadingCreateLoan}
      />
    </header>
  );
}
