import React from "react";
import Imagedefault from "../assets/fondoUCM.jpg";

export function CardBook({ libro, styles }) {
  // Construir la imagen en base64 (tipo PNG)
  const imagenSrc = libro.image64
    ? `data:image/png;base64,${libro.image64}`
    : Imagedefault;

  // Borde rojo si no hay copias disponibles
  const bordeEstilo = libro.disponible
    ? {}
    : { border: "2px solid red" };
  
    return (
      <div
        style={{ ...styles.tarjetaLibroEstilo, ...bordeEstilo }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img
          src={imagenSrc}
          alt={libro.titulo}
          style={styles.imagenLibroEstilo}
        />
        <div style={styles.contenidoLibroEstilo}>
          <h3 style={styles.tituloLibroEstilo}>{libro.title}</h3>
          <p style={styles.autorLibroEstilo}>por {libro.author}</p>
          <span style={styles.categoriaLibroEstilo}>{libro.type}</span>
          {!libro.disponible && (
            <p style={{ color: "red", fontWeight: "bold", marginTop: "8px" }}>
              No disponible
            </p>
          )}
        </div>
      </div>
    );
}
