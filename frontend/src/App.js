// src/App.js
import React from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import Navbar from './components/Navbar';
import ProductsSection from './pages/products';
import { CartProvider } from './pages/CartContext';
import { AuthProvider } from './pages/AuthContext'; // Import the AuthProvider
import HeroSection from './pages/hero';
import Footer from './components/footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Checkout from './pages/Checkout';
import { createTheme } from '@mui/material/styles';
import MenShoes from './pages/MenShoes';
import WomenShoes from './pages/WomenShoes';
import ProductDetail from './pages/ProductDetail';
import OrderSuccess from './pages/OrderSuccess';
import CheckoutForm from './pages/CheckoutForm';
import { message } from 'antd';
import TrackOrder from './pages/TrackOrder';

// Log Framer Motion version
console.log('Framer Motion version:', motion.version);

// Configure Ant Design message position globally
message.config({
  top: undefined,
  bottom: 24,
  duration: 2,
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6F00',
      light: '#FFA040',
      dark: '#C43E00',
      contrastText: '#ffffff',
      hover: '#FF8C00',
    },
    secondary: {
      main: '#FF6F00',
      light: '#FFA040',
      dark: '#C43E00',
      contrastText: '#ffffff'
    },
    background: {
      default: '#F5F7FA',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#1C1C1C',
      secondary: '#5F6368'
    },
    error: {
      main: '#D32F2F'
    },
    success: {
      main: '#2E7D32'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          padding: '8px 16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#FF8C00',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
        },
        contained: {
          backgroundColor: '#FF6F00',
          '&:hover': {
            backgroundColor: '#FF8C00',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

const PageWrapper = ({ children }) => {
  console.log('PageWrapper rendering with children:', children);
  
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      style={{ width: '100%', display: 'block' }}
      onError={(error) => console.error('Motion div error:', error)}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  console.log('AnimatedRoutes rendering with location:', location);
  
  return (
    <AnimatePresence mode="wait" onExitComplete={() => console.log('Exit complete')}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper>
            <HeroSection />
            <ProductsSection />
          </PageWrapper>
        } />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
        <Route path="/checkout-form" element={<PageWrapper><CheckoutForm /></PageWrapper>} />
        <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
        <Route path="/men" element={<PageWrapper><MenShoes /></PageWrapper>} />
        <Route path="/women" element={<PageWrapper><WomenShoes /></PageWrapper>} />
        <Route path="/product/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
        <Route path="/order-success" element={<PageWrapper><OrderSuccess /></PageWrapper>} />
        <Route path="/track-order" element={<PageWrapper><TrackOrder /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  console.log('App component rendering');
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <Router>
            <Box sx={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              bgcolor: 'background.default'
            }}>
              <Navbar />
              <Box component="main" sx={{ flex: 1 }}>
                <AnimatedRoutes />
              </Box>
              <Footer />
            </Box>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
