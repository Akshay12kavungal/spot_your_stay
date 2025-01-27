import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/properties/', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // Include this if your backend uses cookies for authentication
        });
  
        // Check if response is valid and data exists
        if (response.status === 200) {
          setProperties(response.data); // Update the state with the fetched data
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

  const handleArrowButtonClick = (propertyId) => {
    navigate(`/single/${propertyId}`); // Navigate to the property details page
    window.scrollTo(0, 0); // Scroll to the top of the page
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

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            gap: 3,
          },
        }}
      >
        {properties.map((property, index) => (
          <Card
            key={index}
            sx={{
              width: '23%',
              borderRadius: 3,
              position: 'relative',
              '@media (max-width: 600px)': {
                width: '100%',
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={property.image}
              alt={property.name}
              sx={{
                objectFit: 'cover',
                width: '100%',
              }}
            />
            <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} color="default">
              <FavoriteBorder />
            </IconButton>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {property.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {property.address}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Upto {property.guests} Guests + {property.rooms} Rooms + {property.baths} Baths
              </Typography>
              <hr />
              <Typography variant="h6" fontWeight="bold">
                {property.price} <Typography variant="body2" component="span" color="text.secondary">Per Night + Taxes</Typography>
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                color="primary"
                sx={{
                  marginLeft: 'auto',
                  border: '1px solid black',
                  color: 'black',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
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
  );
};

export default TrendingSection;
