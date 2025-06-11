// Eliminar Estilos que no se usan

export function StylesModal() {
  return {
    overlayStyles: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    overlayStylesConfirm: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(20, 20, 20, 0.8)", // más oscuro
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000,
    },    
    modalStyles: {
      background: "#fff",
      padding: "30px",
      borderRadius: "8px",
      width: "700px",
      maxWidth: "90%",
      color: "black",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    },
    inputStyle: (editable) => ({
      width: "90%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      backgroundColor: editable ? "#fff" : "#f0f0f0",
      color: editable ? "#000" : "#666",
    }),
    buttonPrimaryStyle: {
      marginLeft: "10px",
      padding: "8px 16px",
      backgroundColor: "#0A3D62",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      outline: 'none',
    },
    buttonPrimaryHoverStyle: {
      backgroundColor: '#092f4c',
    },
    buttonSecondaryStyle: {
      padding: "8px 16px",
      backgroundColor: "#6c757d",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      outline: 'none',
    },
    buttonSecondaryHoverStyle: {
      backgroundColor: '#5a6368',
      outline: 'none',
    },
    buttonAddStyle: {
      padding: "10px 16px",
      backgroundColor: "#005227",
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      border: "none",
      color: "white",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      flex: 1,
      textAlign: "center"
    },
    // Estilos adicionales para ModalList
    modalListContainer: {
      width: "80%",
      overflowY: "auto",
    },
    modalFormRow: {
      display: "flex",
      justifyContent: "center",
      alignItems: "self-end",
      gap: "20px",
      marginTop: "20px",
    },
    modalFormField: {
      flex: 1,
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "20px",
    },
    buttonAddStyleAlt: {
      backgroundColor: "#005227",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    // Estilos adicionales para ModalProyect
    modalFormColumns: {
      display: "flex",
      gap: "30px",
    },
    modalFormColumn: {
      flex: 1,
    },
    modalProyectFormField: {
      marginBottom: "10px",
    },
    modalFormLabel: {
      display: "block",
      marginBottom: "4px",
    },
    modalInputGroup: {
      display: "flex",
      alignItems: "center",
      gap: "6px",
    },
    modalFooterProyect: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
      gap: "10px",
    },
    modalButtonsBottom: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "flex-end",
    },
    addIcon: {
      cursor: "pointer",
      color: "#007bff",
    },
    // Estilos adicionales para ModalUser
    modalFormUserColumns: {
      display: "flex",
      gap: "30px",
    },
    modalFormUserColumn: {
      flex: 1,
    },
    modalFormUserField: {
      marginBottom: "10px",
    },
    modalFormUserLabel: {
      display: "block",
      marginBottom: "4px",
    },
    modalPasswordWrapper: {
      position: "relative",
    },
    modalPasswordInput: {
      paddingRight: "35px",
      width: "80%",
    },
    modalPasswordToggle: {
      position: "absolute",
      right: "10px",
      top: "50%",
      transform: "translateY(-50%)",
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      color: "#1E3A5F",
    },
    modalImagePreview: {
      marginTop: "10px",
      width: "100%",
      maxHeight: "200px",
      objectFit: "cover",
      borderRadius: "5px",
    },
    modalImageStatic: {
      width: "50%",
      maxHeight: "100px",
      objectFit: "cover",
      marginTop: "8px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    },
    modalImagePlaceholder: {
      color: "#999",
    },
    modalUserFooter: {
      marginTop: "20px",
      display: "flex",
      justifyContent: "flex-end",
    },
    // Estilos adicionales para ModalTable
    modalTableContainer: {
      width: "80%",
      minHeight: "200px",
      overflowY: "auto",
    },
    modalTableWrapper: {
      marginTop: "20px",
    },
    modalTableFooter: {
      display: "flex",
      justifyContent: "flex-end",
    },
    // Estilos específicos para ModalConfirm
    confirmContainer: {
      background: "#fff",
      padding: "20px",
      borderRadius: "8px",
      width: "350px",
      maxWidth: "90%",
      display: "flex",
      flexDirection: "column",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    },
    confirmMessage: {
      marginBottom: "20px",
      textAlign: "center",
      fontSize: "16px",
      color: "#333",
    },
    confirmButtons: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    },
  };
}
  