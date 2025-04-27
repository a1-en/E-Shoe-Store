import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.png';
import { styled } from '@mui/material/styles';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);

const StyledHeroSection = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 0,
  position: 'relative',
  overflow: 'hidden',
  width: '100%'
}));

const Hero = () => {
  return (
    <>
      <StyledHeroSection>
        <Box
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 3, sm: 4, md: 6 },
            mt: { xs: 2, sm: 3, md: 4 },
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 'lg',
            mx: 'auto',
            width: '100%',
            gap: { xs: 4, lg: 0 },
            overflow: 'hidden',
            boxSizing: 'border-box'
          }}
        >
          <MotionBox
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            sx={{
              order: { xs: 2, lg: 1 },
              textAlign: { xs: 'center', lg: 'left' },
              mx: 'auto',
              pt: { xs: 2, sm: 3, lg: 2 },
              pb: { xs: 4, sm: 5, lg: 2 },
              px: { lg: 0 },
              width: { xs: '100%', sm: '90%', lg: '50%' },
              position: 'relative',
              zIndex: 1,
            }}
          >
            <MotionTypography
              variant="h1"
              sx={{
                color: 'text.primary',
                fontWeight: 700,
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem', lg: '3rem', xl: '3.5rem' },
                pb: { xs: 1, sm: 1.5, md: 2 },
                lineHeight: { xs: 1.3, sm: 1.4, md: 1.2 },
              }}
            >
              Discover your dream sneakers
            </MotionTypography>

            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                py: { xs: 1.5, sm: 2, lg: 3 },
                lineHeight: { xs: 1.5, sm: 1.6 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                maxWidth: { xs: '100%', sm: '90%', md: '100%' },
                mx: 'auto',
              }}
            >
              With a wide range of quality and affordable sneakers to choose from,
              browse through our collections for that sneakers you've always wanted.
            </Typography>

            <Link to="/men" style={{ textDecoration: 'none' }}>
              <MotionButton
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  width: { xs: '100%', sm: '80%', md: '70%', lg: '60%' },
                  height: { xs: '48px', sm: '52px', md: '56px' },
                  bgcolor: '#FF6B6B',
                  color: 'common.white',
                  borderRadius: { xs: '8px', sm: '10px', lg: '12px' },
                  mt: { xs: 2, sm: 3 },
                  mb: { xs: 1, sm: 2 },
                  mx: { xs: 'auto', lg: 0 },
                  boxShadow: '0 4px 20px rgba(255,107,107,0.3)',
                  '&:hover': {
                    bgcolor: 'common.white',
                    color: '#FF6B6B',
                    boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
                  },
                  transition: 'all 0.3s ease',
                  fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' }
                }}
              >
                Explore Products
              </MotionButton>
            </Link>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            sx={{
              order: { xs: 1, lg: 2 },
              width: { xs: '100%', sm: '90%', lg: '50%' },
              ml: { lg: 2 },
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={heroImg}
              alt="orange sneakers"
              sx={{
                width: { xs: '80%', sm: '70%', md: '60%', lg: '100%' },
                height: 'auto',
                objectFit: 'contain',
                maxWidth: '100%',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                bottom: { xs: '4rem', sm: '6rem', lg: '6rem' },
                left: { xs: '7rem', sm: '11rem', lg: '12rem' },
                zIndex: -1,
              }}
            >
              <Box
                sx={{
                  height: 'inherit',
                  '& svg': {
                    width: '100%',
                    transform: { xs: 'scale(1.4)', sm: 'scale(1.2)', lg: 'scale(1.5)' },
                    zIndex: -1,
                  },
                }}
              >
                <svg
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#FFE8E8"
                    d="M40.7,-68.2C48.9,-65.7,49.1,-47.1,54.7,-33.1C60.4,-19,71.3,-9.5,71,-0.2C70.6,9.1,58.8,18.1,50.1,26.8C41.4,35.5,35.8,43.8,27.9,54.9C20.1,66,10,79.9,0.5,79.1C-9.1,78.3,-18.2,62.8,-27.6,52.6C-37,42.4,-46.7,37.5,-57.4,29.6C-68.1,21.7,-79.8,10.9,-83.4,-2.1C-87.1,-15.1,-82.8,-30.2,-71.9,-37.7C-61,-45.3,-43.6,-45.3,-30.5,-45C-17.4,-44.7,-8.7,-44,3.8,-50.5C16.2,-57.1,32.5,-70.7,40.7,-68.2Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </Box>
            </Box>
          </MotionBox>
        </Box>
      </StyledHeroSection>

      {/* Benefits Section */}
      <Box sx={{ maxWidth: 'lg', mx: 'auto', mt: { xs: 4, md: 8 }, mb: { xs: 2, md: 6 }, px: 2 }}>
        <Box sx={{ borderBottom: '1px solid #eee', width: '100%', mb: 3 }} />
        <Typography variant="h3" fontWeight={700} sx={{ mb: 4, textAlign: 'left' }}>
          Benefits
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', gap: { xs: 4, md: 0 } }}>
          {/* Fast Delivery */}
          <Box sx={{ flex: 1, textAlign: 'center', px: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ bgcolor: '#FFE8E8', borderRadius: '50%', p: 3, display: 'inline-flex' }}>
                <LocalShippingIcon sx={{ color: '#FF6F00', fontSize: 40 }} />
              </Box>
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              Fast Delivery
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 320, mx: 'auto' }}>
              Get your shoes as quickly as possible. Keep track to your deliveries and enjoy our fast shippping right at your door step.
            </Typography>
          </Box>
          {/* Affordable Goods */}
          <Box sx={{ flex: 1, textAlign: 'center', px: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ bgcolor: '#FFE8E8', borderRadius: '50%', p: 3, display: 'inline-flex' }}>
                <AttachMoneyIcon sx={{ color: '#FF6F00', fontSize: 40 }} />
              </Box>
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              Affordable Goods
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 320, mx: 'auto' }}>
              The sneakers available are just within the reach of your pocket. No hidden cost. No additional fee required other than what's stated.
            </Typography>
          </Box>
          {/* Best Quality */}
          <Box sx={{ flex: 1, textAlign: 'center', px: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box sx={{ bgcolor: '#FFE8E8', borderRadius: '50%', p: 3, display: 'inline-flex' }}>
                <StarIcon sx={{ color: '#FF6F00', fontSize: 40 }} />
              </Box>
            </Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              Best Quality
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 320, mx: 'auto' }}>
              From your favorite brand to the latest trends, we sell sneakers only of the finest and durable materials you'd ever find.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Hero;
