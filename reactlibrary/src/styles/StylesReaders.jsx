export function StylesReaders() {
    return {
        container: {
            paddingBottom: '20px',
            paddingTop: '20px',
            paddingRight: '40px',
            paddingLeft: '40px',
            color: 'black',
        },
        title: {
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#2C3E50',
        },
        barraBusquedaEstilo: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '20px',
            flexWrap: 'wrap',
        },
        inputBusquedaEstilo: {
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            flex: 1,
            backgroundColor: '#f9f9f9',
            color: '#2C3E50',
        },
        selectTipoEstilo: {
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #ccc',
        },
        grupoBotones: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'nowrap',
            flexShrink: 0,
        },
        botonBusquedaEstilo: {
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            outline: 'none',
        },
        botonBusquedaHoverEstilo: {
            backgroundColor: '#c0392b',
        },
        botonLimpiarEstilo: {
            backgroundColor: '#2C3E50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            outline: 'none',
        },
        botonLimpiarHoverEstilo: {
            backgroundColor: '#1A242F',
        },
        tableWrapper: {
            marginTop: '10px',
        },
    };
}