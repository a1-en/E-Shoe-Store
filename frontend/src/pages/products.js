import React, { useState } from 'react';
import Slider from 'react-slick';
import { Box, Button, Card, CardMedia, Typography, CardActions } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from './CartContext';
import { useAuth } from './AuthContext'; 
import { useNavigate } from 'react-router-dom'; 
import { message } from 'antd'; // Import Ant Design message

const products = [
  { 
    id: 1, 
    name: 'Nike SB Stefan Janoski', 
    category: 'Men', 
    price: '$110', 
    image: 'https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg' // Nike SB Stefan Janoski
  },
  { 
    id: 2, 
    name: 'Nike Air Force 1', 
    category: 'Men', 
    price: '$120', 
    image: 'https://images.pexels.com/photos/2048548/pexels-photo-2048548.jpeg' // Nike Air Force 1
  },
  { 
    id: 3, 
    name: 'Beige Peep-Toe Heeled Sandals', 
    category: 'Women', 
    price: '$85', 
    image: 'https://images.pexels.com/photos/137603/pexels-photo-137603.jpeg' // Beige Peep-Toe Heeled Sandals
  },
  { 
    id: 4, 
    name: 'Pink High Heeled Sandals', 
    category: 'Women', 
    price: '$95', 
    image: 'https://images.pexels.com/photos/27113457/pexels-photo-27113457.jpeg' // Pink High Heeled Sandals
  },
  { 
    id: 5, 
    name: 'White Sandals with Silver Straps', 
    category: 'Women', 
    price: '$70', 
    image: 'https://images.pexels.com/photos/14825375/pexels-photo-14825375.jpeg' // White Sandals with Silver Straps
  },
  { 
    id: 6, 
    name: 'Red and White Low-Top Sneakers', 
    category: 'Men', 
    price: '$80', 
    image: 'https://images.pexels.com/photos/1449844/pexels-photo-1449844.jpeg' // Red and White Low-Top Sneakers
  },
];


const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: '#f9f9f9',
}));

const FilterButtons = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 320,
  margin: 'auto',
  borderRadius: '20px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#fff',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: alpha('#000', 0.6),
  color: '#fff',
  padding: theme.spacing(2),
  textAlign: 'left',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: alpha('#000', 0.8),
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 300,
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
}));

const ProductCardActions = styled(CardActions)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 2),
  backgroundColor: '#fff',
  borderTop: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`,
}));

const AddToCartButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#088F8F',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#066a6a',
  },
  transition: 'background-color 0.3s',
}));

const ProductsSection = () => {
  const [filter, setFilter] = useState('All');
  const { addToCart } = useCart() || {};
  const { isAuthenticated } = useAuth(); 
  const navigate = useNavigate(); 

  // Log the authentication status
  console.log('isAuthenticated:', isAuthenticated);

  const filteredProducts = filter === 'All' ? products : products.filter(product => product.category === filter);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    console.log('Add to Cart clicked for:', product.name);
    if (!isAuthenticated) {
      message.error('You must register to use the cart! Please register first.'); // Ant Design message for error
      navigate('/signup');
    } else {
      console.log(`Adding ${product.name} to cart.`);
      addToCart(product);
      message.success(`${product.name} added to cart!`); // Ant Design message for success
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="div" gutterBottom>
        Our Products
      </Typography>
      <FilterButtons>
        <Button variant="contained" onClick={() => {
          setFilter('All');
          console.log('Filter set to All');
        }}>
          All
        </Button>
        <Button variant="contained" onClick={() => {
          setFilter('Men');
          console.log('Filter set to Men');
        }}>
          Men
        </Button>
        <Button variant="contained" onClick={() => {
          setFilter('Women');
          console.log('Filter set to Women');
        }}>
          Women
        </Button>
      </FilterButtons>
      <Slider {...settings}>
        {filteredProducts.map(product => (
          <StyledCard key={product.id}>
            <ProductImage
              component="img"
              image={product.image}
              alt={product.name}
            />
            <Overlay>
              <Typography variant="h6">
                {product.name}
              </Typography>
              <Typography variant="body2">
                {product.price}
              </Typography>
            </Overlay>
            <ProductCardActions>
              <AddToCartButton size="small" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </AddToCartButton>
              <Button size="small">Learn More</Button>
            </ProductCardActions>
          </StyledCard>
        ))}
      </Slider>
    </Container>
  );
};

export default ProductsSection;
