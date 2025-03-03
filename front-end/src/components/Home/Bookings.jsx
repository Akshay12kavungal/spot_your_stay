import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Alert,
  Button,
} from "@mui/material";
import { styled } from "@mui/system";
import Header from "../Header2";
import Footer from "../Footer";

// Styled components for improved styling
const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
  color: "#333",
  padding: "12px",
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#fafafa",
  },
  "&:hover": {
    backgroundColor: "#f0f0f0",
    transition: "0.3s",
  },
}));

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError("");

      try {
        const username = localStorage.getItem("username");
        if (!username) throw new Error("User not logged in.");

        const userResponse = await axios.get(
          `http://127.0.0.1:8000/api/users/profile/${username}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        const userId = userResponse.data?.user?.id;
        if (!userId) throw new Error("User ID not found in response.");

        const bookingsResponse = await axios.get(
          `http://127.0.0.1:8000/api/bookings/?user=${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );

        if (bookingsResponse.status === 200 && Array.isArray(bookingsResponse.data)) {
          const bookingsWithProperty = await Promise.all(
            bookingsResponse.data.map(async (booking) => {
              const propertyResponse = await axios.get(
                `http://127.0.0.1:8000/api/properties/${booking.property}/`
              );
              return {
                ...booking,
                propertyName: propertyResponse.data.name,
              };
            })
          );

          setBookings(bookingsWithProperty);
        } else {
          setError("No bookings found.");
        }
      } catch (error) {
        setError(error.message || "An error occurred while fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/bookings/${bookingId}/cancel/`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      if (response.status === 200) {
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status: "Cancelled" } : booking
          )
        );
      }
    } catch (error) {
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div>
      <Header />

      <Box sx={{ padding: 4, textAlign: "center", maxWidth: "1100px", margin: "auto", mt: 10 }}>
        <Typography variant="h5" color="textSecondary" paragraph>
          View and manage your upcoming and past bookings.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <TableContainer component={Paper} sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Property</StyledTableCell>
                  <StyledTableCell>Check-in</StyledTableCell>
                  <StyledTableCell>Check-out</StyledTableCell>
                  <StyledTableCell>Guests</StyledTableCell>
                  <StyledTableCell>Total Price</StyledTableCell>
                  <StyledTableCell>Advance</StyledTableCell>
                  <StyledTableCell>Balance Amount</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell>Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <StyledTableRow key={booking.id}>
                      <TableCell>{booking.propertyName}</TableCell>
                      <TableCell>{new Date(booking.check_in).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(booking.check_out).toLocaleDateString()}</TableCell>
                      <TableCell>{booking.guests}</TableCell>
                      <TableCell>{booking.total_amount}</TableCell>
                      <TableCell>{booking.advance_amount}</TableCell>
                      <TableCell>{booking.balance_amount}</TableCell>
                      <TableCell>{booking.status}</TableCell>
                      <TableCell>
                        {booking.status !== "Cancelled" && (
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleCancel(booking.id)}
                            sx={{ fontSize: "12px", padding: "6px 12px", borderRadius: "6px" }}
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ padding: "20px", color: "#777" }}>
                      No bookings found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ marginTop: 4 }}>
          <Button variant="contained" href="/profile" sx={{ backgroundColor: "#000", color: "#a89160" }}>
            Go to Profile
          </Button>
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

export default Bookings;
