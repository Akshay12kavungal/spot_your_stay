import React, { useState, useEffect } from 'react';
import { Box, Typography, Link, Grid, CircularProgress, Divider } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const capitalizeWords = (str) => {
    return str
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  const footerData = [
    {
      title: 'Exclusive Stays',
      links: loading
        ? ['Loading...']
        : error
        ? ['Failed to load']
        : properties.map((property) => capitalizeWords(property.name)),
    },
    {
      title: 'Top Collections',
      links: ['Luxury Villas', 'Pet-Friendly Villas', 'Trending This Season'],
    },
    {
      title: 'Support',
      links: ['Contact Us', 'Cancellation & Refund Policy'],
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#222', color: 'white', padding: { xs: 6, md: 8 } }}>
      <Grid container spacing={6} sx={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
        <Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>
          <FooterSection section={footerData[0]} />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>
          <FooterSection section={footerData[1]} />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ textAlign: 'left' }}>
          <FooterSection section={footerData[2]} />
        </Grid>
      </Grid>

      <Divider sx={{ backgroundColor: '#444', marginY: 4 }} />

      <Typography variant="body2" align="center" sx={{ opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} Spot Your Stay. All rights reserved.
      </Typography>
    </Box>
  );
};

const FooterSection = ({ section }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 2 }}>
      {section.title}
    </Typography>

    {section.links.map((link, i) => (
      <Typography key={i} variant="body2" sx={{ opacity: 0.8 }}>
        <Link href="#" underline="none" color="inherit" sx={{ transition: '0.3s', '&:hover': { color: '#ddd' } }}>
          {link}
        </Link>
      </Typography>
    ))}
  </Box>
);

export default Footer;
