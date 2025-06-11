import patternCard from '../assets/bg-pattern-card.svg';

export function stylesAbout() {
  return {
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      gap: '40px',
      flexWrap: 'wrap',
      padding: '40px',
      backgroundImage: '',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      color: 'black'
    },
    card: {
      width: '320px',
      background: 'white',
      borderRadius: '15px',
      textAlign: 'center',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      overflow: 'hidden',
      position: 'relative',
    },
    header: {
      height: '120px',
      backgroundImage: `url(${patternCard})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      position: 'relative',
    },
    profileImg: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      border: '5px solid white',
      background: 'white',
      position: 'absolute',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    content: {
      padding: '60px 20px 20px',
      color: '#333',
      fontSize: '14px',
    },
    title: {
      fontSize: '20px',
      color: '#333',
    },
    link: {
      color: '#0077aa',
      textDecoration: 'none',
      wordBreak: 'break-word',
    },
    techIcons: {
      display: 'flex',
      justifyContent: 'center',
      gap: '15px',
      marginTop: '20px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    icon: {
      width: '40px',
      height: '40px',
    }
  };
}
  