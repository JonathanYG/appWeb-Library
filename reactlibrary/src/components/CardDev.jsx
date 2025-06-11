import React from "react";

export function CardDev({ dev, styles }) {
  return (
    <div style={styles.card}>
      <div style={styles.header}></div>
      <img src={dev.image} alt={`Foto de ${dev.name}`} style={styles.profileImg} />
      <div style={styles.content}>
        <h2 style={styles.title}>{dev.name}</h2>
        <p><strong>Carrera:</strong> {dev.career}</p>
        <p><strong>Ciudad:</strong> {dev.city}</p>
        <p><strong>Universidad:</strong> {dev.university}</p>
        <p><strong>GitHub:</strong> <a href={dev.github} target="_blank" rel="noreferrer" style={styles.link}>{dev.github}</a></p>
        <p><strong>Correo:</strong> {dev.email}</p>
      </div>
      <div style={styles.techIcons}>
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" style={styles.icon} />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" style={styles.icon} />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" style={styles.icon} />
        <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" style={styles.icon} />
      </div>
    </div>
  );
}
