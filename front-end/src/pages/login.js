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
} from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For displaying error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before making the request

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      // Save tokens in localStorage if login is successful
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      alert("Login successful!"); // Show success alert
      // Optionally, redirect user to another page after login
      window.location.href = "/"; // Redirect to home or any other page
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // If the error has a response, show the error message from the backend
        console.error("Login failed:", error.response.data);
        setErrorMessage(error.response.data.detail || "Invalid credentials!"); // Set error message
      } else {
        // If there's no response, show a network error message
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
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", padding: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Enter your credentials to access your account.
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
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ textTransform: "none" }}
            >
              Login
            </Button>
          </form>

          <Box textAlign="center" marginTop={2}>
            <Typography variant="body2">
              Don't have an account? <a href="/signup">Sign Up</a>
            </Typography>
            <Typography variant="body2">
              <a href="/forgot-password">Forgot Password?</a>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
