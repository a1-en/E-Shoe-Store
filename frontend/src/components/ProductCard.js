import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Chip, Rating, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useCart } from '../pages/CartContext';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/AuthContext';
import { message } from 'antd';

const MotionCard = motion(Card);

const ProductCard = ({ product }) => {
  const theme = useTheme();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      message.error('Please login to add items to cart!');
      navigate('/login');
    } else {
      addToCart(product);
      message.success(`${product.title} added to cart!`);
    }
  };

  return (
    <MotionCard
      whileHover={{ y: -5 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.thumbnail}
        alt={product.title}
        sx={{
          objectFit: 'cover',
          p: 1,
          borderRadius: 1,
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/product/${product.id}`)}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate(`/product/${product.id}`)}>
            {product.title}
          </Typography>
          <Chip
            label={`$${product.price}`}
            color="primary"
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {product.brand}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Rating value={product.rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({product.rating})
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Chip
            label={`${product.discountPercentage}% OFF`}
            color="secondary"
            size="small"
            sx={{ fontWeight: 500 }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            style={{
              background: theme.palette.primary.main,
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            Add to Cart
          </motion.button>
        </Box>
      </CardContent>
    </MotionCard>
  );
};

export default ProductCard; 