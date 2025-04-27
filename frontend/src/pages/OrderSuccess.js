import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <Box p={4} maxWidth={500} mx="auto" textAlign="center">
      <Typography variant="h4" fontWeight={700} color="success.main" gutterBottom>
        Order Confirmed!
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Thank you for your purchase. Your order has been placed successfully.
      </Typography>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>Back to Home</Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/track-order')}>Track Order</Button>
      </Stack>
    </Box>
  );
};

export default OrderSuccess; 