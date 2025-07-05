export function StylesTable() {
  return {
    container: {
      marginTop: "30px",
      marginBottom: "30px",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#F2F4F8",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    header: {
      backgroundColor: "#1E3A5F",
      padding: "16px 20px",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "20px",
      textAlign: "left",
      borderTopLeftRadius: "12px",
      borderTopRightRadius: "12px",
    },
    wrapper: {
      overflowX: "auto",
      padding: "0 16px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "10px",
      color: "#1E3A5F",
    },
    theadRow: {
      textAlign: "center",
      backgroundColor: "#E3EAF2",
    },
    tbodyRow: {
      borderBottom: "1px solid #D6DBDF",
      textAlign: "center",
      backgroundColor: "#fff",
      transition: "background 0.2s",
    },
    inputCell: {
      width: "80px",
      textAlign: "center",
      color: "#1E3A5F",
    },
    estadoColor: (estado) => ({
      color:
        estado?.toLowerCase() === "activo" || estado?.toLowerCase() === "pendiente" || estado?.toLowerCase() === "activa" || estado?.toLowerCase() === "devuelto" 
          ? "green"
          : estado?.toLowerCase() === "finalizado" || estado?.toLowerCase() === "pagada" || estado?.toLowerCase() === "finalizada" 
          ? "#0A3D62"
          : "red",
      fontWeight: "bold",
    }),
    nowrapCell: {
      whiteSpace: "nowrap",
    },
    pagination: {
      textAlign: "center",
      marginTop: "20px",
      paddingBottom: "10px",
    },
    paginationButton: (isActive) => ({
      margin: "0 5px",
      padding: "6px 12px",
      borderRadius: "6px",
      backgroundColor: isActive ? "#1E3A5F" : "#ffffff",
      color: isActive ? "#ffffff" : "#1E3A5F",
      border: "1px solid #1E3A5F",
      cursor: "pointer",
      fontWeight: "bold",
    }),
    paginationButtonDefault: {
      margin: "0 5px",
      padding: "6px 12px",
      borderRadius: "6px",
      backgroundColor: "#ffffff",
      color: "#1E3A5F",
      border: "1px solid #1E3A5F",
      cursor: "pointer",
    },
    iconAction: {
      cursor: "pointer",
      marginRight: "8px",
      color: "#1E3A5F",
      fontSize: "18px",
    },
    toggleDisabled: {
      cursor: "not-allowed",
      opacity: 0.5,
    },
    toggleEnabled: {
      cursor: "pointer",
    },
  };
}
  