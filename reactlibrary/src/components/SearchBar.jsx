import React, { useState } from "react";
import { CustomButton } from '../components/CustomButton.jsx';
import { FaSearch } from "react-icons/fa";
import { AiOutlineClear } from "react-icons/ai";

export function SearchBar({ styles, options, onSearch }) {
  // Estado local para inputs controlados
  const [inputText, setInputText] = useState("");
  const [selectedOption, setSelectedOption] = useState(options[0] || "");

  // Cuando se pulsa el botón Buscar
  function handleClick() {
    onSearch(inputText, selectedOption);
  }

  // Cuando se pulsa el botón Limpiar
  function handleClearClick() {
    setInputText("");
    setSelectedOption(options[0] || "");
    // Avisar al padre para limpiar filtros
    onSearch("", options[0] || "");
  }

  return (
    <div style={styles.barraBusquedaEstilo}>
      <input
        type="text"
        placeholder="Buscar libros por título o autor..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={styles.inputBusquedaEstilo}
      />

      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        style={styles.selectTipoEstilo}
      >
        {options.map((opcion, index) => (
          <option key={index} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>

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
