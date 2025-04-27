import React from 'react';
import { Box, Typography, Link, IconButton, Container, Grid, useTheme } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn } from '@mui/icons-material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

const Footer = () => {
  const theme = useTheme();
  
  const socialIcons = [
    { icon: <Facebook />, label: 'Facebook', link: '#' },
    { icon: <Instagram />, label: 'Instagram', link: '#' },
    { icon: <Twitter />, label: 'Twitter', link: '#' },
    { icon: <LinkedIn />, label: 'LinkedIn', link: '#' },
  ];

  const footerSections = [
    {
      title: 'About Us',
      links: [
        { text: 'Our Story', href: '#' },
        { text: 'Careers', href: '#' },
        { text: 'Press', href: '#' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { text: 'Contact Us', href: 'mailto:example@example.com' },
        { text: 'Shipping Info', href: '#' },
        { text: 'Returns & Exchanges', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { text: 'Privacy Policy', href: '#' },
        { text: 'Terms of Service', href: '#' },
        { text: 'Cookie Policy', href: '#' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 6,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: theme.palette.divider,
        },
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <Grid container spacing={4} justifyContent="space-between">
            {footerSections.map((section, index) => (
              <Grid item xs={12} sm={6} md={3} key={section.title}>
                <MotionBox variants={itemVariants}>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontWeight: 600,
                      color: 'text.primary',
                    }}
                  >
                    {section.title}
                  </Typography>
                  {section.links.map((link) => (
                    <Typography
                      key={link.text}
                      variant="body2"
                      sx={{
                        mb: 1,
                        color: 'text.secondary',
                        transition: 'color 0.2s',
                        '&:hover': {
                          color: 'primary.main',
                        },
                      }}
                    >
                      <Link
                        href={link.href}
                        sx={{
                          color: 'inherit',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        {link.text}
                      </Link>
                    </Typography>
                  ))}
                </MotionBox>
              </Grid>
            ))}

            <Grid item xs={12} sm={6} md={3}>
              <MotionBox variants={itemVariants}>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 600,
                    color: 'text.primary',
                  }}
                >
                  Connect With Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {socialIcons.map((social) => (
                    <MotionIconButton
                      key={social.label}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      sx={{
                        color: 'text.secondary',
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: 'transparent',
                        },
                      }}
                    >
                      {social.icon}
                    </MotionIconButton>
                  ))}
                </Box>
              </MotionBox>
            </Grid>
          </Grid>

          <MotionBox
            variants={itemVariants}
            sx={{
              mt: 6,
              pt: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
              textAlign: 'center',
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'text.secondary',
              }}
            >
              © {new Date().getFullYear()} Shoe Store. All rights reserved.
            </Typography>
          </MotionBox>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Footer;
