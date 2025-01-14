import React from 'react';
import Header from '../components/Header';
import VideoSection from '../components/Home/Video';
import DestinationCarousel from '../components/Home/Destinations';
import TrendingSection from '../components/Home/TrendingSection';
import TrendingCollections from '../components/Home/Collections';
import Carousel from '../components/Home/Carousal';
import OffersSection from '../components/Home/Offers';
import BestRated from '../components/Home/BestRated';
import Footer from '../components/Footer';
import Youtube from '../components/Home/YoutubeVideo';
import TestimonialSection from '../components/Home/Testimonials';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';  // Import WhatsApp Icon
import { IconButton } from '@mui/material';  // Import IconButton for styling
import SearchBar from '../components/Home/Search';
import LocationsSection from '../components/Home/Aboutus';

function Home() {
  const whatsappNumber = '+919656916098'; // Replace with your WhatsApp number

  const handleClick = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div>
        <Header />
        <div><VideoSection /></div>
        <div><LocationsSection></LocationsSection></div>
        {/* <div><DestinationCarousel /></div> */}
        {/* <div><SearchBar></SearchBar></div> */}
        <div><TrendingSection /></div>
        <div><Carousel /></div>
        <div><TrendingCollections /></div>
        {/* <div><BestRated /></div> */}
        <div><Carousel /></div>
        <div><Youtube /></div>
        {/* <div><OffersSection /></div> */}
        {/* <div><CelebrityCarousel /></div> */}
        <div><TestimonialSection /></div>
        <Footer />

        {/* WhatsApp Icon Floating */}
        <IconButton
          onClick={handleClick}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#25D366',  // WhatsApp green color
            color: 'white',
            borderRadius: '50%',
            padding: '16px', // Increase padding to increase icon size
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            fontSize: '32px', // Increase the size of the icon
            transition: 'all 0.3s ease',  // Smooth transition for hover effect
          }}
          // Hover effect
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.2)';  // Increase size on hover
            e.target.style.backgroundColor = '#128C7E';  // Change color on hover
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';  // Reset size on hover out
            e.target.style.backgroundColor = '#25D366';  // Reset color on hover out
          }}
        >
          <WhatsAppIcon />
        </IconButton>
    </div>
  );
}

export default Home;
