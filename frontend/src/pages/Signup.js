// src/pages/Signup.js
import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundImage: 'url(https://images.pexels.com/photos/19090/pexels-photo-19090.jpeg)', // Background image of shoes
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  borderRadius: '10px',
  boxShadow: theme.shadows[5],
  color: theme.palette.common.white,
}));

const TitleTypography = styled(Typography)(({ theme }) => ({
  color: 'black', // Ensure the title is white for better visibility
}));

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const response = await fetch('https://e-shoe-store.onrender.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem('token', token);
        message.success('User registered successfully!');
        navigate('/login'); // Redirect to login after signup
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error('An error occurred during signup', error);
    }
  };

  return (
    <Box p={3} maxWidth={400} mx="auto">
      <StyledPaper elevation={6}>
        <TitleTypography variant="h5" gutterBottom>
          Create an Account
        </TitleTypography>
       
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: 'black' } }} // Change label color to black
          InputProps={{ style: { color: 'black' } }} // Change input text color
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: 'black' } }} // Change label color to black
          InputProps={{ style: { color: 'black' } }} // Change input text color
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: 'black' } }} // Change label color to black
          InputProps={{ style: { color: 'black' } }} // Change input text color
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSignup}
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: '#088F8F', // Custom color for button
            '&:hover': {
              backgroundColor: 'white', // Darker color on hover
            },
          }}
        >
          Signup
        </Button>
      </StyledPaper>
    </Box>
  );
};

export default Signup;
