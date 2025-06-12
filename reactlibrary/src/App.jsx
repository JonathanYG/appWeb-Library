// Funciones de React
import React from 'react';
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css'

// Toastify
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Componentes
import { Header } from './components/Header.jsx'
import { Footer } from "./components/Footer.jsx";

// Paginas
import { Home } from './pages/Home.jsx';
import { About } from './pages/About.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Readers } from './pages/Readers.jsx';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover
            theme="dark"
            transition={Bounce}
            style={{ top: '80px', right: '20px' }} 
      />
      <div className="app-container">
        <Header className="header" />
        <main className="content-container">
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/readers" element={<Readers />} />
            {/* <Route path="*" element={<NotFound />} /> */}
            {/* Rutas protegidas (solo usuarios logueados) */}

          </Routes>
        </main >
        <Toaster />
        <Footer className="footer"/>
      </div>
    </BrowserRouter>
  )
}

export default App
