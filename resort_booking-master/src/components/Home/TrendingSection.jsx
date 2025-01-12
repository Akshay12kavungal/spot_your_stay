import React from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Tab, Tabs } from '@mui/material';
import { ArrowForwardIos, FavoriteBorder } from '@mui/icons-material';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

const properties = [
  {
    name: "Theeram FarmStays",
    location: "Kerala",
    guests: "10",
    rooms: "4",
    baths: "4",
    price: "₹23,660",
    imageUrl: "https://i.postimg.cc/fbwKrcyz/P1181274.jpg",
  },
  {
    name: "Thottupuram FarmHouse",
    location: "Kerala",
    guests: "15",
    rooms: "6",
    baths: "6",
    price: "₹79,750",
    imageUrl: "https://i.postimg.cc/NFgzD1P8/beautiful-scenery-mangal-das-garcas-park-city-belem-brazil.jpg",
  },
  {
    name: "OutHouse by Thottupuram",
    location: "Kerala",
    guests: "7",
    rooms: "3",
    baths: "3",
    price: "₹56,383",
    imageUrl: "https://i.postimg.cc/YS6RPvFd/pool-holiday-leisure-hotel-blue.jpg",
  },
  {
    name: "Tree Tales",
    location: "Kerala",
    guests: "3",
    rooms: "1",
    baths: "1",
    price: "₹11,210",
    imageUrl: "https://i.postimg.cc/wjHknhXn/luxury-outdoor-hotel.jpg",
  },
];

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TrendingSection = () => {
  const navigate = useNavigate();

  const [location, setLocation] = React.useState(0);

  const handleLocationChange = (event, newValue) => {
    setLocation(newValue);
  };

  const handleArrowButtonClick = (propertyName) => {
    navigate('/single');
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

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap', // Ensures wrapping on smaller screens
          justifyContent: 'space-between', // Space between cards on larger screens
          '@media (max-width: 600px)': {
            flexDirection: 'column', // Stacks cards vertically on mobile screens
            gap: 3, // Increases spacing between cards on mobile
          },
        }}
      >
        {properties.map((property, index) => (
          <Card
            key={index}
            sx={{
              width: '23%', // Four cards in a row on larger screens
              borderRadius: 3,
              position: 'relative',
              '@media (max-width: 600px)': {
                width: '100%', // Full width on mobile screens
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={property.imageUrl}
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
                {property.location}
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
                onClick={() => handleArrowButtonClick(property.name)}
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
