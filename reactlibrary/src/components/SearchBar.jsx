import React, { useState } from "react";
import { CustomButton } from '../components/CustomButton.jsx';
import { FaSearch } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";

export function SearchBar({ styles, onSearch, showSelect = true, placeholder = "Buscar...", defaultOption = "", options = [] }) {
  // Estado local para inputs controlados
  const [inputText, setInputText] = useState("");
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  // Cuando se pulsa el botón Buscar
  const handleClick = () => onSearch(inputText, selectedOption);

  // Cuando se pulsa el botón Limpiar
  const handleClearClick = () => {
    setInputText("");
    setSelectedOption(defaultOption);
    onSearch("", defaultOption);
  };

  return (
    <div style={styles.barraBusquedaEstilo}>
      <input
        type="text"
        placeholder={placeholder}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={styles.inputBusquedaEstilo}
      />

      {showSelect && (
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={styles.selectTipoEstilo}
        >
          {options.map((opcion, index) => (
            <option key={index} value={opcion}>{opcion}</option>
          ))}
        </select>
      )}

      <div style={styles.grupoBotones}>
        <CustomButton
          text="Buscar"
          icon={<FaSearch />}
          onClick={handleClick}
          style={styles.botonBusquedaEstilo}
          hoverStyle={styles.botonBusquedaHoverEstilo}
        />
        <CustomButton
          text="Limpiar"
          icon={<AiOutlineClear />}
          onClick={handleClearClick}
          style={styles.botonLimpiarEstilo}
          hoverStyle={styles.botonLimpiarHoverEstilo}
        />
      </div>
    </div>
  );
}
