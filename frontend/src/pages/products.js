import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
  Box,
  Button,
  Card,
  CardMedia,
  Typography,
  Container,
  useTheme,
  IconButton,
  Rating,
  Chip,
  Skeleton,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Favorite as FavoriteIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd'; // Import Ant Design message

const MotionContainer = motion(Container);
const MotionCard = motion(Card);
const MotionButton = motion(Button);

const ProductsSection = () => {
  const theme = useTheme();
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart() || {};
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [mensResponse, womensResponse] = await Promise.all([
          fetch('https://dummyjson.com/products/category/mens-shoes'),
          fetch('https://dummyjson.com/products/category/womens-shoes')
        ]);
        
        const mensData = await mensResponse.json();
        const womensData = await womensResponse.json();
        
        setProducts([...mensData.products, ...womensData.products]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        message.error('Failed to load products');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = filter === 'All'
    ? products
    : products.filter(product => product.category === filter);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  const handleAddToCart = (product) => {
    console.log('Add to Cart clicked for:', product.title);
    if (!isAuthenticated) {
      message.error('Please login to add items to cart!'); // Updated error message
      navigate('/login'); // Changed from /signup to /login
    } else {
      console.log(`Adding ${product.title} to cart.`);
      addToCart(product);
      message.success(`${product.title} added to cart!`); // Ant Design message for success
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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

  const filterButtons = [
    { label: 'All', value: 'All' },
    { label: 'Men', value: 'mens-shoes' },
    { label: 'Women', value: 'womens-shoes' },
  ];

  return (
    <MotionContainer
      maxWidth="lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ width: '100%', padding: '0 16px' }}
      sx={{
        py: { xs: 4, md: 8 },
        overflow: 'hidden',
        margin: '0 auto',
      }}
    >
      <Box
        component={motion.div}
        variants={itemVariants}
        style={{ width: '100%' }}
        sx={{
          textAlign: 'center',
          mb: 6,
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '3rem' },
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Featured Collection
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{
            maxWidth: '600px',
            mx: 'auto',
            mb: 4,
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          Discover our handpicked selection of premium footwear
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mb: 4,
          }}
        >
          {filterButtons.map((btn) => (
            <Button
              key={btn.value}
              variant={filter === btn.value ? 'contained' : 'outlined'}
              onClick={() => setFilter(btn.value)}
              style={{ width: 'auto' }}
              sx={{
                borderRadius: '20px',
                px: 3,
                py: 1,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                position: 'relative',
                color: 'text.primary',
                background: filter === btn.value ? `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` : 'none',
                boxShadow: 'none',
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
              {btn.label}
            </Button>
          ))}
        </Box>
      </Box>

      <AnimatePresence mode="wait">
        {loading ? (
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[1, 2, 3].map((n) => (
              <Skeleton
                key={n}
                variant="rectangular"
                width={320}
                height={400}
                sx={{ borderRadius: 2 }}
              />
            ))}
          </Box>
        ) : (
          <Slider {...settings} style={{ width: '100%', margin: '0 auto' }}>
            {filteredProducts.map((product) => (
              <Box key={product.id} sx={{ p: 1, display: 'flex', justifyContent: 'center' }}>
                <MotionCard
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  style={{ width: '100%' }}
                  sx={{
                    maxWidth: 320,
                    borderRadius: 4,
                    overflow: 'hidden',
                    bgcolor: 'background.paper',
                    boxShadow: theme.shadows[8],
                    position: 'relative',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="300"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.1)',
                        },
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        display: 'flex',
                        gap: 1,
                      }}
                    >
                      <IconButton
                        component={motion.button}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        sx={{
                          bgcolor: 'background.paper',
                          boxShadow: theme.shadows[2],
                          '&:hover': { bgcolor: 'background.paper' },
                        }}
                      >
                        <FavoriteIcon color="error" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ p: 2 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={product.rating} precision={0.5} readOnly size="small" />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        ({product.rating})
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Chip
                        label={product.brand}
                        size="small"
                        sx={{
                          bgcolor: 'primary.light',
                          color: 'primary.contrastText',
                          fontWeight: 500,
                        }}
                      />
                      <Typography
                        variant="h6"
                        color="primary"
                        sx={{ fontWeight: 700, ml: 'auto' }}
                      >
                        ${product.price}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <MotionButton
                        fullWidth
                        variant="contained"
                        startIcon={<CartIcon />}
                        onClick={() => handleAddToCart(product)}
                        component={motion.button}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ width: '100%' }}
                        sx={{
                          backgroundColor: '#FF6F00',
                          color: 'white',
                          textTransform: 'none',
                          fontWeight: 500,
                          '&:hover': {
                            bgcolor: 'common.white',
                            color: '#FF6F00',
                            boxShadow: '0 4px 20px rgba(255,107,107,0.4)',
                          },
                        }}
                      >
                        Add to Cart
                      </MotionButton>
                      <Button
                        variant="outlined"
                        style={{ width: 'auto' }}
                        sx={{
                          minWidth: 'auto',
                          px: 2,
                          position: 'relative',
                          color: 'text.primary',
                          boxShadow: 'none',
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
                        onClick={() => navigate(`/product/${product.id}`)}
                      >
                        <ArrowForwardIcon />
                      </Button>
                    </Box>
                  </Box>
                </MotionCard>
              </Box>
            ))}
          </Slider>
        )}
      </AnimatePresence>
    </MotionContainer>
  );
};

export default ProductsSection;
