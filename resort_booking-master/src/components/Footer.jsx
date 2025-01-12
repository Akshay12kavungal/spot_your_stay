import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

const footerData = [
  {
    title: 'Top Locations',
    links: [
      'Lonavala',
      'Goa',
      'Alibaug',
      'Karjat',
      'Igatpuri',
      'Mahabaleshwar',
      'Mumbai',
      'Kasauli',
      'Mussoorie',
      'Ooty',
      '+ 5 more',
    ],
  },
  {
    title: 'Top Collections',
    links: [
      'Luxury Villas',
      'Trending This Season',
      'Festive Favourites Villas',
      'Heated-Pool Collection',
      'Pet-Friendly Villas',
      'Impeccable View Villas',
      'Corporate Offsite Villas',
      'Kid-Friendly Villas',
      'Getaway Collections',
      'Handpicked Villas',
      '+ 3 more',
    ],
  },
  {
    title: 'About',
    links: [
      'Our Story',
      'Partner With Us',
      'Offers',
      'Corporate Offsites',
      'Events & Experiences',
      'FAQs',
      'Gift Card',
      'Blog',
      'Careers',
      'Covid Policy',
      '+ 2 more',
    ],
  },
  {
    title: 'Support',
    links: ['Contact Us', 'Cancellation & Refund Policy'],
  },
];

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#333', color: 'white', padding: 4 }}>
      <Grid container spacing={4}>
        {footerData.map((section, index) => (
          <Grid item xs={6} sm={6} md={3} key={index}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
              {section.title}
            </Typography>
            {section.links.map((link, i) => (
              <Typography key={i} variant="body2" sx={{ marginBottom: 1 }}>
                <Link href="#" underline="hover" color="inherit">
                  {link}
                </Link>
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Footer;
