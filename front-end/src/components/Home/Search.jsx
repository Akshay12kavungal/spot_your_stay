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
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1); // Using local state for guests
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

  const userId = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}` // Include the token for authentication
        },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        // Dynamically find the logged-in user based on the token/session
        const currentUser = response.data.find((user) => {
          return user.user.email === localStorage.getItem("current_user_email"); // Match the email or any unique field
        });
        return currentUser ? currentUser.user.id : null; // Return current user's ID if found
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
      return null;
    }
  };
  

  const handleBooking = async () => {
    
    try {

        const user = await userId();
        if (!user) {
          alert("User not found. Please log in again.");
          return;
        }
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings/", // Ensure this matches your Django URLs
        {
          property: id,
            user,  // Manually setting user ID for testing
          check_in: startDate,  // Ensure field names match your model
          check_out: endDate,
          guests,
          status: "bookings",
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
  
      if (response.status === 201) {
        navigate(`/checkout?property=${id}&checkin=${startDate}&checkout=${endDate}&guests=${guests}`);
      } else {
        alert("Booking failed! Please try again.");
      }
    } catch (error) {
      console.error("Booking Error:", error.response?.data);
      alert(`Error: ${JSON.stringify(error.response?.data) || "Could not create booking."}`);
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
      <Title>Book Your Stay</Title>
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
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          label="Check-out"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <TextField
          label="Guests"
          type="number"
          fullWidth
          value={propertyDetails ? propertyDetails.guests : ""} // Now using local state, not propertyDetails
          onChange={(e) => setGuests(e.target.value)}
        />
        <SearchButton onClick={handleBooking} variant="contained">
          Book Now
        </SearchButton>
      </InputGroup>
      {error && <Typography color="error">{error}</Typography>}
    </SearchContainer>
  );
};

export default SearchBar;
