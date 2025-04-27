import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, Grid, RadioGroup, FormControlLabel, Radio, FormLabel, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PaymentIcon from '@mui/icons-material/Payment';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const paymentLogos = [
  { icon: <CreditCardIcon sx={{ color: '#1976d2', fontSize: 32 }} />, label: 'Mastercard' },
  { icon: <PaymentIcon sx={{ color: '#1976d2', fontSize: 32 }} />, label: 'PayPal' },
  { icon: <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" style={{ height: 28 }} />, label: 'Visa' },
];

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just navigate to /checkout
    navigate('/checkout');
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom fontWeight={700}>
          Checkout - Personal & Payment Info
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth required type="email" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Phone" name="phone" value={form.phone} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Shipping Address" name="address" value={form.address} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <FormLabel component="legend" sx={{ mb: 1 }}>Payment Method</FormLabel>
              <RadioGroup row value={paymentMethod} onChange={handlePaymentChange}>
                <FormControlLabel value="cod" control={<Radio />} label={<><LocalAtmIcon sx={{ mr: 0.5 }} />Cash on Delivery</>} />
                <FormControlLabel value="card" control={<Radio />} label={<><CreditCardIcon sx={{ mr: 0.5 }} />Pay by Card</>} />
              </RadioGroup>
              {paymentMethod === 'card' && (
                <Stack direction="row" spacing={2} sx={{ mt: 1, mb: 2 }}>
                  {paymentLogos.map((logo, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'center' }}>{logo.icon}</Box>
                  ))}
                </Stack>
              )}
            </Grid>
            {paymentMethod === 'card' && <>
              <Grid item xs={12} sm={6}>
                <TextField label="Card Number" name="cardNumber" value={form.cardNumber} onChange={handleChange} fullWidth required inputProps={{ maxLength: 16 }} />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField label="Expiry" name="expiry" value={form.expiry} onChange={handleChange} fullWidth required placeholder="MM/YY" />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField label="CVV" name="cvv" value={form.cvv} onChange={handleChange} fullWidth required inputProps={{ maxLength: 4 }} />
              </Grid>
            </>}
          </Grid>
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 3, width: '100%' }}>
            Continue to Order Summary
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default CheckoutForm; 