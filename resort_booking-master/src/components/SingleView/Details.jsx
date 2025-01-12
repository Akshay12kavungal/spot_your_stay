import React from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PoolIcon from "@mui/icons-material/Pool";
import WifiIcon from "@mui/icons-material/Wifi";
import NatureIcon from "@mui/icons-material/Nature";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import PeopleIcon from '@mui/icons-material/People';
import HotelIcon from '@mui/icons-material/Hotel';
import BathtubIcon from '@mui/icons-material/Bathtub';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import InfoIcon from '@mui/icons-material/Info';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


const VillaDetailsSection = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Title Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Theeram
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kerala
          </Typography>
          <Typography variant="body2" color="text.secondary">
            15 Reviews
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          sx={{
            backgroundColor: "#f5c518",
            padding: "4px 8px",
            borderRadius: "4px",
            fontWeight: "bold",
          }}
        >
          Exclusive Getaway
        </Typography>
      </Box>
{/* Overview Section */}
<Box mb={2} display="flex" justifyContent="flex-start" alignItems="center" flexWrap="wrap" gap={2}>
  <Box display="flex" alignItems="center" px={2} py={1} bgcolor="#F3F8FF" borderRadius={2}>
    <PeopleIcon fontSize="small" style={{ marginRight: '8px' }} />
    <Typography variant="body2" fontWeight="bold">Up to 15 Guests</Typography>
  </Box>
  <Box display="flex" alignItems="center" px={2} py={1} bgcolor="#F3F8FF" borderRadius={2}>
    <HotelIcon fontSize="small" style={{ marginRight: '8px' }} />
    <Typography variant="body2" fontWeight="bold">3 - 6 Rooms</Typography>
    <InfoIcon fontSize="small" color="info" style={{ marginLeft: '4px' }} />
  </Box>
  <Box display="flex" alignItems="center" px={2} py={1} bgcolor="#F3F8FF" borderRadius={2}>
    <BathtubIcon fontSize="small" style={{ marginRight: '8px' }} />
    <Typography variant="body2" fontWeight="bold">6 Baths</Typography>
  </Box>
  <Box display="flex" alignItems="center" px={2} py={1} bgcolor="#F3F8FF" borderRadius={2}>
    <RoomServiceIcon fontSize="small" style={{ marginRight: '8px' }} />
    <Typography variant="body2" fontWeight="bold">Meals Available</Typography>
  </Box>
  <Box display="flex" alignItems="center" px={2} py={1} borderRadius={2} border="1px solid #FFCDD2">
    <PictureAsPdfIcon fontSize="small" style={{ color: '#F44336', marginRight: '8px' }} />
    <Typography variant="body2" fontWeight="bold" color="#F44336">View Brochure</Typography>
  </Box>
</Box>


      {/* View Brochure Button */}
      <Box mb={2}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#f5c518",
            color: "#f5c518",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          View Brochure
        </Button>
      </Box>

      {/* Great For Section */}
      <Box mb={2}>
        <Typography variant="body1" fontWeight="bold">
          Great for:
        </Typography>
        <Box display="flex" gap={2} mt={1}>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#eceff1",
              padding: "4px 8px",
              borderRadius: "16px",
            }}
          >
            Food
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#eceff1",
              padding: "4px 8px",
              borderRadius: "16px",
            }}
          >
            Design
          </Typography>
        </Box>
      </Box>

      {/* Amenities Section */}
      <Box>
        <Typography variant="body1" fontWeight="bold">
          Amenities:
        </Typography>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={6} md={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <PoolIcon />
              <Typography variant="body2">Swimming Pool</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <NatureIcon />
              <Typography variant="body2">Lawn</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <WifiIcon />
              <Typography variant="body2">WiFi</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <LocalBarIcon />
              <Typography variant="body2">Bar</Typography>
            </Box>
          </Grid>
          <Grid item xs={6} md={3}>
            <Box display="flex" alignItems="center" gap={1}>
              <RestaurantMenuIcon />
              <Typography variant="body2">Alfresco Dining</Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="primary" sx={{ cursor: "pointer" }}>
              +21 Amenities
            </Typography>
          </Grid>
        </Grid>
      </Box>

     

      {/* Description Section */}
      <Box mt={2}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Pranaam - Villa in Alibaug
        </Typography>
        <Typography variant="body2" color="text.secondary">
          With a beautiful modern exterior and luxurious interiors, Pranaam Villa is the
          epitome of a holiday retreat. Located only a few hours away from the city, barely
          10 minutes from Mandwa Jetty, this sprawling property is ideal to spend time with
          your loved ones. Along with cozy outdoor sit-outs for you to enjoy spending time
          with your friends and family, this villa is also equipped with an open-to-sky
          shamiana and a private pool. The gorgeous lawn also offers several slides, swings,
          and a trampoline to keep your little ones occupied!
        </Typography>
      </Box>

      {/* Footer Buttons */}
      <Box mt={2} display="flex" gap={2} justifyContent="center">
        <Button variant="outlined" sx={{ textTransform: "none", fontWeight: "bold" }}>
          Explore Your Stay
        </Button>
        <Button variant="outlined" sx={{ textTransform: "none", fontWeight: "bold" }}>
          Home Rules and Truths
        </Button>
        <Button variant="outlined" sx={{ textTransform: "none", fontWeight: "bold" }}>
          Booking & Cancellation Policy
        </Button>
        <Button variant="outlined" sx={{ textTransform: "none", fontWeight: "bold" }}>
          FAQ's
        </Button>
      </Box>
    </Box>
  );
};

export default VillaDetailsSection;
