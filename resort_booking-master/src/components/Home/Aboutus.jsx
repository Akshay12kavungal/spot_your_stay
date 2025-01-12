import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { styled } from '@mui/system';

const locations = [
  { name: 'THEERAM', imgSrc: 'https://i.postimg.cc/fbwKrcyz/P1181274.jpg' },
  { name: 'FARM HOUSE', imgSrc: 'https://i.postimg.cc/fbwKrcyz/P1181274.jpg' },
  { name: 'OUT HOUSE', imgSrc: 'https://i.postimg.cc/fbwKrcyz/P1181274.jpg' },
  { name: 'TREE TALES', imgSrc: 'https://i.postimg.cc/fbwKrcyz/P1181274.jpg' },
];

const SectionWrapper = styled(Box)({
  textAlign: 'center',
  padding: '50px 20px',
});

const Title = styled(Typography)({
fontSize:"24px",
fontWeight:600,
marginBottom:"40px",
textTransform:"uppercase",
letterSpacing:"1px"
});

const Subtitle = styled(Typography)({
  color: '#666',
  fontSize: '1rem',
  marginBottom: '30px',
});

const LocationImage = styled(Box)(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '50%',
  overflow: 'hidden',
  margin: '0 auto',
  border: '4px solid #fff',
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
}));

const LocationName = styled(Typography)({
  marginTop: '10px',
  fontSize: '1rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
});



const LocationsSection = () => {
  return (
    <SectionWrapper>
      <Title>Our Locations</Title>
      <Subtitle>Browse destinations for your next holiday plan.</Subtitle>
      <Grid container spacing={4} justifyContent="center">
        {locations.map((location, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <LocationImage>
              <img src={location.imgSrc} alt={location.name} />
            </LocationImage>
            <LocationName>{location.name}</LocationName>
          </Grid>
        ))}
      </Grid>
    </SectionWrapper>
  );
};

export default LocationsSection;
