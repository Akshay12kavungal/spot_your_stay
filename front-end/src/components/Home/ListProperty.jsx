import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ListProperty = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      setErrorMessage('Name, email, and phone details are required.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/collaborations/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setSuccessMessage('Property listed successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form data
        setTimeout(onClose, 2000); // Close the modal after 2 seconds
      } else {
        setErrorMessage(responseData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
      console.error('Error submitting property listing:', error);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
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
        {/* Close button */}
        <IconButton sx={{ position: 'absolute', top: 8, right: 8 }} onClick={onClose}>
          <CloseIcon />
        </IconButton>

        {/* Title */}
        <Typography variant="h6" gutterBottom>
          List Your Property
        </Typography>

        {/* Success and error messages */}
        {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

        {/* Form */}
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
            label="message"
            name="message"
            value={formData.propertyDetails}
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
              '&:hover': { backgroundColor: '#333' },
            }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ListProperty;