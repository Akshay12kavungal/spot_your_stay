import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/system';
import axios from 'axios';

const SectionWrapper = styled(Box)({
  textAlign: 'center',
  padding: '60px 20px',
  backgroundColor: '#f9f9f9',
  position: 'relative',
});

const Title = styled(Typography)({
  fontSize: '26px',
  fontWeight: 700,
  marginBottom: '30px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
});

const Subtitle = styled(Typography)({
  color: '#666',
  fontSize: '1rem',
  marginBottom: '40px',
});

const ScrollContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  scrollBehavior: 'smooth',
  gap: '20px',
  paddingBottom: '10px',
  scrollbarWidth: 'none',
  '-ms-overflow-style': 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
});

const LocationCard = styled(Box)({
  flex: '0 0 auto',
  width: '23%',
  textAlign: 'center',
  '@media (max-width: 600px)': {
    width: '45%',
  },
});

const LocationImage = styled(Box)({
  width: '140px',
  height: '140px',
  borderRadius: '50%',
  overflow: 'hidden',
  margin: '0 auto',
  border: '5px solid #fff',
  boxShadow: '0px 5px 12px rgba(0, 0, 0, 0.15)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const LocationName = styled(Typography)({
  marginTop: '12px',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

const ScrollButton = styled(IconButton)({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'white',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  zIndex: 10,
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const LocationsSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/properties/', {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        });
        if (response.status === 200) {
          setProperties(response.data);
        } else {
          setError('Unexpected response');
        }
      } catch (error) {
        setError('Failed to fetch properties');
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <SectionWrapper>
      <Title>Our Locations</Title>
      <Subtitle>Browse destinations for your next holiday plan.</Subtitle>

      {loading ? (
        <CircularProgress color="secondary" />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {properties.length > 4 && (
            <ScrollButton onClick={() => scroll('left')} sx={{ left: 10 }}>
              <ChevronLeft />
            </ScrollButton>
          )}
          <ScrollContainer ref={scrollRef}>
            {properties.map((property, index) => (
              <LocationCard key={index}>
                <LocationImage>
                  <img src={property.image} alt={property.name} />
                </LocationImage>
                <LocationName>{property.name.toUpperCase()}</LocationName>
              </LocationCard>
            ))}
          </ScrollContainer>
          {properties.length > 4 && (
            <ScrollButton onClick={() => scroll('right')} sx={{ right: 10 }}>
              <ChevronRight />
            </ScrollButton>
          )}
        </>
      )}
    </SectionWrapper>
  );
};

export default LocationsSection;
