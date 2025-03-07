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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
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
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handleCancelClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setOpenCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedBookingId) return;

    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/bookings/${selectedBookingId}/cancel/`,
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
            booking.id === selectedBookingId ? { ...booking, status: "Cancelled" } : booking
          )
        );
      }
    } catch (error) {
      alert("Failed to cancel booking. Please try again.");
    } finally {
      setOpenCancelDialog(false);
      setSelectedBookingId(null);
    }
  };

  const handleCancelClose = () => {
    setOpenCancelDialog(false);
    setSelectedBookingId(null);
  };

  return (
    <div>
      <Header />

      <Box sx={{ padding: isMobile ? 2 : 4, textAlign: "center", maxWidth: "1100px", margin: "auto", mt: 10 }}>
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
          <TableContainer component={Paper} sx={{ marginTop: 3, boxShadow: 3, borderRadius: 2, overflowX: "auto" }}>
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
                            onClick={() => handleCancelClick(booking.id)}
                            sx={{ fontSize: isMobile ? "10px" : "12px", padding: isMobile ? "4px 8px" : "6px 12px", borderRadius: "6px" }}
                          >
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center" sx={{ padding: "20px", color: "#777" }}>
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

      {/* Cancellation Policy Dialog */}
      <Dialog
        open={openCancelDialog}
        onClose={handleCancelClose}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: isMobile ? "8px" : "16px",
            maxWidth: isMobile ? "90%" : "500px",
            width: "100%",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontSize: isMobile ? "1.2rem" : "1.5rem",
            fontWeight: "bold",
            color: "#333",
            textAlign: "center",
            padding: "16px 0",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          Cancellation Policy
        </DialogTitle>
        <DialogContent sx={{ padding: isMobile ? "16px 8px" : "24px 16px" }}>
          <Typography variant="body1" gutterBottom sx={{ color: "#555", lineHeight: "1.6" }}>
            Kindly note our cancellation policy:
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
            padding: isMobile ? "8px" : "16px",
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Button
            onClick={handleCancelClose}
            variant="outlined"
            sx={{
              color: "#333",
              borderColor: "#333",
              borderRadius: "8px",
              padding: isMobile ? "4px 12px" : "8px 24px",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                borderColor: "#333",
              },
            }}
          >
            No, Go Back
          </Button>
          <Button
            onClick={handleCancelConfirm}
            variant="contained"
            color="error"
            sx={{
              borderRadius: "8px",
              padding: isMobile ? "4px 12px" : "8px 24px",
              backgroundColor: "#d32f2f",
              "&:hover": {
                backgroundColor: "#b71c1c",
              },
            }}
          >
            Yes, Cancel Booking
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Bookings;