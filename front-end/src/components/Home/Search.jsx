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
  const [guests, setGuests] = useState(1);
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
          setGuests(response.data.guests || 1); // Set guests dynamically from API
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

  const fetchUserId = async () => {
    try {
      const username = localStorage.getItem("username");
      if (!username) {
        console.error("Username not found in local storage.");
        return null;
      }

      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/profile/${username}/`, 
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        return response.data.user.id; 
      }
    } catch (error) {
      console.error("Error fetching user ID:", error.response?.data || error);
    }
    return null;
  };

  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (propertyDetails && value > propertyDetails.guests) {
      setGuests(propertyDetails.guests); // Restrict guests to max allowed
    } else {
      setGuests(value);
    }
  };

  const handleBooking = async () => {
    try {
      const user = await fetchUserId();
      if (!user) {
        alert("User not found. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookings/",
        {
          property: id,
          user: user,  
          check_in: startDate,  
          check_out: endDate,
          guests,
          status: "bookings",
        },
        {
          headers: { "Content-Type": "application/json" },
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
          label={`Guests (Max: ${propertyDetails?.guests || 1})`}
          type="number"
          fullWidth
          value={guests} 
          onChange={handleGuestsChange}
          inputProps={{
            min: 1,
            max: propertyDetails?.guests || 1,
          }}
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
