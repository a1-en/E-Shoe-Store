import React from 'react';
import { Box, Typography, Paper, Stepper, Step, StepLabel, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const steps = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

const TrackOrder = () => {
  const navigate = useNavigate();
  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Track Your Order
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Order #123456789<br />
          Estimated Delivery: 2-4 business days
        </Typography>
        <Stepper activeStep={2} alternativeLabel sx={{ mb: 3 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Your order is currently <b>Shipped</b>.<br />
          You will receive a notification when it is out for delivery.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>Back to Home</Button>
      </Paper>
    </Box>
  );
};

export default TrackOrder; 