import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StylesRegister } from '../styles/StylesRegister.jsx';
import { Bounce, toast } from 'react-toastify';
import { CustomButton } from '../components/CustomButton.jsx'
// import { registerRequest } from '../api/auth'; // A implementar

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
        { label: 'Lector', value: 'lector' },
        { label: 'Administrador', value: 'administrador' }
    ];
    const stateOptions = [
        { label: 'Activo', value: true },
        { label: 'Inactivo', value: false }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, name, lastName, password } = formData;
        if (!email || !name || !lastName || !password) {
            toast.warn("Por favor completa todos los campos.", { theme: 'dark', transition: Bounce });
            return;
        }

        try {
            // await registerRequest(formData);
            toast.success("Registro exitoso.", { theme: 'dark', transition: Bounce });
            navigate('/login');
        } catch (error) {
            console.log(error)
            toast.error("Error al registrarse.", { theme: 'dark', transition: Bounce });
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>Crea tu cuenta en BookHub</h2>
                <form>
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
                                onChange={handleChange}
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
                            text="Registrarse"
                            onClick={handleSubmit}
                            style={styles.button}
                            hoverStyle={styles.buttonHover}
                        />
                    </div>
                </form>
        
                <div style={styles.loginRedirect}>
                    ¿Ya tienes cuenta?
                    <span onClick={() => navigate('/login')} style={styles.link}> Inicia sesión</span>
                </div>
            </div>
        </div>
    );
}
