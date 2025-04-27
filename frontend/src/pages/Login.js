// src/pages/Login.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper,  CircularProgress } from '@mui/material';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useAuth } from '../pages/AuthContext'; // Adjust the import path as necessary


const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'relative', // Ensure stacking context
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundImage: 'url(https://images.pexels.com/photos/19090/pexels-photo-19090.jpeg)', // Background image of shoes
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '12px',
  boxShadow: theme.shadows[5],
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    zIndex: 0, // Put overlay behind
  },
  '& > *': {
    position: 'relative',
    zIndex: 1, // Put content above overlay
  },
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  color: 'black',
  fontWeight: 600,
  marginBottom: theme.spacing(3),
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext


  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://e-shoe-store.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        login(token); // Call login function from context

        message.success('Login successful!');
        navigate('/'); // Redirect to the main page after login
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('An error occurred during login. Please try again.',error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box p={3} maxWidth={400} mx="auto">
      <StyledPaper elevation={6}>
        <TitleTypography variant="h5" gutterBottom style={{ color: 'black' }} >
          Log in
        </TitleTypography>
        
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: 'black' } }}
          InputProps={{ style: { color: 'black' } }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: 'black' } }}
          InputProps={{ style: { color: 'black' } }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{
            marginTop: 2,
            color: 'white',
            backgroundColor: '#FF6F00',
            '&:hover': {
              bgcolor: 'common.white',
              color: '#FF6F00',
              boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" style={{ color: 'black' }}>
            Not registered?{' '}
            <Button
              color="primary"
              onClick={() => navigate('/signup')}
              sx={{
                textTransform: 'none',
                p: 0,
                color: 'black',
                '&:hover': {
                  backgroundColor: 'transparent',
                  textDecoration: 'underline',
                },
              }}
            >
              Create a new account
            </Button>
          </Typography>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default Login;
