import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { Facebook, Instagram } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#088F8F',
  color: '#fff',
  padding: theme.spacing(2), // Reduced padding to decrease height
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const FooterContent = styled(Box)(({ theme }) => ({
  flex: '1 0 300px',
  padding: theme.spacing(1), // Reduced padding for individual content blocks
}));

const FooterIcons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2), // Reduced gap between icons
  marginTop: theme.spacing(1), // Reduced margin at the top
}));

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Typography variant="h6" gutterBottom> {/* Changed variant to reduce font size */}
          Get Help
        </Typography>
        <Typography variant="body2" gutterBottom> {/* Smaller body text */}
          Email: <Link href="mailto:example@example.com" color="inherit">example@example.com</Link>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Phone: <Link href="tel:+1234567890" color="inherit">+1 (234) 567-890</Link>
        </Typography>
      </FooterContent>
      <FooterContent>
        <FooterIcons>
          <IconButton href="#" target="_blank" rel="noopener" aria-label="Facebook" color="inherit">
            <Facebook />
          </IconButton>
          <IconButton href="#" target="_blank" rel="noopener" aria-label="Instagram" color="inherit">
            <Instagram />
          </IconButton>
        </FooterIcons>
      </FooterContent>
      <FooterContent>
        <Typography variant="h6" gutterBottom> {/* Reduced font size */}
          Information
        </Typography>
        <Typography variant="body2" gutterBottom> {/* Smaller text */}
          Your company information goes here.
        </Typography>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
