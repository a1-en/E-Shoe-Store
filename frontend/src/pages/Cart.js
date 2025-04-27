// src/pages/Cart.js
import React from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  Card,
  CardContent,
  CardMedia,
  Badge,
} from '@mui/material';
import {
  Close as CloseIcon,
  DeleteOutline as DeleteIcon,
  ShoppingBagOutlined as BagIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const Cart = ({ onClose }) => {
  const theme = useTheme();
  const { cart, clearCart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout-form');
  };

  const containerVariants = {
    hidden: { x: '100%' },
    visible: {
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      sx={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: { xs: '100%', sm: '400px' },
        height: '100vh',
        bgcolor: 'background.paper',
        boxShadow: theme.shadows[8],
        zIndex: theme.zIndex.drawer + 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <BagIcon />
          Shopping Cart
          <Badge badgeContent={cart.length} color="primary" sx={{ ml: 1 }} />
        </Typography>
        <IconButton
          onClick={onClose}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
        }}
      >
        <AnimatePresence mode="wait">
          {cart.length === 0 ? (
            <MotionBox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              sx={{
                textAlign: 'center',
                py: 8,
                color: 'text.secondary',
              }}
            >
              <BagIcon sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
              <Typography variant="h6">Your cart is empty</Typography>
              <Typography variant="body2">Add items to get started</Typography>
            </MotionBox>
          ) : (
            cart.map((item, index) => (
              <MotionCard
                key={item.id || index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                sx={{
                  mb: 2,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[2],
                }}
              >
                <Box sx={{ display: 'flex', p: 1 }}>
                  <CardMedia
                    component="img"
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                    image={item.thumbnail}
                    alt={item.title}
                  />
                  <CardContent sx={{ flex: 1, p: '8px 16px !important' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ${item.price}
                        </Typography>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.id)}
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        <RemoveIcon fontSize="small" />
                      </IconButton>
                      <Typography sx={{ mx: 2, minWidth: 20, textAlign: 'center' }}>
                        {item.quantity || 1}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                      >
                        <AddIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Box>
              </MotionCard>
            ))
          )}
        </AnimatePresence>
      </Box>

      <Box
        sx={{
          p: 2,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: 'background.paper',
        }}
      >
        {cart.length > 0 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1">Total:</Typography>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                ${calculateTotal().toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={clearCart}
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Clear Cart
              </Button>
              <Button
                fullWidth
                variant="contained"
                onClick={handleCheckout}
                component={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                sx={{
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                }}
              >
                Checkout
              </Button>
            </Box>
          </>
        )}
      </Box>
    </MotionBox>
  );
};

export default Cart;
