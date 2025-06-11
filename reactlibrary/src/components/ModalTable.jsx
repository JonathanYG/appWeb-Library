import React from "react";
import ReactDOM from "react-dom";
import { StylesModal } from "../styles/StylesModal.jsx";
import { CustomButton } from '../components/CustomButton.jsx'; 
import { FaArrowLeft } from "react-icons/fa";
import Table from "./Table.jsx";

export default function ModalTable({ isOpen, onClose, columns, data, title = "Tabla", onEdit }) {
    const styles = StylesModal();

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            style={styles.overlayStylesConfirm}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                style={{ ...styles.modalStyles, ...styles.modalTableContainer }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={styles.modalTableWrapper}>
                    <Table
                        title={title}
                        columns={columns}
                        data={data}
                        onEdit={onEdit}
                        rowsPerPage={5}
                        type="lector"
                    />
                </div>

                <div style={styles.modalTableFooter}>
                    <CustomButton
                        text="Volver"
                        onClick={onClose}
                        icon={<FaArrowLeft />}
                        style={styles.buttonSecondaryStyle}
                        hoverStyle={styles.buttonSecondaryHoverStyle}
                    />
                </div>
            </div>
        </div>,
    document.body
    );
}
