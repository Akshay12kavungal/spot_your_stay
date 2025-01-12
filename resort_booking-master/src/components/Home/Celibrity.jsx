import React, { useRef } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { styled } from 'styled-components';


const celebrities = [
  {
    name: "MS Dhoni",
    stayedAt: "Shimla Manor",
    imageUrl: "https://i.postimg.cc/1XKGwggR/images-19.jpg", // Replace with actual image URL
  },
  {
    name: "Vijay Deverakonda",
    stayedAt: "The Waterwillow",
    imageUrl: "https://i.postimg.cc/1XKGwggR/images-19.jpg",
  },
  {
    name: "Ananya Panday",
    stayedAt: "Villa Amarillo",
    imageUrl: "https://i.postimg.cc/1XKGwggR/images-19.jpg",
  },
  {
    name: "Soha Ali Khan",
    stayedAt: "Le Sutra Great Escapes - Geometrica",
    imageUrl: "https://i.postimg.cc/1XKGwggR/images-19.jpg",
  },
  {
    name: "Suryakumar Yadav",
    stayedAt: "The Barn",
    imageUrl: "https://i.postimg.cc/1XKGwggR/images-19.jpg",
  },
  {
    name: "Shweta Tiwari",
    stayedAt: "Ferias Villa",
    imageUrl: "https://i.postimg.cc/1XKGwggR/images-19.jpg",
  },
];

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CelebrityCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ padding: 4, position: 'relative' }}>
      <Title>Stay Like The Stars</Title>

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
          {celebrities.map((celebrity, index) => (
            <Card
              key={index}
              sx={{
                minWidth: 250,
                borderRadius: 2,
                flex: '0 0 auto',
                scrollSnapAlign: 'start',
                textAlign: 'center',
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={celebrity.imageUrl}
                alt={celebrity.name}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {celebrity.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Stayed at: {celebrity.stayedAt}
                </Typography>
              </CardContent>
              <Button
                variant="outlined"
                sx={{
                  margin: '0 auto 1rem',
                  borderColor: 'black', // Black outline
                  color: 'black',       // Black text color
                  '&:hover': {
                    borderColor: 'black', // Keeps the outline black on hover
                    backgroundColor: 'black', // Optional light black background on hover,
                    color: 'white'
                  },
                }}
              >
                View
              </Button>

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

export default CelebrityCarousel;
