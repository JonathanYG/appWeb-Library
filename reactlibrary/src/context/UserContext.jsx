/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, useEffect } from 'react';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [usuarioContext, setUsuario] = useState(null);

  const loginUsuario = ({ token, usuario }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("usuario", JSON.stringify(usuario));
    setUsuario(usuario);
  };

  const logoutUsuario = () => {
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.clear();
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");
  
    if (token && usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    } else {
      logoutUsuario();
    }
  }, []);

  return (
    <UserContext.Provider value={{ usuarioContext, loginUsuario, logoutUsuario }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un <UserContextProvider>");
  }
  return context;
}
