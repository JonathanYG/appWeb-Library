import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { StylesErrorPage } from '../styles/StylesErrorPage.jsx';
import { CustomButton } from '../components/CustomButton.jsx';
import { FaArrowLeft } from 'react-icons/fa';

export default function ErrorPage() {
    const error = useRouteError();
    const navigate = useNavigate();
    const styles = StylesErrorPage();

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Ocurrió un error</h1>
            <p style={styles.message}>{error.statusText || error.message}</p>
            <CustomButton
                text="Volver al inicio"
                icon={<FaArrowLeft />}
                onClick={() => navigate('/home')}
                style={styles.buttonStyle}
                hoverStyle={styles.buttonHover}
            />
        </div>
    );
}
