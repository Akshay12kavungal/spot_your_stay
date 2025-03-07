import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Typography, styled } from '@mui/material';
import Header2 from '../components/Header2'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component

// Styled Components
const SectionWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start', // Align content to the left
  padding: '50px 20px',
  backgroundColor: 'transparent',
  color: '#000',
  flex: 1, // Take up remaining space
});

const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: '1500px',
  height: '700px', // Fixed height for both panels
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column', // Stack vertically on smaller screens
    height: 'auto', // Adjust height for mobile
  },
}));

const LeftPanel = styled(Box)(({ theme }) => ({
  flex: 3, // Larger width (3 parts out of 4)
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%', // Take up full height of parent
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Ensure the image covers the area
    borderRadius: '8px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  },
  [theme.breakpoints.down('md')]: {
    height: '300px', // Fixed height for mobile
  },
}));

const RightPanel = styled(Box)(({ theme }) => ({
  flex: 1, // Smaller width (1 part out of 4)
  overflowY: 'auto', // Enable vertical scrolling
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  height: '100%', // Take up full height of parent
  [theme.breakpoints.down('md')]: {
    overflowY: 'visible', // Disable vertical scrolling on mobile
    height: 'auto', // Adjust height for mobile
  },
}));

const ThumbnailGrid = styled(Grid)(({ theme }) => ({
  img: {
    width: '100%',
    height: '100px', // Fixed height for thumbnails
    objectFit: 'cover', // Ensure thumbnails cover the area
    borderRadius: '4px',
    cursor: 'pointer',
    border: '2px solid transparent',
    transition: 'border 0.3s ease',
    '&:hover': {
      border: '2px solid #000',
    },
  },
  [theme.breakpoints.down('sm')]: {
    // Adjust thumbnail grid for small screens
    '& .MuiGrid-item': {
      flexBasis: '50%', // 2 thumbnails per row on small screens
    },
  },
}));

const GalleryPage = () => {
  const location = useLocation();
  const galleryData = location.state?.galleryData || [];
  const [selectedImage, setSelectedImage] = useState(
    galleryData.length > 0 ? galleryData[0].image : ''
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh', // Full viewport height
      }}
    >
      {/* Header */}
      <Header2 />

      {/* Space between Header and Heading */}
      <Box sx={{ height: '40px' }} /> {/* Adjust height as needed */}

      {/* Main Content */}
      <SectionWrapper>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            marginBottom: '20px',
            textAlign: 'left', // Align heading to the left
          }}
        >
          GALLERY
        </Typography>

        <ContentWrapper>
          {/* Left Panel */}
          <LeftPanel>
            <img src={selectedImage} alt="Selected" />
          </LeftPanel>

          {/* Right Panel */}
          <RightPanel>
            <ThumbnailGrid container spacing={1}>
              {galleryData.map((item, index) => (
                <Grid item xs={6} sm={4} md={6} key={index}>
                  <img
                    src={item.image}
                    alt={item.title || 'Gallery Image'}
                    onClick={() => setSelectedImage(item.image)}
                  />
                </Grid>
              ))}
            </ThumbnailGrid>
          </RightPanel>
        </ContentWrapper>
      </SectionWrapper>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default GalleryPage;