import React, { useEffect, useState } from 'react';
import { StylesLogin } from '../styles/StylesLogin.jsx';
import { Bounce, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { CustomButton } from '../components/CustomButton.jsx'
import image from '../assets/imagenWelcome.webp'
import { useUser } from '../context/UserContext.jsx';
import { loginRequest } from '../api/AuthApi.js';

export function Login() {
  const navigate = useNavigate();
  const styles = StylesLogin();

  const { loginUsuario } = useUser();

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const [mostrarIzquierda, setMostrarIzquierda] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setMostrarIzquierda(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailRegex  = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
    if (email.trim() === '' || contrasena.trim() === '') {
      toast.warn('Por favor completa todos los campos.', { theme: "dark", transition: Bounce });
      return;
    }
  
    if (!emailRegex.test(email)) {
      toast.error('Por favor ingresa un correo válido.', { theme: "dark", transition: Bounce });
      return;
    }
  
    try {
      const res = await loginRequest({ email, password: contrasena });
      const token = res.data.token;
  
      // Decodificar el token JWT
      const decoded = jwtDecode(token);
      const usuario = {
        email: decoded.sub,
        rol: decoded.roles[0],
      };
  
      loginUsuario({ token, usuario });
  
      toast.success('Inicio de sesión exitoso', { theme: "dark", transition: Bounce });
      navigate('/home');
  
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      const mensaje = error.response?.data?.mensaje || 'Error al iniciar sesión';
      toast.error(mensaje, { theme: "dark", transition: Bounce });
    }
  };

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }, []);

  return (
    <div style={styles.contenedorEstilo}>
      {/* Parte izquierda */}
      {mostrarIzquierda && (
        <div style={styles.izquierdaEstilo}>
          <h2 style={styles.tituloEstilo}>Bienvenido a BookHub</h2>
          <p style={styles.parrafoEstilo}>
            Tu biblioteca digital para explorar, reservar y gestionar tus libros favoritos.
            BookHub te permite administrar préstamos, devoluciones y mantenerte al día con tus lecturas y multas.
          </p>
          <div style={styles.contenedorImagenPrincipal}>
            <img 
              src={image}
              alt="Imagen principal" 
              style={styles.imagenPrincipalEstilo} 
            />
          </div>
          <p style={styles.parrafoEstilo}>
            Descubre nuevas historias, administra tu historial y mantente al día con nuestra plataforma de gestión de biblioteca.
          </p>
        </div>
      )}
      {/* Parte derecha - Formulario */}
      <div style={styles.contenidoEstilo}>
        <h2 style={styles.tituloEstilo}>Iniciar Sesión</h2>
        <p style={styles.parrafoEstilo}>
          Por favor, ingresa tus credenciales.
        </p>
          <label style={styles.labelEstilo}>Correo electrónico</label>
          <div style={styles.inputContenedor}>
            <input
              type="email"
              placeholder="Correo electrónico"
              style={styles.inputEstilo}
              maxLength={40}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <label style={styles.labelEstilo}>Contraseña</label>
          <div style={styles.inputContenedor}>
            <input
              type={mostrarContrasena ? "text" : "password"}
              style={styles.inputContrasena}
              placeholder="Contraseña"
              maxLength={30}
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
              style={styles.botonMostrarContrasena}
            >
              {mostrarContrasena ? "🔓" : "🔒"}
            </button>
          </div>
          <div style={styles.contenedorBotonLogin}>
            <CustomButton
                text="Iniciar Sesión"
                onClick={handleSubmit}
                style={styles.botonLogin}
                hoverStyle={styles.botonLoginHover}
            />
          </div>
        <div style={styles.registroTexto}>
            ¿No tienes cuenta? <span style={styles.registroEnlace} onClick={() => navigate('/register')}>Registrarse</span>
        </div>
      </div>
    </div>
  );
}
