import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

const SearchContainer = styled(Box)({
  display: "flex",
  maxWidth: "1200px",
  flexDirection: "column",
  margin: "0 auto",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 8,
  padding: "16px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const InputGroup = styled(Box)({
  display: "flex",
  width: "100%",
  gap: "16px",
  marginBottom: "16px",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    gap: "8px",
  },
});

const SearchButton = styled(Button)({
  backgroundColor: "#000",
  color: "#fff",
  minWidth: "120px",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const Title = styled(Box)({
  fontSize: "24px",
  fontWeight: "600",
  marginBottom: "40px",
  textTransform: "uppercase",
  letterSpacing: "1px",
});

const SearchBar = () => {
  const { id } = useParams(); // Get Property ID from URL
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/properties/${id}/`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });

        if (response.status === 200) {
          setPropertyDetails(response.data);
        } else {
          setError("Property not found.");
        }
      } catch (error) {
        setError("Invalid Property ID. Please check the URL.");
        setPropertyDetails(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  const handleBooking = async () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in/check-out dates.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings/",
        {
          property: id,
          user: 1,
          check_in: checkIn,
          check_out: checkOut,
          // total_amount: 5000, // Set total dynamically if needed
          status: "bookings",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      if (response.status === 201) {
        navigate(`/checkout?property=${id}&checkin=${checkIn}&checkout=${checkOut}`);
      } else {
        alert("Booking failed! Please try again.");
      }
    } catch (error) {
      console.error("Booking Error:", error.response?.data);
      alert("Error: Could not create booking.");
    }
  };
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <SearchContainer>
      <Title>Pick a Destination</Title>
      <InputGroup>
        <TextField
          label="Property Name"
          fullWidth
          value={propertyDetails ? propertyDetails.name : ""}
          disabled
        />
        <TextField
          label="Check-in"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
        <TextField
          label="Check-out"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
        <SearchButton onClick={handleBooking} variant="contained">
          Book Now
        </SearchButton>
      </InputGroup>
    </SearchContainer>
  );
};

export default SearchBar;
