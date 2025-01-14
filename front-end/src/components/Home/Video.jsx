import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

const VideoBackground = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100%',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  padding: '0 0',
  textAlign: 'center',
  overflow: 'hidden',
});

const StyledSearchField = styled(TextField)({
  backgroundColor: '#fff',
  borderRadius: '30px',
  width: '80%',
  maxWidth: '500px',
  marginTop: '20px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
  },
  '@media (max-width: 600px)': {
    width: '90%', // Adjust width for smaller screens
    maxWidth: '90%', // Ensure it doesn’t exceed screen width
  },
  '@media (min-width: 601px) and (max-width: 960px)': {
    width: '85%', // Adjust for medium-sized screens
  },
  '@media (min-width: 961px)': {
    width: '80%', // Default for larger screens
  },
});


const StatsBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  gap: '30px',
  marginTop: '40px',
  textAlign: 'center',
  color: '#fff',
  zIndex: 1,
});

const Stat = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});


const VideoSection = () => {
  const [carouselVideos, setCarouselVideos] = useState([]);

  useEffect(() => {
    const fetchCarouselVideos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/carousel/carouselvideo/', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include this if your backend uses cookies for authentication
        });

        if (response.status === 200) {
          setCarouselVideos(response.data);
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching carousel videos:', error);
      }
    };

    fetchCarouselVideos();
  }, []);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 15000,
    arrows: false,
  };

  return (
    <Box sx={{ position: 'relative', height: { xs: '80vh', md: '100vh' }, overflow: 'hidden' }}>
      <Slider {...sliderSettings}>
        {carouselVideos.map((video, index) => (
          <Box key={index} sx={{ position: 'relative', height: { xs: '80vh', md: '100vh' } }}>
            <VideoBackground autoPlay loop muted>
              <source src={video.video} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoBackground>
          </Box>
        ))}
      </Slider>

      <Overlay>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.5rem', sm: '2.5rem', md: '3.5rem' },
            maxWidth: '90%',
          }}
        >
          We've got your travel plans.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            mb: 4,
            maxWidth: '90%',
            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.25rem' },
            lineHeight: { xs: '1.4', sm: '1.8' },
            overflowWrap: 'break-word',
          }}
        >
          Spot Your Stay is a platform for explorers to come together by signing up for exciting experiential stays in stunning properties or touring destinations.
        </Typography>

        <StyledSearchField
          placeholder="Search Experiences"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <StatsBox>
          <Stat>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              07+
            </Typography>
            <Typography variant="body2">Years</Typography>
          </Stat>
          <Stat>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              12+
            </Typography>
            <Typography variant="body2">Locations</Typography>
          </Stat>
          <Stat>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              100k+
            </Typography>
            <Typography variant="body2">Guests</Typography>
          </Stat>
        </StatsBox>
      </Overlay>
    </Box>
  );
};

export default VideoSection;
