import React, { useRef } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, CardActions, IconButton, Tab, Tabs } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos, FavoriteBorder } from '@mui/icons-material';
import { styled } from 'styled-components';


const properties = [
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
    name: "Theeram FarmStays",
    location: "Kerala",
    guests: "10",
    rooms: "4",
    baths: "4",
    price: "₹23,660",
    imageUrl: "https://i.postimg.cc/zf7WWKKY/village-fog-cloud.jpg",
  },
  {
    name: "Tree Tales",
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
const BestRated = () => {
  const scrollRef = useRef(null);

  const [location, setLocation] = React.useState(0);

  const handleLocationChange = (event, newValue) => {
    setLocation(newValue);
  };

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Title>BEST RATED</Title>
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
        {/* <Tab label="Lonavala" />
        <Tab label="Alibaug" />
        <Tab label="Goa" />
        <Tab label="Shimla" />
        <Tab label="Manali" />
        <Tab label="Explore more" /> */}
      </Tabs>

      <Box sx={{ position: 'relative' }}>
        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
          onClick={() => scroll(-300)}
        >
          <ArrowBackIos />
        </IconButton>

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            gap: 2,
            paddingBottom: 1,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {properties.map((property, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 300,
                borderRadius: 3,
                flex: '0 0 auto',
                scrollSnapAlign: 'start',
                position: 'relative',
              }}
            >
               <CardMedia
                component="img"
                height="180"
                image={property.imageUrl}
                alt={property.name}
                sx={{
                  objectFit: 'cover', // Ensures the image covers the area without distortion
                  width: '100%', // Ensures it takes full width of the card without overflow
                }}
              />
              <IconButton
                sx={{ position: 'absolute', top: 10, right: 10 }}
                color="default"
              >
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
                </Typography> <hr />
                <Typography variant="h6" fontWeight="bold">
                  {property.price} <Typography variant="body2" component="span" color="text.secondary">Per Night + Taxes</Typography>
                </Typography>
              </CardContent>
              <CardActions>
  <IconButton
    color="primary"
    sx={{
      marginLeft: 'auto',
      border: '1px solid black', // Black outline
      color: 'black',            // Black icon color
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)', // Optional light black background on hover
      },
    }}
  >
    <ArrowForwardIos />
  </IconButton>
</CardActions>

            </Card>
          ))}
        </Box>

        <IconButton
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            zIndex: 1,
          }}
          onClick={() => scroll(300)}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Box>
  );
};

export default BestRated;
