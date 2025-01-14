import React, { useRef } from 'react';
import { Box, Typography, Card, CardContent, Button, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { styled } from 'styled-components';

const offers = [
  {
    code: 'NEWLYLAUNCHED',
    description: 'Use the code NEWLYLAUNCHED on our recently launched vistas, and get a flat 15% off, up to Rs. 3,000.',
    expiry: 'Expires December 20, 2024',
  },
  {
    code: 'SUMMERSALE',
    description: 'Enjoy a 10% discount on all summer collections using the code SUMMERSALE.',
    expiry: 'Expires December 15, 2024',
  },
  {
    code: 'FESTIVEDEAL',
    description: 'Get an additional 20% off on all festive items with the code FESTIVEDEAL.',
    expiry: 'Expires December 25, 2024',
  },
  {
    code: 'BLACKFRIDAY',
    description: 'Black Friday Sale! Use BLACKFRIDAY for flat 25% off, up to Rs. 5,000.',
    expiry: 'Expires December 5, 2024',
  },
];

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const OffersSection = () => {
  const carouselRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <Box sx={{ padding: 4, position: 'relative' }}>
      <Title>OFFERS FOR YOU</Title>

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
          ref={carouselRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            gap: 2,
            paddingBottom: 1,
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {offers.map((offer, index) => (
            <Card
              key={index}
              sx={{
                width: 300, // Reduced width here
                borderRadius: 2,
                flex: '0 0 auto',
                scrollSnapAlign: 'start',
                textAlign: 'center',
                border: '1px solid #ddd',
              }}
            >
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {offer.description}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary" gutterBottom>
                  {offer.expiry}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                  <Button
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      borderColor: 'black',
                      borderStyle: 'dotted',
                      color: 'black',
                    }}
                  >
                    {offer.code}
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      textTransform: 'none',
                      backgroundColor: 'black',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#333',
                      },
                    }}
                  >
                    Copy Code
                  </Button>
                </Box>
              </CardContent>
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

export default OffersSection;
