import React, { useState } from "react";
import { Modal, Box, Typography, TextField, IconButton, Alert, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { styled } from "@mui/material/styles";

// Styled Luxury Button
const LuxuryButton = styled(Button)({
  backgroundColor: "#000", // Black background
  color: "#a89160", // Golden text color
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#333", // Darker black on hover
  },
});

const ContactForm = ({ open, handleClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/reviews/contactus/",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Reset form
        setTimeout(() => {
          setSuccessMessage("");
          handleClose(); // Close modal after success
        }, 2000);
      }
    } catch (error) {
      setErrorMessage("Failed to send message. Please try again.");
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        {/* Close Button */}
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8 }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Contact Us
        </Typography>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {successMessage}
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMessage}
          </Alert>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />
          <LuxuryButton
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Submitting..." : "Send Message"}
          </LuxuryButton>
        </form>
      </Box>
    </Modal>
  );
};

export default ContactForm;
