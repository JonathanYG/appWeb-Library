import React, { useState } from "react";
import ReactDOM from "react-dom";
import { StylesModal } from "../styles/StylesModal.jsx";
import { CustomButton } from "../components/CustomButton.jsx";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";

export default function ModalForm({
  isOpen,
  onClose,
  title = "Formulario",
  inputs = [],
  selects = [],
  showPasswordToggle = false,
  onSubmit,
  submitText = "Guardar"
}) {
  const styles = StylesModal();
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={styles.overlayStylesConfirm}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div style={styles.modalStyles} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <form>
          <div style={styles.modalFormUserColumns}>
            <div style={styles.modalFormUserColumn}>
              {inputs.slice(0, Math.ceil(inputs.length / 2)).map((input, index) => (
                <div key={index} style={styles.modalFormUserField}>
                  <label style={styles.modalFormUserLabel}>{input.label}</label>
                  {input.type === "password" && showPasswordToggle ? (
                    <div style={styles.modalPasswordWrapper}>
                      <input
                        type={showPassword ? "text" : "password"}
                        name={input.name}
                        style={{ ...styles.inputStyle(!input.disabled), ...styles.modalPasswordInput }}
                        value={input.value}
                        onChange={input.onChange}
                        disabled={input.disabled}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={styles.modalPasswordToggle}
                      >
                        {showPassword ? "🔓" : "🔒"}
                      </button>
                    </div>
                  ) : (
                    <input
                      type={input.type}
                      name={input.name}
                      style={styles.inputStyle(!input.disabled)}
                      value={input.value}
                      onChange={input.onChange}
                      disabled={input.disabled}
                    />
                  )}
                </div>
              ))}
            </div>

            <div style={styles.modalFormUserColumn}>
              {inputs.slice(Math.ceil(inputs.length / 2)).map((input, index) => (
                <div key={index} style={styles.modalFormUserField}>
                  <label style={styles.modalFormUserLabel}>{input.label}</label>
                  <input
                    type={input.type}
                    name={input.name}
                    style={styles.inputStyle(!input.disabled)}
                    value={input.value}
                    onChange={input.onChange}
                    disabled={input.disabled}
                  />
                </div>
              ))}

              {selects.map((select, index) => (
                <div key={index} style={styles.modalFormUserField}>
                  <label style={styles.modalFormUserLabel}>{select.label}</label>
                  <select
                    name={select.name}
                    value={select.value}
                    onChange={select.onChange}
                    disabled={select.disabled}
                    style={styles.inputStyle(!select.disabled)}
                  >
                    {select.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.modalUserFooter}>
            <CustomButton
                text="Volver"
                onClick={onClose}
                icon={<FaArrowLeft />}
                style={styles.buttonSecondaryStyle}
                hoverStyle={styles.buttonSecondaryHoverStyle}
            />
                      
            {onSubmit && (
                <CustomButton
                    text={submitText}
                    onClick={onSubmit}
                    icon={<FaRegSave />}
                    style={styles.buttonPrimaryStyle}
                    hoverStyle={styles.buttonPrimaryHoverStyle}
                />
            )}

          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
