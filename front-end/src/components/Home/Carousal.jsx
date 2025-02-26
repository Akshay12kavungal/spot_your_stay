import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, TextField, Alert, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon

const slides = [
  {
    title: "Collaboration that's making waves",
    description: "Offering exceptional pawsome getaways in India, to discerning guests from all over the world.",
    logo1: '/path/to/logo1.png', // Replace with the actual logo path
    logo2: '/path/to/logo2.png', // Replace with the actual logo path
  },
  {
    title: "Adventure Awaits",
    description: "Discover unique destinations and create unforgettable memories in India.",
    logo1: '/path/to/logo1.png', // Replace with the actual logo path
    logo2: '/path/to/logo2.png', // Replace with the actual logo path
  },
  // Add more slide data as needed
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCollaborationModalOpen, setIsCollaborationModalOpen] = useState(false); // State for modal visibility
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' }); // Form data state
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [errorMessage, setErrorMessage] = useState(''); // Error message state

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleCollaborationModalOpen = () => {
    setIsCollaborationModalOpen(true); // Open the modal
  };

  const handleCollaborationModalClose = () => {
    setIsCollaborationModalOpen(false); // Close the modal
    setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form data
    setSuccessMessage(''); // Clear success message
    setErrorMessage(''); // Clear error message
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value })); // Update form data
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Name, email, and message are required.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/collaborations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage('Collaboration request submitted successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form data
        setTimeout(() => {
          handleCollaborationModalClose(); // Close the modal after 2 seconds
        }, 2000);
      } else {
        // Handle duplicate request error
        setErrorMessage(responseData.message || 'You have already submitted a collaboration request.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error('Error submitting collaboration request:', error);
    }
  };

  useEffect(() => {
    const slideInterval = setInterval(handleNext, 5000); // Change slides every 5 seconds
    return () => clearInterval(slideInterval); // Clear interval on component unmount
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        background: 'linear-gradient(90deg, #f9f5fc, #f3e9f7)',
        borderRadius: 2,
        maxWidth: 1200,
        margin: 'auto',
      }}
    >
      <Button onClick={handlePrev}>
        <ArrowBackIosNewIcon />
      </Button>

      <Box sx={{ flex: 1, textAlign: 'center', padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
          <img src={slides[currentSlide].logo1} alt="Logo 1" style={{ height: 50, marginRight: 10 }} />
          <Typography variant="h6" component="span">X</Typography>
          <img src={slides[currentSlide].logo2} alt="Logo 2" style={{ height: 50, marginLeft: 10 }} />
        </Box>

        <Typography variant="h4" component="h2" gutterBottom>
          {slides[currentSlide].title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {slides[currentSlide].description}
        </Typography>

        <Button
          sx={{
            margin: '0 auto 1rem',
            color: 'white',
            backgroundColor: 'black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'black',
              color: 'white',
            },
          }}
          onClick={handleCollaborationModalOpen} // Open the collaboration modal
        >
          Collaborate with Us
        </Button>
      </Box>

      <Button onClick={handleNext}>
        <ArrowForwardIosIcon />
      </Button>

      {/* Collaboration Request Modal */}
      <Modal open={isCollaborationModalOpen} onClose={handleCollaborationModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            borderRadius: 2,
          }}
        >
          {/* Close Button */}
          <IconButton
            sx={{ position: 'absolute', top: 8, right: 8 }}
            onClick={handleCollaborationModalClose}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" component="h2" gutterBottom>
            Collaboration Request
          </Typography>

          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleFormSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFormChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleFormChange}
              multiline
              rows={4}
              margin="normal"
              required
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: 'black',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#333',
                },
              }}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default Carousel;