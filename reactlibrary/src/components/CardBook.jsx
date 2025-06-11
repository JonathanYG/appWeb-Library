import React from "react";

export function CardBook({ libro, styles }) {
  return (
    <div
      style={styles.tarjetaLibroEstilo}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
    >
      <img src={libro.imagen} alt={libro.titulo} style={styles.imagenLibroEstilo} />
      <div style={styles.contenidoLibroEstilo}>
        <h3 style={styles.tituloLibroEstilo}>{libro.titulo}</h3>
        <p style={styles.autorLibroEstilo}>por {libro.autor}</p>
        <span style={styles.categoriaLibroEstilo}>{libro.categoria}</span>
      </div>
    </div>
  );
}
