import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  Grid,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      await axios.post("http://localhost:8000/api/user/register/", formData);
      setSuccessMessage("Registration successful! You can now log in.");
    } catch (error) {
      if (error.response) {
        console.error("Registration failed:", error.response.data);
        setErrorMessage(error.response.data.detail || "Registration error!");
      } else {
        console.error("Unexpected error:", error);
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "transparent",
        padding: 2,
      }}
    >
      <Card
        sx={{
          display: "flex",
          width: "100%",
          maxWidth: 900,
          height: "500",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          borderRadius: 2,
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url('http://localhost:8000/media/property_images/WhatsApp_Image_2025-01-15_at_6_aX6gjPH.29.45_PM.jpeg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "8px 0 0 8px",
          }}
        />

        {/* Form Section */}
        <CardContent
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: 4,
            width: "100%",
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center">
            Create Account
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            marginBottom={3}
          >
            Please sign up to create a new account.
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {errorMessage}
            </Alert>
          )}

          {successMessage && (
            <Alert severity="success" sx={{ marginBottom: 2 }}>
              {successMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Enter your first name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Enter your last name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Enter your username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Enter your email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  placeholder="Enter your password"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                textTransform: "none",
                padding: "10px",
                fontSize: "16px",
                marginTop: 2,
              }}
            >
              Register
            </Button>
          </form>

          <Box textAlign="center" marginTop={3}>
            <Typography variant="body2" gutterBottom>
              Already have an account?{" "}
              <Link component={RouterLink} to="/" underline="hover">
                Login
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
