import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Divider,
  Checkbox,
  Tooltip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import Header2 from "../components/Header2";
import Footer from "../components/Footer";

const CheckoutPage = () => {
  return (
    <div>
        <Header2></Header2>
        <Box sx={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" ,marginTop:"80px"}}>
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid item xs={12} md={8}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Pranaam
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    Alibaug, Maharashtra
                  </Typography>
    
                  <Divider sx={{ marginY: 2 }} />
    
                  <Grid container spacing={2}>
                    {/* Check-In & Check-Out */}
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <CalendarTodayIcon fontSize="small" sx={{ marginRight: 1 }} />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Check-In
                          </Typography>
                          <Typography variant="body1">Sat 23 Nov 2024</Typography>
                          <Typography variant="caption">(From 02:00 PM)</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" alignItems="center">
                        <CalendarTodayIcon fontSize="small" sx={{ marginRight: 1 }} />
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            Check-Out
                          </Typography>
                          <Typography variant="body1">Sat 30 Nov 2024</Typography>
                          <Typography variant="caption">(Until 11:00 AM)</Typography>
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
                          <Typography variant="body1">2 Guests (2 Adults)</Typography>
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <Typography variant="body2" color="textSecondary">
                          No. of Rooms
                        </Typography>
                        <Typography variant="body1">6 Rooms | 6 Baths</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
    
              {/* Meals Section */}
              <Card variant="outlined" sx={{ marginTop: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Meals
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Indulge in an all-day meal package of freshly prepared vegetarian
                    and non-vegetarian home-cooked local specialties.
                  </Typography>
    
                  {/* Meal Options */}
                  <Box display="flex" gap={2} flexWrap="wrap">
                    <Button variant="outlined" size="small" color="success">
                      Veg Menu
                    </Button>
                    <Button variant="outlined" size="small" color="error">
                      Mix Menu
                    </Button>
                    <Button variant="outlined" size="small">
                      View More
                    </Button>
                  </Box>
    
                  {/* Pre-book Meals */}
                  <Box
                    sx={{
                      backgroundColor: "#FFECD1",
                      padding: 2,
                      marginTop: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: 1,
                    }}
                  >
                    <Tooltip title="Pre-book your meals to ensure availability">
                      <Typography variant="body2">Pre-book your meals</Typography>
                    </Tooltip>
                    <Checkbox />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
    
            {/* Right Section */}
            <Grid item xs={12} md={4}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">Price Details</Typography>
                  <Divider sx={{ marginY: 2 }} />
    
                  {/* Pricing Breakdown */}
                  <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Typography>Rental Charges</Typography>
                    <Typography>₹4,87,100</Typography>
                  </Box>
                  <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Typography>GST (As per government guidelines)</Typography>
                    <Typography>₹87,678</Typography>
                  </Box>
    
                  {/* Coupon Section */}
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Apply Coupon Code"
                    InputProps={{
                      endAdornment: (
                        <Button size="small" variant="text" sx={{ textTransform: "none" }}>
                          Apply
                        </Button>
                      ),
                    }}
                    sx={{ marginBottom: 2 }}
                  />
    
                  <Divider sx={{ marginY: 2 }} />
    
                  {/* Total Payable */}
                  <Box display="flex" justifyContent="space-between" marginBottom={2}>
                    <Typography variant="h6">Total Payable</Typography>
                    <Typography variant="h6">₹5,74,778</Typography>
                  </Box>
    
                  {/* Terms & Continue */}
                  <Typography variant="caption" color="textSecondary" display="block">
                    I have read and accepted the Terms & Conditions, Privacy Policies,
                    Cancellation Policy, and Indemnity Form.
                  </Typography>
    
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ marginTop: 2, textTransform: "none" }}
                  >
                    Continue
                  </Button>
                </CardContent>
              </Card>
    
              {/* Secure Payment Section */}
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  marginTop: 2,
                  padding: 2,
                  backgroundColor: "#f3f3f3",
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" color="success">
                  100% Secure Payment
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Footer></Footer>
    </div>
  );
};

export default CheckoutPage;
