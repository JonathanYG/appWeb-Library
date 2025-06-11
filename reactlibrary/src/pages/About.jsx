import React from "react";
import { stylesAbout } from "../styles/StylesAbout.jsx";
import dev1 from '../assets/cliente2.webp';
import { CardDev } from "../components/CardDev.jsx";

const developers = [
  {
    name: "Jonathan Yañez Gajardo",
    career: "Ingeniería Civil Informática",
    city: "Talca, Chile",
    university: "Universidad Católica Del Maule",
    github: "https://github.com/JonathanYG",
    email: "jonathan.yanez@alu.ucm.cl",
    image: dev1
  },
  {
    name: "Yonathan Canales Aguilera",
    career: "Ingeniería Civil Informática",
    city: "Curico, Chile",
    university: "Universidad Católica Del Maule",
    github: "https://github.com/segundo",
    email: "yonathan.canales@alu.ucm.cl",
    image: dev1
  }
];

export function About() {
  const styles = stylesAbout();

  return (
    <div style={styles.page}>
      {developers.map((dev, index) => (
        <CardDev key={index} dev={dev} styles={styles} />
      ))}
    </div>
  );
};

