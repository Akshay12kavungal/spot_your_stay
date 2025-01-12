import React from 'react';
import { Box, Typography, Avatar,  } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from 'styled-components';


const testimonials = [
  {
    name: 'John Doe',
    image: 'https://via.placeholder.com/150',
    feedback: 'This is the best service I have ever used. Highly recommended!',
    title: 'CEO, Example Co.',
  },
  {
    name: 'Jane Smith',
    image: 'https://via.placeholder.com/150',
    feedback: 'Amazing experience! The support team was fantastic.',
    title: 'Marketing Director, ABC Corp.',
  },
  {
    name: 'Samuel Green',
    image: 'https://via.placeholder.com/150',
    feedback: 'Top-notch service and exceptional quality!',
    title: 'Freelance Designer',
  },
];

const Testimonial = () => {
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
           <Title>What Our Client Say</Title>

      <Box sx={{ maxWidth: 800, margin: 'auto' }}>
        <Slider {...sliderSettings}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ padding: 3, textAlign: 'center' }}>
              <Avatar
                src={testimonial.image}
                alt={testimonial.name}
                sx={{ width: 100, height: 100, margin: 'auto', marginBottom: 2 }}
              />
              <Typography variant="h6" fontWeight="bold">
                {testimonial.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {testimonial.title}
              </Typography>
              <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                "{testimonial.feedback}"
              </Typography>
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Testimonial;
