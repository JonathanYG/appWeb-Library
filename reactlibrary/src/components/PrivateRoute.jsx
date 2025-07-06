import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ element, allowedRoles }) => {
    const token = localStorage.getItem('token');
  
    if (!token) return <Navigate to="/login" replace />;
  
    try {
        const decoded = jwtDecode(token);
        const userRol = decoded.roles?.[0] || null;
  
        if (!allowedRoles.includes(userRol)) {
            return <Navigate to="/login" replace />;
        }
  
        return element;
    } catch (error) {
        console.error("Token inválido o corrupto:", error);
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        return <Navigate to="/login" replace />;
    }
};
  
export default PrivateRoute;
