import React, { useState } from 'react';
import { Box, Button, Typography, IconButton } from '@mui/material';
import ListProperty from './ListProperty';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  {
    title: "List Your Property With Us",
    description: "Offering exceptional pawsome getaways in India, to discerning guests from all over the world.",
    // logo1: '/path/to/logo1.png', // Replace with the actual logo path
    // logo2: '/path/to/logo2.png', // Replace with the actual logo path
  },
  // Add more slide data as needed
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showListProperty, setShowListProperty] = useState(false);

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const handleListProperty = () => {
    setShowListProperty(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
        background: 'linear-gradient(90deg, #f9f5fc, #f3e9f7)',
        borderRadius: 2,
        maxWidth: 1200,
        margin: 'auto',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <IconButton
        onClick={handlePrevSlide}
        sx={{
          position: 'absolute',
          left: 16,
          zIndex: 1,
          color: 'black',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
        aria-label="previous slide"
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Box sx={{ flex: 1, textAlign: 'center', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          {slides[currentSlide].logo1 && (
            <img src={slides[currentSlide].logo1} alt="Logo 1" style={{ height: 50, marginRight: 10 }} />
          )}
          <Typography variant="h6" component="span">X</Typography>
          {slides[currentSlide].logo2 && (
            <img src={slides[currentSlide].logo2} alt="Logo 2" style={{ height: 50, marginLeft: 10 }} />
          )}
        </Box>

        <Typography variant="h4" component="h2" gutterBottom>
          {slides[currentSlide].title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {slides[currentSlide].description}
        </Typography>

        <Button
          sx={{
            margin: '0 auto 1rem',
            color: 'white',
            backgroundColor: 'black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'black',
              color: 'white',
            },
          }}
          onClick={handleListProperty}
        >
          List Your Property with Us
        </Button>
      </Box>

      <IconButton
        onClick={handleNextSlide}
        sx={{
          position: 'absolute',
          right: 16,
          zIndex: 1,
          color: 'black',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          },
        }}
        aria-label="next slide"
      >
        <ArrowForwardIosIcon />
      </IconButton>

      {showListProperty && <ListProperty open={showListProperty} onClose={() => setShowListProperty(false)} />}
    </Box>
  );
};

export default Carousel;