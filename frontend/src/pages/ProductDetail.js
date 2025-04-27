import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardMedia, Rating, Chip, CircularProgress, Grid, Paper } from '@mui/material';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';
import { message } from 'antd';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart() || {};
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        message.error('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      message.error('Please login to add items to cart!');
      navigate('/login');
    } else {
      addToCart(product);
      message.success(`${product.title} added to cart!`);
    }
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress /></Box>;
  }
  if (!product) {
    return <Typography align="center">Product not found.</Typography>;
  }

  return (
    <Box maxWidth="md" mx="auto" p={3}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              alt={product.title}
              sx={{ width: '100%', borderRadius: 2, maxHeight: 400, objectFit: 'contain' }}
            />
            <Box display="flex" gap={1} mt={2}>
              {product.images && product.images.map((img, idx) => (
                <img key={idx} src={img} alt="product" style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8, border: '1px solid #eee' }} />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" fontWeight={700} mb={1}>{product.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary" mb={2}>{product.brand}</Typography>
            <Rating value={product.rating} precision={0.5} readOnly size="medium" />
            <Typography variant="h5" color="primary" fontWeight={700} mt={2}>${product.price}</Typography>
            <Chip label={product.category} sx={{ mt: 1, mb: 2 }} />
            <Typography variant="body1" mb={2}>{product.description}</Typography>
            <Typography variant="body2" color="text.secondary" mb={1}>Stock: {product.stock}</Typography>
            <Button variant="contained" color="primary" onClick={handleAddToCart} sx={{ mt: 2, color: 'black' }}>Add to Cart</Button>
            <Box mt={3}>
              <Typography variant="h6" fontWeight={600}>Reviews</Typography>
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review, idx) => (
                  <Box key={idx} mb={2}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Typography variant="body2" fontWeight={500}>{review.reviewerName}</Typography>
                    <Typography variant="body2" color="text.secondary">{review.comment}</Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">No reviews yet.</Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductDetail; 