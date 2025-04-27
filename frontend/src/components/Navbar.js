import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Button,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Slide,
  Paper,
  ListItemIcon,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  LogoutRounded as LogoutIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import Cart from '../pages/Cart';
import { useCart } from '../pages/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import { message } from 'antd';

const MotionBox = motion(Box);
const MotionIconButton = motion(IconButton);

const Navbar = () => {
  const theme = useTheme();
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCartToggle = () => setCartOpen(prev => !prev);
  const handleCloseCart = () => setCartOpen(false);
  const toggleDrawer = (open) => () => setDrawerOpen(open);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
        const data = await response.json();
        setSearchResults(data.products.slice(0, 5)); // Show only first 5 results
        setShowResults(true);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const handleResultClick = (product) => {
    navigate(`/product/${product.id}`);
    setShowResults(false);
    setSearchQuery('');
  };

  const handleNavigation = (path) => {
    if (path === '/men' || path === '/women' || path === '/sale') {
      if (!isAuthenticated) {
        message.error('Please login to view products');
        navigate('/login');
      } else {
        navigate(path);
      }
    } else {
      navigate(path);
    }
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Men', path: '/men' },
    { label: 'Women', path: '/women' },
    { label: 'Sale', path: '/' },
  ];

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const searchVariants = {
    rest: { width: isMobile ? '100%' : '200px' },
    focus: { width: isMobile ? '100%' : '280px' },
  };

  return (
    <Box>
      <Slide appear={false} direction="down" in={true} mountOnEnter unmountOnExit>
        <AppBar 
          position="sticky" 
          sx={{
            bgcolor: 'background.paper',
            boxShadow: theme.shadows[2],
            backdropFilter: 'blur(8px)',
            background: 'rgba(255, 255, 255, 0.98)',
            width: '100%'
          }}
        >
          <Container 
            maxWidth="lg" 
            sx={{ 
              px: { xs: 2, sm: 3, md: 4 },
              width: '100%',
              margin: '0 auto'
            }}
          >
            <Toolbar sx={{ 
              justifyContent: 'space-between', 
              py: { xs: 1, sm: 1.5 },
              minHeight: { xs: '64px', sm: '70px' },
              width: '100%',
              padding: '0 !important'
            }}>
              {isMobile && (
                <MotionIconButton
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  onClick={toggleDrawer(true)}
                  sx={{ mr: 1 }}
                >
                  <MenuIcon />
                </MotionIconButton>
              )}

              <Typography
                variant="h6"
                component={motion.div}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  cursor: 'pointer',
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                }}
                onClick={() => navigate('/')}
              >
                Shoe Store
              </Typography>

              {!isMobile && (
                <Box sx={{ 
                  display: 'flex', 
                  gap: { sm: 1.5, md: 2 }, 
                  mx: { sm: 2, md: 4 },
                  flex: 1,
                  justifyContent: 'center' 
                }}>
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      component={motion.button}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => handleNavigation(item.path)}
                      sx={{
                        color: 'text.primary',
                        fontWeight: 500,
                        position: 'relative',
                        '&:hover': {
                          color: 'text.primary',
                          backgroundColor: 'transparent',
                        },
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: '0%',
                          height: '2px',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          bgcolor: 'primary.main',
                          transition: 'width 0.3s ease',
                        },
                        '&:hover::after': {
                          width: '80%',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              )}

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 0.5, sm: 1, md: 1.5 }, 
                position: 'relative' 
              }}>
                <MotionBox
                  component={motion.div}
                  variants={searchVariants}
                  initial="rest"
                  whileFocus="focus"
                  sx={{
                    position: 'relative',
                    bgcolor: 'background.default',
                    borderRadius: '20px',
                    px: 2,
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    boxShadow: theme.shadows[1],
                  }}
                >
                  <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                  <InputBase
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    sx={{
                      color: 'text.primary',
                      '& .MuiInputBase-input': {
                        py: 1,
                        transition: theme.transitions.create('width'),
                      },
                    }}
                  />
                </MotionBox>

                {showResults && searchResults.length > 0 && (
                  <Paper
                    elevation={3}
                    sx={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      width: '100%',
                      maxWidth: '280px',
                      mt: 1,
                      zIndex: 1000,
                    }}
                  >
                    <List>
                      {searchResults.map((product) => (
                        <ListItem
                          key={product.id}
                          button
                          onClick={() => handleResultClick(product)}
                          sx={{
                            '&:hover': {
                              bgcolor: 'action.hover',
                            },
                          }}
                        >
                          <ListItemIcon>
                            <img
                              src={product.thumbnail}
                              alt={product.title}
                              style={{
                                width: 40,
                                height: 40,
                                objectFit: 'cover',
                                borderRadius: 4,
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={product.title}
                            secondary={`$${product.price}`}
                            primaryTypographyProps={{
                              variant: 'body2',
                              fontWeight: 500,
                            }}
                            secondaryTypographyProps={{
                              variant: 'caption',
                              color: 'primary',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}

                <MotionIconButton
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  onClick={handleCartToggle}
                  sx={{ color: 'text.primary' }}
                >
                  <Badge 
                    badgeContent={cart.length} 
                    color="primary"
                    sx={{
                      '& .MuiBadge-badge': {
                        fontSize: '0.8rem',
                        minWidth: '18px',
                        height: '18px',
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </MotionIconButton>

                {isAuthenticated ? (
                  <MotionIconButton
                    whileHover="hover"
                    whileTap="tap"
                    variants={buttonVariants}
                    onClick={handleLogout}
                    sx={{ color: 'text.primary' }}
                  >
                    <LogoutIcon />
                  </MotionIconButton>
                ) : (
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      component={motion.button}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => navigate('/login')}
                      startIcon={<PersonIcon />}
                      sx={{
                        bgcolor: '#FF6F00',
                        color: 'white',
                        '&:hover': {
                          bgcolor: 'common.white',
                          color: '#FF6F00',
                          boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
                        },
                      }}
                    >
                      Login
                    </Button>
                  </Box>
                )}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Slide>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: '280px',
            bgcolor: 'background.paper',
            p: 2,
          },
        }}
      >
        <List>
          {navItems.map((item) => (
            <ListItem
              key={item.label}
              component={motion.div}
              whileHover={{ x: 10 }}
              button
              onClick={() => {
                handleNavigation(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  bgcolor: 'primary.light',
                  color: 'primary.contrastText',
                },
              }}
            >
              <ListItemText 
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 500,
                }}
              />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <AnimatePresence mode="wait">
        {cartOpen && (
          <Cart
            onClose={handleCloseCart}
            sx={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: { xs: '100%', sm: '400px' },
              height: '100%',
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[4],
              zIndex: theme.zIndex.drawer + 1,
            }}
          />
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Navbar;
