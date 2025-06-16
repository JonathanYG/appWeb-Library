export function StylesErrorPage() {
    return {
        container: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            color: '#2C3E50',
            padding: '40px',
            textAlign: 'center',
        },
        title: {
            fontSize: '32px',
            marginBottom: '16px',
            color: '#e74c3c',
        },
        message: {
            fontSize: '18px',
            marginBottom: '24px',
            color: '#555',
            maxWidth: '500px',
        },
        buttonStyle: {
            backgroundColor: '#2C3E50',
            color: '#fff',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '16px',
        },
        buttonHover: {
            backgroundColor: '#1A242F',
        },
    };
}
