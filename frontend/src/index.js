import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a theme with the specified colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B6B', // Coral
      light: '#FFE8E8', // Light coral
      dark: '#FF5252', // Dark coral
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#4ECDC4', // Mint teal
      light: '#E0F7F6', // Light mint
      dark: '#3DBEB6', // Dark mint
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#FF6B6B', // Using coral for errors
      light: '#FFE8E8',
      dark: '#FF5252',
    },
    warning: {
      main: '#FFD166', // Mustard yellow
      light: '#FFF3D6',
      dark: '#FFC233',
    },
    info: {
      main: '#4ECDC4', // Using mint for info
      light: '#E0F7F6',
      dark: '#3DBEB6',
    },
    success: {
      main: '#06D6A0', // Emerald green
      light: '#E6FBF5',
      dark: '#05C090',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2D3748', // Dark gray
      secondary: '#718096', // Medium gray
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      color: '#2D3748',
    },
    h2: {
      fontWeight: 600,
      color: '#2D3748',
    },
    h3: {
      fontWeight: 600,
      color: '#2D3748',
    },
    h4: {
      fontWeight: 600,
      color: '#2D3748',
    },
    h5: {
      fontWeight: 600,
      color: '#2D3748',
    },
    h6: {
      fontWeight: 600,
      color: '#2D3748',
    },
    body1: {
      color: '#2D3748',
    },
    body2: {
      color: '#718096',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(255,107,107,0.3)',
          '&:hover': {
            boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#E2E8F0',
            },
            '&:hover fieldset': {
              borderColor: '#FF6B6B',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF6B6B',
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
