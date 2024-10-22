// src/App.js
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductsSection from './pages/products';
import { CartProvider } from './pages/CartContext';
import { AuthProvider } from './pages/AuthContext'; // Import the AuthProvider
import HeroSection from './pages/hero';
import Footer from './components/footer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './pages/Checkout';
function App() {
  return (
    <AuthProvider> {/* Wrap everything with AuthProvider */}
      <CartProvider>
        <Router>
          {/* Navbar will always be shown */}
          <Navbar />
          
          {/* HeroSection should be conditionally rendered based on the route */}
          <Routes>
            <Route path="/" element={<><HeroSection />
            <ProductsSection /></>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/checkout" element={<Checkout />} />


            {/* Add more routes as needed */}
          </Routes>

          {/* Footer will always be shown */}
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
