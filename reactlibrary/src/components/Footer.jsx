import React from 'react';
import { StylesFooter } from "../styles/StylesFooter.jsx";

export function Footer() {
    // Estilos para el footer
    const styles = StylesFooter();

    return (
        <div style={styles.footerEstilo}>
            <p style={styles.textoEstilo}>© 2025 UCM Todos los derechos reservados.</p>
        </div>
    )
}
