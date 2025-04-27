import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Rating,
  Chip,
  Grid,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

const MotionCard = motion(Card);

const featuredProducts = [
  {
    id: 88,
    title: "Nike Air Jordan 1 Red And Black",
    description: "The Nike Air Jordan 1 in Red and Black is an iconic basketball sneaker known for its stylish design and high-performance features.",
    price: 149.99,
    rating: 2.77,
    brand: "Nike",
    thumbnail: "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/thumbnail.png",
    discountPercentage: 15.82
  },
  {
    id: 89,
    title: "Nike Baseball Cleats",
    description: "Nike Baseball Cleats are designed for maximum traction and performance on the baseball field.",
    price: 79.99,
    rating: 4.01,
    brand: "Nike",
    thumbnail: "https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Baseball%20Cleats/thumbnail.png",
    discountPercentage: 11.4
  },
  {
    id: 90,
    title: "Puma Future Rider Trainers",
    description: "The Puma Future Rider Trainers offer a blend of retro style and modern comfort.",
    price: 89.99,
    rating: 4.85,
    brand: "Puma",
    thumbnail: "https://cdn.dummyjson.com/products/images/mens-shoes/Puma%20Future%20Rider%20Trainers/thumbnail.png",
    discountPercentage: 3.64
  }
];

const FeaturedProducts = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: 'background.default',
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 700,
            fontSize: { xs: '2rem', md: '2.5rem' },
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Featured Products
        </Typography>

        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <MotionCard
                whileHover={{ y: -10 }}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: theme.shadows[4],
                }}
              >
                <CardMedia
                  component="img"
                  height="260"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                    },
                  }}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={product.brand}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: 'white',
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        mb: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {product.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        height: '40px',
                      }}
                    >
                      {product.description}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.rating})
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ fontWeight: 700 }}
                    >
                      ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textDecoration: 'line-through' }}
                    >
                      ${product.price}
                    </Typography>
                    <Chip
                      label={`${product.discountPercentage}% OFF`}
                      size="small"
                      sx={{
                        backgroundColor: theme.palette.error.light,
                        color: theme.palette.error.main,
                        fontWeight: 600,
                        ml: 'auto',
                      }}
                    />
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default FeaturedProducts; 