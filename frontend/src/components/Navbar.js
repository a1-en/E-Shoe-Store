import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Cart from '../pages/Cart'; // Import the Cart component
import { useCart } from '../pages/CartContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation
import { useAuth } from '../pages/AuthContext'; // Import useAuth
import { LogoutOutlined } from '@ant-design/icons'; // Import Ant Design Logout icon
import { message } from 'antd'; // Import Ant Design message component

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = () => {
  const { cart } = useCart();
  const { isAuthenticated, logout } = useAuth(); // Use useAuth to get authentication state
  const [cartOpen, setCartOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleCartToggle = () => {
    setCartOpen((prev) => !prev);
  };

  const handleCloseCart = () => {
    setCartOpen(false);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    message.success('Logout successful!'); // Show logout message
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#088F8F' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Shoe Store
          </Typography>

          {/* Mobile Menu Icon */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', sm: 'none' } }} // Show only on mobile
          >
            <MenuIcon />
          </IconButton>

          {/* Navigation Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, justifyContent: 'center' }}>
            <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
            <Button color="inherit" onClick={() => navigate('/')}>Men</Button>
            <Button color="inherit" onClick={() => navigate('/')}>Women</Button>
            <Button color="inherit" onClick={() => navigate('/')}>Sale</Button>
            <Button color="inherit" onClick={() => navigate('/')}>New Arrival</Button>
          </Box>

          {/* Search, Cart, and Login/Signup/Logout Buttons */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

            {/* Badge for Cart */}
            <IconButton size="large" aria-label="cart" color="inherit" onClick={handleCartToggle}>
              <Badge badgeContent={cart.length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>

            {/* Conditional Rendering for Authentication Buttons */}
            {isAuthenticated ? (
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutOutlined />
              </IconButton>
            ) : (
              <>
                <Button color="inherit" onClick={() => navigate('/login')}>Login</Button>
                <Button color="inherit" onClick={() => navigate('/signup')}>Signup</Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        <List>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemText primary="Men" />
          </ListItem>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate('/')}>
            <ListItemText primary="Sale" />
          </ListItem>
          {/* Add more items here */}
        </List>
      </Drawer>

      {/* Cart Component */}
      {cartOpen && (
        <Cart 
          onClose={handleCloseCart} 
          sx={{ position: 'fixed', top: 0, right: 0, width: '300px', height: '100%', bgcolor: 'white', boxShadow: 2, zIndex: 1200 }} 
        />
      )}
    </>
  );
};

export default Navbar;
