import React, { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';
import axios from 'axios';

const Testimonial = () => {
  const [properties, setProperties] = useState([]); // State to store API data

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const Title = styled.h1`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 40px;
    text-transform: uppercase;
    letter-spacing: 1px;
  `;

  return (
    <Box sx={{ padding: 4, backgroundColor: '#f9f9f9' }}>
      <Title>Our TESTIMONIALS</Title>
      <Box sx={{ maxWidth: 800, margin: 'auto' }}>
        <Slider {...sliderSettings}>
          {properties.map((property, index) => (
            <Box key={index} sx={{ padding: 3, textAlign: 'center' }}>
              <Avatar
                src={`http://127.0.0.1:8000${property.image}`} // Adjust for full image URL
                alt={property.name}
                sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }}
              />
              <Typography variant="h6" fontWeight="bold">
                {property.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {property.property_type}
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                "{property.description}"
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {property.price} USD/night
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Testimonial;
