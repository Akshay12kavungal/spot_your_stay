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
import HotelIcon from "@mui/icons-material/Hotel";
import Footer from "../components/Footer";
import axios from "axios";

const CheckoutPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const propertyId = params.get("property");
  const checkIn = params.get("checkin");
  const checkOut = params.get("checkout");

  const [property, setProperty] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to calculate the number of days
  const calculateDays = (checkInDate, checkOutDate) => {
    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);
    if (isNaN(checkInDateObj.getTime()) || isNaN(checkOutDateObj.getTime())) {
      return 0;
    }
    const timeDifference = checkOutDateObj - checkInDateObj;
    return timeDifference / (1000 * 3600 * 24);
  };

  const calculateTotalPrice = () => {
    if (property && checkIn && checkOut) {
      const days = calculateDays(checkIn, checkOut);
      const rentalCharges = property.price ? property.price * days : 0;
      const gst = rentalCharges * 0.18;
      const totalPrice = rentalCharges + gst;
      return { rentalCharges, gst, totalPrice };
    }
    return { rentalCharges: 0, gst: 0, totalPrice: 0 };
  };

  const handlePayment = async () => {
    if (!property || !checkIn || !checkOut) {
      setError("Please ensure all payment details are filled.");
      return;
    }
  
    const { rentalCharges, gst, totalPrice } = calculateTotalPrice();
  
    try {
      // Check if booking is available
      const bookingId = booking?.id;
  
      // Send payment request to backend
      const paymentResponse = await axios.post(
        "http://127.0.0.1:8000/api/payments/", // Your payment endpoint
        {
          amount: totalPrice,
          payment_date: new Date().toISOString(), // Ensure the date format is correct
          payment_status: "completed", // Assuming the payment is successful
          booking: bookingId || null, // Add booking ID if available, otherwise null
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
  
      if (paymentResponse.status === 201) {
        alert("Payment successfully saved!");
        // Optionally, redirect to another page or reset the form
      } else {
        setError("Failed to process payment.");
      }
    } catch (err) {
      console.error("Error saving payment:", err);
      setError("Failed to save payment. Error: " + (err.response?.data?.detail || err.message));
    }
  };
  

  useEffect(() => {
    const fetchDetails = async () => {
      if (!propertyId) {
        setError("Invalid property ID");
        setLoading(false);
        return;
      }

      try {
        // Fetch property details
        const propertyResponse = await axios.get(
          `http://127.0.0.1:8000/api/properties/${propertyId}/`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        // Fetch booking details based on property and date range
        const bookingResponse = await axios.get(
          `http://127.0.0.1:8000/api/bookings/?property=${propertyId}&check_in=${checkIn}&check_out=${checkOut}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        if (propertyResponse.status === 200) {
          setProperty(propertyResponse.data);
        }

        if (bookingResponse.status === 200 && bookingResponse.data.length > 0) {
          setBooking(bookingResponse.data[0]); // Get the first matching booking
        } else {
          setError("No booking found for these dates.");
        }
      } catch (err) {
        console.error("Error fetching details:", err);
        setError("Failed to fetch details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [propertyId, checkIn, checkOut]);

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

  const { rentalCharges, gst, totalPrice } = calculateTotalPrice();
  const guests = booking ? booking.guests : "Not specified";

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
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <PeopleIcon fontSize="small" sx={{ marginRight: 1 }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">Guests</Typography>
                        <Typography variant="body1">{guests} Guests</Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box display="flex" alignItems="center">
                      <HotelIcon fontSize="small" sx={{ marginRight: 1 }} />
                      <Box>
                        <Typography variant="body2" color="textSecondary">No. of Rooms</Typography>
                        <Typography variant="body1">{property?.rooms || "Not specified"} Rooms</Typography>
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
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Price Details
                </Typography>
                <Divider sx={{ marginY: 2 }} />
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                  <Typography variant="body1">Rental Charges</Typography>
                  <Typography variant="body1">₹{rentalCharges.toLocaleString()}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                  <Typography variant="body1">GST (18%)</Typography>
                  <Typography variant="body1">₹{gst.toLocaleString()}</Typography>
                </Box>
                <Divider sx={{ marginY: 2 }} />
                <Box display="flex" justifyContent="space-between" marginBottom={2}>
                  <Typography variant="h6" fontWeight="bold">Total Payable</Typography>
                  <Typography variant="h6" fontWeight="bold">₹{totalPrice.toLocaleString()}</Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
                  Pay Now
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
