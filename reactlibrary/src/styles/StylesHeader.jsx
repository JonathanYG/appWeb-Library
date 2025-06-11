export function StylesHeader(scrolling = false) {
  return {
    barraNavegacion: {
      backgroundColor: scrolling ? 'rgb(90, 127, 165)' : '#2C3E50',
      color: '#fff',
      padding: '10px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      zIndex: 12,
      top: 0,
      left: 0,
      right: 0,
      boxSizing: 'border-box',
    },
    logoContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginLeft: '10px',
      cursor: 'pointer',
    },
    logoTexto: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#fff',
    },
    botones: {
      display: 'flex',
      gap: '20px',
      alignItems: 'center',
    },
    botonTexto: {
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#fff',
      fontSize: '14px',
      cursor: 'pointer',
      fontWeight: '500',
      padding: '8px 12px',
      transition: 'background 0.3s, color 0.3s',
      borderRadius: '6px',
    },
    botonTextoHover: {
      backgroundColor: '#3d566e',
    },
  };
}
