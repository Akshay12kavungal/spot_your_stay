import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Modal,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate, useParams } from "react-router-dom";

// Styled components
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

const LuxuryButton = styled(Button)({
  backgroundColor: "#000", // Black background
  color: "#a89160", // Golden text color
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#333", // Darker black on hover
  },
});

const Title = styled(Box)({
  fontSize: "24px",
  fontWeight: "600",
  marginBottom: "40px",
  textTransform: "uppercase",
  letterSpacing: "1px",
});

// Modal style
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: "center",
};

const SearchBar = () => {
  const { id } = useParams(); // Get Property ID from URL
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dateError, setDateError] = useState("");
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [modalContent, setModalContent] = useState(""); // State for modal content
  const [showLoginButton, setShowLoginButton] = useState(false); // State to show/hide login button

  // Get today's date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get the next day's date in YYYY-MM-DD format
  const getNextDayDate = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    const year = nextDay.getFullYear();
    const month = String(nextDay.getMonth() + 1).padStart(2, "0");
    const day = String(nextDay.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Fetch property details
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

  // Set default check-in and check-out dates
  useEffect(() => {
    const today = getCurrentDate();
    setStartDate(today);
    setEndDate(getNextDayDate(today));
  }, []);

  // Fetch existing bookings for the property
  const fetchExistingBookings = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/bookings/?property=${id}`, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching existing bookings:", error.response?.data || error);
    }
    return [];
  };

  // Check if the selected date range is available
  const isDateRangeAvailable = (startDate, endDate, existingBookings) => {
    const selectedStart = new Date(startDate);
    const selectedEnd = new Date(endDate);

    for (const booking of existingBookings) {
      const bookingStart = new Date(booking.check_in);
      const bookingEnd = new Date(booking.check_out);

      if (
        (selectedStart >= bookingStart && selectedStart < bookingEnd) ||
        (selectedEnd > bookingStart && selectedEnd <= bookingEnd) ||
        (selectedStart <= bookingStart && selectedEnd >= bookingEnd)
      ) {
        return false; // Overlap found
      }
    }
    return true; // No overlap
  };

  // Fetch user ID from the backend
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

  // Handle guests input change
  const handleGuestsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (propertyDetails && value > propertyDetails.guests) {
      setGuests(propertyDetails.guests); // Restrict guests to max allowed
    } else {
      setGuests(value);
    }
  };

  // Handle booking submission
  const handleBooking = async () => {
    try {
      const user = await fetchUserId();
      if (!user) {
        setModalContent("You must be logged in to book this property. Please log in to continue.");
        setShowLoginButton(true); // Show login button
        setModalOpen(true); // Open the modal
        return;
      }

      const existingBookings = await fetchExistingBookings();
      const isAvailable = isDateRangeAvailable(startDate, endDate, existingBookings);

      if (!isAvailable) {
        setModalContent("The selected dates are not available. Please choose different dates.");
        setShowLoginButton(false); // Hide login button
        setModalOpen(true); // Open the modal
        return;
      }

      setDateError(""); // Clear any previous error

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

  // Redirect to login page
  const handleLoginRedirect = () => {
    navigate("/login"); // Redirect to the login page
  };

  // Show loading spinner while fetching data
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
          onChange={(e) => {
            setStartDate(e.target.value);
            setEndDate(getNextDayDate(e.target.value)); // Update check-out date
          }}
          inputProps={{
            min: getCurrentDate(), // Block previous dates
          }}
        />
        <TextField
          label="Check-out"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          inputProps={{
            min: getNextDayDate(startDate), // Block dates before check-in
          }}
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

      {/* Modal for displaying errors */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            {showLoginButton ? "Login Required" : "Booking Error"}
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
          <LuxuryButton
            variant="contained"
            onClick={() => setModalOpen(false)}
            sx={{ mt: 3 }}
          >
            Close
          </LuxuryButton>
        </Box>
      </Modal>

      {error && <Typography color="error">{error}</Typography>}
    </SearchContainer>
  );
};

export default SearchBar;