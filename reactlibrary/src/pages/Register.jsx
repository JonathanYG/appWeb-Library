import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylesRegister } from '../styles/StylesRegister.jsx';
import { Bounce, toast } from 'react-toastify';
import { CustomButton } from '../components/CustomButton.jsx'
import { registerUser } from '../api/AuthApi';

export function Register() {
    const navigate = useNavigate();
    const styles = StylesRegister();
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        lastName: '',
        password: '',
        role: 'lector',
        state: true, // No editable
    });
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const roleOptions = [
        { label: 'Lector', value: 'LECTOR' },
        { label: 'Administrador', value: 'ADMIN' }
    ];
    const stateOptions = [
        { label: 'Activo', value: true },
        { label: 'Bloqueado', value: false }
    ];
    const [loadingRegister, setLoadingRegister] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (loadingRegister) return;
    
        const { email, name, lastName, password } = formData;
        if (!email || !name || !lastName || !password) {
            toast.warn("Por favor completa todos los campos.", { theme: 'dark', transition: Bounce });
            return;
        }
    
        try {
            setLoadingRegister(true);
            const payload = {
                email,
                name,
                lastName,
                password,
                rol: formData.role.toUpperCase(),
            };
    
            await registerUser(payload);
            toast.success("Registro exitoso.", { theme: 'dark', transition: Bounce });
            navigate('/login');
        } catch (error) {
            console.error(error);
            toast.error("Error al registrarse.", { theme: 'dark', transition: Bounce });
        } finally {
            setLoadingRegister(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Crea tu cuenta en BookHub</h2>
                    <div style={styles.columns}>
                        <div style={styles.column}>
                            <label style={styles.label}>Correo Electrónico</label>
                            <input
                                type="email"
                                name="email"
                                style={styles.input}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label style={styles.label}>Nombre</label>
                            <input
                                type="text"
                                name="name"
                                style={styles.input}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <label style={styles.label}>Rol</label>
                            <select
                                name="role"
                                value={formData.role}
                                disabled={true}
                                style={styles.select}
                            >
                                {roleOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
            
                        <div style={styles.column}>
                            <label style={styles.label}>Apellido</label>
                            <input
                                type="text"
                                name="lastName"
                                style={styles.input}
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <label style={styles.label}>Contraseña</label>
                            <div style={styles.inputContenedor}>
                                <input
                                    type={mostrarContrasena ? "text" : "password"}
                                    name="password"
                                    style={styles.inputPassword}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                    style={styles.botonMostrarContrasena}
                                >
                                    {mostrarContrasena ? "🔓" : "🔒"}
                                </button>
                            </div>
                            <label style={styles.label}>Estado</label>
                            <select
                                name="state"
                                value={formData.state}
                                disabled={true}
                                onChange={(e) =>
                                    setFormData(prev => ({
                                    ...prev,
                                    state: e.target.value === 'true'
                                    }))
                                }
                                style={styles.select}
                                >
                                {stateOptions.map(option => (
                                    <option key={option.value.toString()} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
        
                    <div style={styles.buttonContainer}>
                    <CustomButton
                        text={loadingRegister ? "Registrando..." : "Registrarse"}
                        onClick={handleSubmit}
                        style={{
                            ...styles.button,
                            opacity: loadingRegister ? 0.6 : 1,
                            pointerEvents: loadingRegister ? "none" : "auto",
                        }}
                        hoverStyle={styles.buttonHover}
                    />
                    </div>
                <div style={styles.loginRedirect}>
                    ¿Ya tienes cuenta?
                    <span onClick={() => navigate('/login')} style={styles.link}> Inicia sesión</span>
                </div>
            </div>
        </div>
    );
}
