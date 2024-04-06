import { createTheme } from '@mui/material/styles';
import './catamaran.css';

const theme = createTheme({
  typography:{
    fontFamily: "'Catamaran', sans-serif",
    fontSize: '1rem',
    '@media (min-width:600px)': {
      fontSize: '1.2rem',
    },
    fontWeight: 600,
  },
  palette: {
    primary: {
      main: '#799275',
      light: '#D2DAC3',
      dark: '#486142',
    },
    secondary: {
      main: '#B65138',
      light: '#e5b1a1',
      dark: '#B65138',
    },
    background: {
      main: '#F6F6F6',
      light: '#FFFFFF',
      dark: '#bebebe',
    },
    error: {
      main: "#e04747",
      light: "#e04747",
      dark: "#e04747",
    },
    success: {
      main: "#22bb33",
      light: "#22bb33",
      dark: "#22bb33",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960
    },
  },
});
export default theme;