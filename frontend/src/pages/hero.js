import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  backgroundImage: 'url(https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg)', // Updated image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat', // Ensures the image doesn't repeat
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: '#fff',
  textAlign: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%', // Full height
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
    transition: 'opacity 0.5s ease-in-out',
  },
}));

const Content = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

const HeroSection = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = 'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg'; // Update with your image URL
    img.onload = () => {
      setImageLoaded(true);
    };
  }, []);

  return (
    <HeroContainer>
      <Content>
        <Typography variant="h2" component="div" gutterBottom>
          Welcome to Shoe Store
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          Best collection of shoes for everyone
        </Typography>
        <Button variant="contained" color="secondary" size="large">
          Sale
        </Button>
      </Content>
      {!imageLoaded && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // White placeholder
            zIndex: 0,
          }}
        >
          <Typography variant="h6" sx={{ textAlign: 'center', paddingTop: '40%' }}>
            Loading...
          </Typography>
        </Box>
      )}
    </HeroContainer>
  );
};

export default HeroSection;
