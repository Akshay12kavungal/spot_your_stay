import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Tab, Tabs } from '@mui/material';
import { ArrowForwardIos, FavoriteBorder } from '@mui/icons-material';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TrendingSection = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState(0);
  const [properties, setProperties] = useState([]);
  const scrollContainerRef = useRef(null);

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
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const handleLocationChange = (event, newValue) => {
    setLocation(newValue);
  };

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({ left: newScrollPosition, behavior: 'smooth' });
    }
  };

  const handleArrowButtonClick = (propertyId) => {
    navigate(`/single/${propertyId}`);
    window.scrollTo(0, 0);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Title>OUR PROPERTIES</Title>
      <Tabs
        value={location}
        onChange={handleLocationChange}
        textColor="primary"
        indicatorColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="location tabs"
        sx={{ marginBottom: 3 }}
      >
        <Tab label="All" />
      </Tabs>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          ref={scrollContainerRef}
          sx={{
            display: 'flex',
            gap: 5,
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
            '&::-webkit-scrollbar': { display: 'none' },
            paddingBottom: 2,
          }}
        >
          {properties.map((property, index) => (
            <Card
              key={index}
              sx={{
                minWidth: '280px',
                maxWidth: '280px',
                borderRadius: 3,
                position: 'relative',
                flexShrink: 0,
                boxShadow: 8,
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={property.image}
                alt={property.name}
                sx={{ objectFit: 'cover', width: '100%', borderRadius: '12px 12px 0 0' }}
              />
              <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} color="default">
                <FavoriteBorder />
              </IconButton>
              <CardContent sx={{ padding: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {property.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {property.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {property.guests} Guests • {property.rooms} Rooms • {property.baths} Baths
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}>
                <Typography variant="h6" fontWeight="bold">
                  ${property.price}{' '}
                  <Typography variant="body2" component="span" color="text.secondary">
                    Per Night + Taxes
                  </Typography>
                </Typography>
                <IconButton
                  color="primary"
                  sx={{
                    border: '1px solid black',
                    color: 'black',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' },
                  }}
                  onClick={() => handleArrowButtonClick(property.id)}
                >
                  <ArrowForwardIos />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TrendingSection;
