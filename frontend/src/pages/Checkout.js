// src/pages/Checkout.js
import React from 'react';
import { Box, Typography, Button, Divider, Paper } from '@mui/material';
import { useCart } from './CartContext'; // Adjust the import path as necessary
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '10px',
  boxShadow: theme.shadows[5],
  color: 'black', // Set text color to black
}));

const Checkout = () => {
  const { cart } = useCart(); // Get cart items from context

  const totalAmount = cart.reduce((total, item) => total + item.price, 0); // Calculate total price

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <StyledPaper elevation={6}>
        <Typography variant="h5" gutterBottom>
          Checkout
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {cart.length === 0 ? (
          <Typography>No items in the cart</Typography>
        ) : (
          cart.map((item, index) => (
            <Box key={index} sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
              <Typography>{item.name}</Typography>
              <Typography>{item.price}</Typography>
            </Box>
          ))
        )}
        <Divider sx={{ my: 2 }} />
        <Typography variant="h6" gutterBottom>
          Total: ${totalAmount}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ marginTop: 2, backgroundColor: '#088F8F', '&:hover': { backgroundColor: 'white', color: '#088F8F' } }} // Keep button color
        >
          Confirm Order
        </Button>
      </StyledPaper>
    </Box>
  );
};

export default Checkout;
