// src/pages/Checkout.js
import React from 'react';
import { Box, Typography, Button, Divider, Paper, Avatar } from '@mui/material';
import { useCart } from './CartContext'; // Adjust the import path as necessary
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '12px',
  boxShadow: theme.shadows[5],
  color: theme.palette.text.primary,
}));

const Checkout = () => {
  const { cart, clearCart } = useCart(); // Get cart items and clearCart from context
  const navigate = useNavigate();

  const totalAmount = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0); // Calculate total price

  const handleConfirmOrder = () => {
    clearCart();
    navigate('/order-success');
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <StyledPaper elevation={6}>
        <Typography variant="h5" gutterBottom color="text.primary">
          Checkout
        </Typography>
        <Divider sx={{ mb: 2, borderColor: 'divider' }} />
        {cart.length === 0 ? (
          <Typography color="text.secondary">No items in the cart</Typography>
        ) : (
          cart.map((item, index) => (
            <Box key={index} sx={{ mb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar src={item.thumbnail} alt={item.title} variant="rounded" sx={{ width: 56, height: 56 }} />
                <Box>
                  <Typography color="text.primary">{item.title}</Typography>
                  <Typography color="text.secondary" variant="body2">Quantity: {item.quantity || 1}</Typography>
                </Box>
              </Box>
              <Typography color="text.primary">${(item.price * (item.quantity || 1)).toFixed(2)}</Typography>
            </Box>
          ))
        )}
        <Divider sx={{ my: 2, borderColor: 'divider' }} />
        <Typography variant="h6" gutterBottom color="text.primary">
          Total: ${totalAmount.toFixed(2)}
        </Typography>
        <Button 
          variant="contained" 
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={handleConfirmOrder}
        >
          Confirm Order
        </Button>
      </StyledPaper>
    </Box>
  );
};

export default Checkout;
