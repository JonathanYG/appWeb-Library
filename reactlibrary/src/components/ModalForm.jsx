import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import { StylesModal } from "../styles/StylesModal.jsx";
import { CustomButton } from "../components/CustomButton.jsx";
import { FaArrowLeft, FaRegSave } from "react-icons/fa";
import ModalConfirm from "./ModalConfirm.jsx";

export default function ModalForm({
  isOpen,
  onClose,
  title = "Formulario",
  inputs = [],
  selects = [],
  showPasswordToggle = false,
  onSubmit,
  submitText = "Guardar",
  confirmText = `¿Estás seguro de que deseas ${submitText.toLowerCase()}?`,
  disabled = false
}) {
  const styles = StylesModal();
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setImagePreview(null);
      setShowConfirm(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const half = Math.ceil(selects.length / 2);
  const leftSelects = selects.slice(0, half);
  const rightSelects = selects.slice(half);

  return ReactDOM.createPortal(
    <>
      <div
        style={styles.overlayStylesConfirm}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div style={styles.modalStyles} onClick={(e) => e.stopPropagation()}>
          <h2>{title}</h2>
            <div style={styles.modalFormUserColumns}>
              {/* Columna izquierda */}
              <div style={styles.modalFormUserColumn}>
                {inputs.slice(0, Math.ceil(inputs.length / 2)).map((input, index) => (
                  <div key={index} style={styles.modalFormUserField}>
                    <label style={styles.modalFormUserLabel}>{input.label}</label>

                    {input.type === "password" && showPasswordToggle ? (
                      <div style={styles.modalPasswordWrapper}>
                        <input
                          type={showPassword ? "text" : "password"}
                          name={input.name}
                          style={{
                            ...styles.inputStyle(!input.disabled),
                            ...styles.modalPasswordInput,
                          }}
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
                    ) : input.type === "file" ? (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          name={input.name}
                          style={styles.inputStyle(!input.disabled)}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const previewURL = URL.createObjectURL(file);
                              setImagePreview(previewURL);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64String = reader.result.split(',')[1];
                                if (input.onChange) {
                                  input.onChange({ target: { value: base64String } });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Vista previa"
                            style={styles.modalImagePreview}
                          />
                        )}
                      </>
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

                {leftSelects.map((select, index) => (
                  <div key={index} style={styles.modalFormUserField}>
                    <label style={styles.modalFormUserLabel}>{select.label}</label>
                    <Select
                      value={select.options.find((opt) => opt.value === select.value)}
                      onChange={(opt) => select.onChange({ target: { value: opt.value } })}
                      options={select.options}
                      isDisabled={select.disabled}
                      styles={{
                        control: (base, ) => ({
                          ...base,
                          height: "36px",
                          minHeight: "36px",
                          width: "90%",
                          borderRadius: "4px",
                          border: "1px solid #ccc",
                          backgroundColor: select.disabled ? "#f0f0f0" : "#fff",
                          color: select.disabled ? "#666" : "#000",
                          boxShadow: "none",
                          "&:hover": {
                            borderColor: "#aaa",
                          },
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: "0 8px",
                        }),
                        indicatorsContainer: (base) => ({
                          ...base,
                          height: "36px",
                        }),
                        input: (base) => ({
                          ...base,
                          margin: "0px",
                          padding: "0px",
                        }),
                        menu: (base) => ({
                          ...base,
                          zIndex: 3000,
                        }),
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Columna derecha */}
              <div style={styles.modalFormUserColumn}>
                {inputs.slice(Math.ceil(inputs.length / 2)).map((input, index) => (
                  <div key={index} style={styles.modalFormUserField}>
                    <label style={styles.modalFormUserLabel}>{input.label}</label>
                    {input.type === "file" ? (
                      <>
                        <input
                          type="file"
                          accept="image/*"
                          name={input.name}
                          style={styles.inputStyle(!input.disabled)}
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              const previewURL = URL.createObjectURL(file);
                              setImagePreview(previewURL);
                              const reader = new FileReader();
                              reader.onloadend = () => {
                                const base64String = reader.result.split(',')[1];
                                if (input.onChange) {
                                  input.onChange({ target: { value: base64String } });
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        {imagePreview && (
                          <img
                            src={imagePreview}
                            alt="Vista previa"
                            style={styles.modalImagePreview}
                          />
                        )}
                      </>
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

                {rightSelects.map((select, index) => (
                  <div key={index} style={styles.modalFormUserField}>
                    <label style={styles.modalFormUserLabel}>{select.label}</label>
                    <Select
                      value={select.options.find((opt) => opt.value === select.value)}
                      onChange={(opt) => select.onChange({ target: { value: opt.value } })}
                      options={select.options}
                      isDisabled={select.disabled}
                      styles={{
                        control: (base, ) => ({
                          ...base,
                          height: "36px",
                          minHeight: "36px",
                          borderRadius: "4px",
                          width: "90%",
                          border: "1px solid #ccc",
                          backgroundColor: select.disabled ? "#f0f0f0" : "#fff",
                          color: select.disabled ? "#666" : "#000",
                          boxShadow: "none",
                          "&:hover": {
                            borderColor: "#aaa",
                          },
                        }),
                        valueContainer: (base) => ({
                          ...base,
                          padding: "0 8px",
                        }),
                        indicatorsContainer: (base) => ({
                          ...base,
                          height: "36px",
                        }),
                        input: (base) => ({
                          ...base,
                          margin: "0px",
                          padding: "0px",
                        }),
                        menu: (base) => ({
                          ...base,
                          zIndex: 3000,
                        }),
                      }}
                    />
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
                  onClick={() => setShowConfirm(true)}
                  icon={<FaRegSave />}
                  style={{
                    ...styles.buttonPrimaryStyle,
                    opacity: disabled ? 0.6 : 1,
                    pointerEvents: disabled ? "none" : "auto",
                  }}
                  hoverStyle={styles.buttonPrimaryHoverStyle}
                  type="button"
                />
              )}
            </div>
        </div>
      </div>

      <ModalConfirm
        isOpen={showConfirm}
        message={confirmText}
        onConfirm={() => {
          onSubmit();
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
      />
      
    </>,
    document.body
  );
}
