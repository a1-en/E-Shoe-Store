// src/pages/Cart.js
import React from 'react';
import { useCart } from './CartContext'; // Adjust the import path as necessary
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundImage: 'url(https://images.pexels.com/photos/19090/pexels-photo-19090.jpeg)', // Background image
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(2),
  borderRadius: '8px',
  boxShadow: theme.shadows[5],
  color: 'black', // Set default text color to black
}));

const Cart = ({ onClose }) => {
  const { cart, clearCart } = useCart(); // Get cart items and clearCart function from context
  const navigate = useNavigate(); // Get navigate function

  const handleCheckout = () => {
    navigate('/checkout'); // Navigate to the checkout page
  };

  return (
    <StyledPaper 
      sx={{ 
        position: 'fixed', 
        right: 0, 
        top: 0, 
        width: '300px', 
        zIndex: 9999, 
        overflowY: 'auto', // Allow scrolling if content overflows
        maxHeight: '90vh', // Limit height to fit the viewport
      }}
    >
      <Typography variant="h6" gutterBottom>
        Shopping Cart
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {cart.length === 0 ? (
        <Typography>No items in the cart</Typography>
      ) : (
        cart.map((item, index) => (
          <Box key={index} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="black">{item.name}</Typography> {/* Ensure item name is black */}
            <Typography color="black">{item.price}</Typography> {/* Ensure item price is black */}
          </Box>
        ))
      )}
      
      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          onClick={clearCart} 
          variant="outlined" 
          color="error" 
          sx={{ width: '48%', color: 'black', borderColor: 'black' }} // Set button text color to black
        >
          Clear Cart
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="secondary" 
          sx={{ width: '48%', backgroundColor: '#088F8F', '&:hover': { backgroundColor: 'white', color: '#088F8F' } }} // Keep button color
        >
          Close
        </Button>
      </Box>
      <Box sx={{ marginTop: 2, textAlign: 'center' }}>
        <Button 
          onClick={handleCheckout}
          variant="contained" 
          color="primary"
          sx={{ width: '100%', backgroundColor: '#088F8F', '&:hover': { backgroundColor: 'white', color: '#088F8F' } }} // Checkout button
        >
          Checkout
        </Button>
      </Box>
    </StyledPaper>
  );
};

export default Cart;
