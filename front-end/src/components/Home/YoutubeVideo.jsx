import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { YouTube } from '@mui/icons-material';
import { styled } from 'styled-components';


const videos = [
  {
    title: 'Resort Overview',
    videoUrl: 'https://www.youtube.com/embed/your_video_id',
    thumbnail: 'https://img.youtube.com/vi/your_video_id/0.jpg',
  },
  {
    title: 'Luxury Room Tour',
    videoUrl: 'https://www.youtube.com/embed/your_video_id',
    thumbnail: 'https://img.youtube.com/vi/your_video_id/0.jpg',
  },
  {
    title: 'Spa and Wellness',
    videoUrl: 'https://www.youtube.com/embed/your_video_id',
    thumbnail: 'https://img.youtube.com/vi/your_video_id/0.jpg',
  },
  {
    title: 'Dining Experience',
    videoUrl: 'https://www.youtube.com/embed/your_video_id',
    thumbnail: 'https://img.youtube.com/vi/your_video_id/0.jpg',
  },
];
const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Youtube = () => {
  return (
    <Box sx={{ padding: 4, textAlign: 'center' }}>
       <Title>Explore Our Spot Through Videos</Title>
      <Grid container spacing={3} justifyContent="center">
        {videos.map((video, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box
              sx={{
                position: 'relative',
                cursor: 'pointer',
                '&:hover .play-button': {
                  display: 'block',
                },
              }}
            >
              <iframe
                width="100%"
                height="200"
                src={video.videoUrl}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <Box
                className="play-button"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'none',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  padding: '10px',
                  borderRadius: '50%',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  },
                }}
              >
                <YouTube sx={{ color: 'white', fontSize: 40 }} />
              </Box>
            </Box>
            <Typography variant="subtitle1" sx={{ marginTop: 2 }}>
              {video.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        
        sx={{
            textTransform: 'none',
            backgroundColor: 'black',
            marginTop:"20px",
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        href="/videos"
      >
        View All Videos
      </Button>
    </Box>
  );
};

export default Youtube;
