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
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      alert("Login successful!");
      window.location.href = "/";
    } catch (error) {
      if (error.response) {
        console.error("Login failed:", error.response.data);
        setErrorMessage(error.response.data.detail || "Invalid credentials!");
      } else {
        console.error("Network error or unexpected issue:", error);
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
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
          height: "500px",
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
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="center">
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            marginBottom={3}
          >
            Please log in to access your account.
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                variant="outlined"
                placeholder="Enter your username"
              />
            </Box>
            <Box marginBottom={2}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="outlined"
                placeholder="Enter your password"
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth           
              sx={{
                textTransform: "none",
                padding: "10px",
                fontSize: "16px",
              }}
            >
              Login
            </Button>
          </form>

          <Box textAlign="center" marginTop={3}>
            <Typography variant="body2" gutterBottom>
              Don't have an account?{" "}
              <Link href="/signup" underline="hover">
                Sign Up
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link href="/forgot-password" underline="hover">
                Forgot Password?
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
