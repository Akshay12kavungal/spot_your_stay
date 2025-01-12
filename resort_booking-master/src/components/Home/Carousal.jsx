import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const slides = [
  {
    title: "Collaboration that's making waves",
    description: "Offering exceptional pawsome getaways in India, to discerning guests from all over the world.",
    logo1: '/path/to/logo1.png', // Replace with the actual logo path
    logo2: '/path/to/logo2.png', // Replace with the actual logo path
  },
  {
    title: "Adventure Awaits",
    description: "Discover unique destinations and create unforgettable memories in India.",
    logo1: '/path/to/logo1.png', // Replace with the actual logo path
    logo2: '/path/to/logo2.png', // Replace with the actual logo path
  },
  // Add more slide data as needed
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const slideInterval = setInterval(handleNext, 5000); // Change slides every 5 seconds
    return () => clearInterval(slideInterval); // Clear interval on component unmount
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        background: 'linear-gradient(90deg, #f9f5fc, #f3e9f7)',
        borderRadius: 2,
        maxWidth: 1200,
        margin: 'auto',
      }}
    >
      <Button onClick={handlePrev}>
        <ArrowBackIosNewIcon />
      </Button>

      <Box sx={{ flex: 1, textAlign: 'center', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <img src={slides[currentSlide].logo1} alt="Logo 1" style={{ height: 50, marginRight: 10 }} />
          <Typography variant="h6" component="span">X</Typography>
          <img src={slides[currentSlide].logo2} alt="Logo 2" style={{ height: 50, marginLeft: 10 }} />
        </Box>

        <Typography variant="h4" component="h2" gutterBottom>
          {slides[currentSlide].title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {slides[currentSlide].description}
        </Typography>

        <Button   sx={{
    margin: '0 auto 1rem',
    color: 'white',  
    backgroundColor:"black",     // Black text color
    '&:hover': {
      borderColor: 'black', // Keeps the outline black on hover
      backgroundColor: 'black', // Optional light black background on hover,
      color:'white'
    }}}>
          Read More
        </Button>
      </Box>

      <Button onClick={handleNext}>
        <ArrowForwardIosIcon />
      </Button>
    </Box>
  );
};

export default Carousel;
