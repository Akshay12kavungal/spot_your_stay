import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import axios from "axios";
import { Grid } from "@mui/material";
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

const VillaDetailsSection = ({ propertyId }) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPolicyModal, setOpenPolicyModal] = useState(false); // State for the dialog

  // Handler to open the dialog
  const handleOpenPolicyModal = () => {
    setOpenPolicyModal(true);
  };

  // Handler to close the dialog
  const handleClosePolicyModal = () => {
    setOpenPolicyModal(false);
  };

  useEffect(() => {
    const getPropertyDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/properties/${propertyId}/`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          setProperty(response.data);
        } else {
          console.error("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching property details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      getPropertyDetails();
    }
  }, [propertyId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!property) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="text.secondary">
          Property details not available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      {/* Title Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            {property.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {property.property_type}
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
          Price: {property.price}
        </Typography>
      </Box>

      {/* Overview Section */}
      <Box mb={2} display="flex" justifyContent="flex-start" alignItems="center" flexWrap="wrap" gap={2}>
        <Box display="flex" alignItems="center" px={2} py={1} bgcolor="#F3F8FF" borderRadius={2}>
          <PeopleIcon fontSize="small" style={{ marginRight: '8px' }} />
          <Typography variant="body2" fontWeight="bold">{property.guests} Guests</Typography>
        </Box>
        <Box display="flex" alignItems="center" px={2} py={1} bgcolor="#F3F8FF" borderRadius={2}>
          <HotelIcon fontSize="small" style={{ marginRight: '8px' }} />
          <Typography variant="body2" fontWeight="bold">{property.rooms} Rooms</Typography>
          <InfoIcon fontSize="small" color="info" style={{ marginLeft: '4px' }} />
        </Box>
        <Box display="flex" alignItems="center" px={2} py={1} bgcolor="#F3F8FF" borderRadius={2}>
          <BathtubIcon fontSize="small" style={{ marginRight: '8px' }} />
          <Typography variant="body2" fontWeight="bold">{property.bathrooms} Baths</Typography>
        </Box>
        <Box display="flex" alignItems="center" px={2} py={1} bgcolor="#F3F8FF" borderRadius={2}>
          <RoomServiceIcon fontSize="small" style={{ marginRight: '8px' }} />
          <Typography variant="body2" fontWeight="bold">{property.meals} Meals Available</Typography>
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
            Kid
          </Typography>
          <Typography
            variant="body2"
            sx={{
              backgroundColor: "#eceff1",
              padding: "4px 8px",
              borderRadius: "16px",
            }}
          >
            Family
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
          {property.name} - Villa in {property.address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.description}
        </Typography>
      </Box>

      {/* Footer Buttons */}
      <Box mt={2} display="flex" gap={2} justifyContent="center">
        <Button variant="outlined" sx={{ textTransform: "none", fontWeight: "bold" }}>
          Explore Your Stay
        </Button>
        <Button
          variant="outlined"
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            borderColor: "#d32f2f", // Red border
            color: "#d32f2f", // Red text
            "&:hover": {
              borderColor: "#b71c1c", // Darker red on hover
              color: "#b71c1c", // Darker red text on hover
            },
          }}
          onClick={handleOpenPolicyModal}
        >
          Booking & Cancellation Policy
        </Button>
        <Dialog
          open={openPolicyModal}
          onClose={handleClosePolicyModal}
          PaperProps={{
            sx: {
              borderRadius: "12px",
              padding: "16px",
              maxWidth: "500px",
              width: "100%",
              boxShadow: "0px 4px 20px rgba(180, 70, 70, 0.1)",
            },
          }}
        >
          <DialogTitle
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#333",
              textAlign: "center",
              padding: "16px 0",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            Booking & Cancellation Policy
          </DialogTitle>
          <DialogContent sx={{ padding: "24px 16px" }}>
            <Typography variant="body1" gutterBottom sx={{ color: "#555", lineHeight: "1.6" }}>
              Kindly note our cancellation and refund policy:
            </Typography>
            <Box
              component="ul"
              sx={{
                marginLeft: "24px",
                color: "#555",
                "& li": {
                  marginBottom: "8px",
                },
              }}
            >
              <li>
                Please inform us of any cancellations <strong>at least 7 days prior</strong> to your booking date.
              </li>
              <li>
                <strong>No refunds</strong> will be issued for cancellations made within 7 days of the booking date.
              </li>
              <li>
                Refunds, if applicable, will be processed within <strong>10 business days</strong>.
              </li>
            </Box>
            <Typography
              variant="body1"
              sx={{
                fontStyle: "italic",
                marginTop: "16px",
                color: "#555",
                textAlign: "center",
              }}
            >
              Your cooperation is appreciated. Thank you!
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: "center",
              padding: "16px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <Button
              onClick={handleClosePolicyModal}
              variant="contained"
              sx={{
                borderRadius: "8px",
                padding: "8px 24px",
                backgroundColor: "#d32f2f",
                "&:hover": {
                  backgroundColor: "#b71c1c",
                },
              }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Button variant="outlined" sx={{ textTransform: "none", fontWeight: "bold" }}>
          FAQ's
        </Button>
      </Box>
    </Box>
  );
};

export default VillaDetailsSection;