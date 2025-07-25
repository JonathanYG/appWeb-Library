export function StylesHome() {
  return {
    contenedorEstilo: {
      display: 'flex',
      flexDirection: 'column',
      padding: '30px',
      gap: '20px',
      backgroundColor: '#f9f9f9',
      minHeight: '80vh',
      boxSizing: 'border-box',
    },
    barraBusquedaEstilo: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      flexWrap: 'wrap',
    },
    grupoBotones: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'nowrap',
      flexShrink: 0,
    },
    inputBusquedaEstilo: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      width: '300px',
      fontSize: '14px',
      backgroundColor: '#f9f9f9',
      color: '#2C3E50',
    },
    selectTipoEstilo: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      fontSize: '14px',
      backgroundColor: '#f9f9f9',
      color: '#2C3E50',
    },
    botonBusquedaEstilo: {
      padding: '10px 20px',
      backgroundColor: '#e74c3c',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background 0.3s',
      outline: 'none',
    },
    botonLimpiarEstilo: {
      padding: '10px 20px',
      backgroundColor: '#2C3E50',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      marginLeft: '10px',
      cursor: 'pointer',
      fontWeight: 'bold',
      transition: 'background 0.3s',
      outline: 'none',
    },
    botonLimpiarHoverEstilo: {
      backgroundColor: '#1A242F',
    },
    botonBusquedaHoverEstilo: {
      backgroundColor: '#c0392b',
    },
    tituloColeccionEstilo: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#333',
      marginTop: '20px',
      marginBottom: '10px',
      textAlign: 'left',
    },
    gridLibrosEstilo: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: '20px',
      width: '100%',
      color: 'black',
    },
    tarjetaLibroEstilo: {
      backgroundColor: '#fff',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s',
      cursor: 'pointer',
    },
    tarjetaLibroHoverEstilo: {
      transform: 'scale(1.02)',
    },
    imagenLibroEstilo: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
    },
    contenidoLibroEstilo: {
      padding: '16px',
    },
    tituloLibroEstilo: {
      fontSize: '16px',
      fontWeight: 'bold',
      margin: '0 0 4px 0',
    },
    autorLibroEstilo: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '8px',
    },
    categoriaLibroEstilo: {
      display: 'inline-block',
      fontSize: '12px',
      padding: '4px 8px',
      backgroundColor: '#eee',
      borderRadius: '4px',
      color: '#333',
    },
  };
}
  