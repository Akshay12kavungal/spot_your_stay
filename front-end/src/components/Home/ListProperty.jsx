import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Alert, IconButton, Grid, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ListProperty = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property_name: '',
    property_type: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    description: '',
    website: '',
    photos: null, // Image file
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Handle text input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMessage('File size must be less than 5MB.');
      return;
    }
    if (file && !file.type.startsWith('image/')) {
      setErrorMessage('Only image files are allowed.');
      return;
    }
    setFormData((prev) => ({ ...prev, photos: file }));
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.property_name ||
      !formData.property_type ||
      !formData.location ||
      !formData.bedrooms ||
      !formData.bathrooms ||
      !formData.description
    ) {
      setErrorMessage('All fields are required except the website link.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('property_name', formData.property_name);
    formDataToSend.append('property_type', formData.property_type);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('bedrooms', formData.bedrooms);
    formDataToSend.append('bathrooms', formData.bathrooms);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('website', formData.website);
    if (formData.photos) {
      formDataToSend.append('photos', formData.photos);
    }

    console.log([...formDataToSend.entries()]); // Debugging: Log form data

    try {
      const response = await fetch('http://127.0.0.1:8000/api/collaborations/', {
        method: 'POST',
        body: formDataToSend,
      });

      const responseData = await response.json();
      console.log('Response:', response); // Debugging: Log response
      console.log('Response Data:', responseData); // Debugging: Log response data

      if (response.ok) {
        setSuccessMessage('Property listed successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          property_name: '',
          property_type: '',
          location: '',
          bedrooms: '',
          bathrooms: '',
          description: '',
          website: '',
          photos: null,
        });
        setTimeout(onClose, 2000); // Close modal after success
      } else {
        setErrorMessage(responseData.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
      console.error('Error submitting property listing:', error); // Debugging: Log error
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
          width: isMobile ? '90%' : isTablet ? '70%' : '600px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          maxHeight: '90vh',
          overflowY: 'auto',
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
          <Grid container spacing={2}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Personal Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleFormChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleFormChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Phone Number" type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required />
            </Grid>

            {/* Property Information */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Property Information
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Property Name" name="property_name" value={formData.property_name} onChange={handleFormChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Property Type" name="property_type" value={formData.property_type} onChange={handleFormChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleFormChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Bedrooms" type="number" name="bedrooms" value={formData.bedrooms} onChange={handleFormChange} required />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Bathrooms" type="number" name="bathrooms" value={formData.bathrooms} onChange={handleFormChange} required />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Website Link" type="url" name="website" value={formData.website} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleFormChange} multiline rows={3} required />
            </Grid>

            {/* File Upload */}
            <Grid item xs={12}>
              <Button variant="contained" component="label" fullWidth>
                Upload Property Photo
                <input type="file" name="photos" accept="image/*" hidden onChange={handleFileChange} />
              </Button>
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
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
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default ListProperty;