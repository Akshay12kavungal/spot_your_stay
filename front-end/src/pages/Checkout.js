import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLocation } from "react-router-dom";
import Header2 from "../components/Header2";
import PeopleIcon from "@mui/icons-material/People";
import HotelIcon from "@mui/icons-material/Hotel"; // Import Room Icon
import Footer from "../components/Footer";
import axios from "axios";

const CheckoutPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const propertyId = params.get("property");
  const checkIn = params.get("checkin");
  const checkOut = params.get("checkout");

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPropertyDetails = async () => {
      if (!propertyId) {
        setError("Invalid property ID");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/properties/${propertyId}/`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          console.log("Fetched Property Details:", response.data);
          setProperty(response.data);
        } else {
          setError("Property details not available.");
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError("Failed to fetch property details.");
      } finally {
        setLoading(false);
      }
    };

    getPropertyDetails();
  }, [propertyId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <Header2 />
      <Box sx={{ padding: "24px", maxWidth: "1200px", margin: "0 auto", marginTop: "80px" }}>
        <Grid container spacing={4}>
          {/* Property Details */}
          <Grid item xs={12} md={8}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {property?.name || "Property Not Found"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {property?.address || "Unknown Location"}
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <CalendarTodayIcon fontSize="small" sx={{ marginRight: 1 }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Check-In</Typography>
                        <Typography variant="body1">{checkIn || "--"}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <CalendarTodayIcon fontSize="small" sx={{ marginRight: 1 }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Check-Out</Typography>
                        <Typography variant="body1">{checkOut || "--"}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  
                 
                  
                    {/* Guests & Rooms */}
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <PeopleIcon fontSize="small" sx={{ marginRight: 1 }} />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Guests
                          </Typography>
                          <Typography variant="body1"> {property?.guests || "Not specified"} Guests </Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                    <HotelIcon fontSize="small" sx={{ marginRight: 1 }} /> {/* Room Icon */}
                        <Box>
                        <Typography variant="body2" color="textSecondary">
                          No. of Rooms
                        </Typography>
                        <Typography variant="body1"> {property?.rooms || "Not specified"}  Rooms </Typography>
                      </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
    
          {/* Price Details Section */}
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">Price Details</Typography>
                <Divider sx={{ marginY: 2 }} />
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                  <Typography>Rental Charges</Typography>
                  <Typography>₹4,87,100</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                  <Typography>GST</Typography>
                  <Typography>₹87,678</Typography>
                </Box>
                <Divider sx={{ marginY: 2 }} />
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                  <Typography variant="h6">Total Payable</Typography>
                  <Typography variant="h6">₹5,74,778</Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth>
                  Continue
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
