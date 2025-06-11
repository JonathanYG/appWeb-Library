import React from "react";
import ReactDOM from "react-dom";
import { StylesModal } from "../styles/StylesModal.jsx";
import { CustomButton } from "../components/CustomButton.jsx";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";

export default function ModalConfirm({ isOpen, message, onConfirm, onCancel }) {
  const styles = StylesModal();

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      style={styles.overlayStylesConfirm}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        style={styles.confirmContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.confirmMessage}>
          <p>{message}</p>
        </div>

        <div style={styles.confirmButtons}>
          <CustomButton
            text="Cancelar"
            icon={<AiOutlineCloseCircle />}
            onClick={onCancel}
            style={styles.buttonSecondaryStyle}
            hoverStyle={styles.buttonSecondaryHoverStyle}
          />

          <CustomButton
            text="Confirmar"
            icon={<FaCheckCircle />}
            onClick={onConfirm}
            style={styles.buttonPrimaryStyle}
            hoverStyle={styles.buttonPrimaryHoverStyle}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
