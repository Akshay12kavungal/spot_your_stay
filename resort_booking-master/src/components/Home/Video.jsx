import React from 'react';
import { Box, Typography, Button, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SearchIcon from '@mui/icons-material/Search';

const VideoBackground = styled('video')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const Overlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: -17,
  width: '100%',
  height: '100%',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  padding: '0 20px',
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

const videos = [
  {
    src: require('../../assets/resort.mkv'),
    title: 'Thottupuram Resorts',
    description:
      "Welcome to Thottupuram Resorts. Experience nature's pure luxury with your loved ones at our humble abode in Thodupuzha. Whether it's a party with friends or a relaxing weekend getaway with family, we are here for you.",
  },
  {
    src: require('../../assets/secondVideo.MP4'),
    title: 'Luxury Awaits',
    description:
      'Experience unmatched luxury and serene views, making every moment unforgettable.',
  },
 
];

const CustomArrow = ({ className, style, onClick, direction }) => (
  <Box
    className={className}
    onClick={onClick}
    sx={{
      ...style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      top: '50%',
      [direction === 'left' ? 'left' : 'right']: '20px',
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
    }}
  >
  </Box>
);

const VideoSection = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
  };

  return (
    <Box sx={{ position: 'relative', height: { xs: '80vh', md: '100vh' }, overflow: 'hidden' }}>
      <Slider {...sliderSettings}>
        {videos.map((video, index) => (
          <Box key={index} sx={{ position: 'relative', height: { xs: '80vh', md: '100vh' } }}>
            <VideoBackground autoPlay loop muted>
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </VideoBackground>
          </Box>
        ))}
      </Slider>

      <Overlay>
        {/* Title and Subtitle */}
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
          Tentgram is a platform for explorers to come together by signing up for exciting experiential stays in stunning properties or touring destinations.
        </Typography>

        {/* Search Field */}
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

        {/* Statistics Section */}
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
