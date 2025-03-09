import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, TextField, Typography, Alert, Link, Modal, IconButton, useMediaQuery } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LuxuryButton = styled("button")({
  backgroundColor: "#000",
  color: "#a89160",
  fontWeight: "bold",
  padding: "10px",
  fontSize: "16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const LoginRegisterModal = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // Correct state variable
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)"); // Detect mobile screens

  // Handle registration
  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/users/register/", {
        username,
        email,
        password,
        phone_number: phone, // Include phone_number in the request payload
      });
      alert("Registration successful! You can now log in.");
      setIsLogin(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "Registration failed!");
    }
  };

  // Handle login
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });

      // Store the tokens, username, and expiration time in localStorage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", username);

      // Calculate and store the token expiration time
      const expiresIn = 3600; // Example: 1 hour in seconds
      const expirationTime = new Date().getTime() + expiresIn * 1000;
      localStorage.setItem("token_expiration", expirationTime);

      alert("Login successful!");
      setTimeout(() => {
        navigate("/"); 
        window.location.reload(); 
      }, 100);
    } catch (error) {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="login-register-modal" aria-describedby="login-register-modal-description">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          padding: isMobile ? 2 : 4,
          overflow: "auto", // Enable scrolling for the modal container
        }}
      >
        <Card
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            width: "100%",
            maxWidth: isMobile ? "90%" : 800, // Increased maxWidth for desktop
            maxHeight: "90vh", // Limit modal height to 90% of the viewport height
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: 2,
            overflow: "hidden", // Ensure content doesn't overflow
          }}
        >
          {/* Image Section */}
          {!isMobile && (
            <Box
              sx={{
                flex: 1,
                backgroundImage: `url('http://localhost:8000/media/property_images/login.jpeg')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: isMobile ? 200 : 400, // Ensure image section has a minimum height
              }}
            />
          )}

          {/* Form Section */}
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: isMobile ? 2 : 4,
              paddingBottom: isMobile ? 4 : 6, // Added extra padding at the bottom
              position: "relative",
              overflow: "auto", // Enable scrolling for the form section
            }}
          >
            <IconButton sx={{ position: "absolute", top: 8, right: 8 }} onClick={onClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom textAlign="center" fontSize={isMobile ? "1.8rem" : "2.125rem"}>
              {isLogin ? "Welcome Back" : "Create an Account"}
            </Typography>
            <Typography variant="body2" color="textSecondary" textAlign="center" marginBottom={3}>
              {isLogin ? "Please log in to access your account." : "Please fill in the details to create a new account."}
            </Typography>
            {errorMessage && <Alert severity="error" sx={{ marginBottom: 2 }}>{errorMessage}</Alert>}
            <form onSubmit={isLogin ? handleSubmitLogin : handleSubmitRegister}>
              <Box marginBottom={2}>
                <TextField fullWidth label="Username" value={username} onChange={(e) => setUsername(e.target.value)} required variant="outlined" placeholder="Enter your username" />
              </Box>
              {!isLogin && (
                <Box marginBottom={2}>
                  <TextField fullWidth label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required variant="outlined" placeholder="Enter your email address" />
                </Box>
              )}
              <Box marginBottom={2}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  type="number"
                  value={phone} // Use `phone` here
                  onChange={(e) => setPhone(e.target.value)} // Use `setPhone` here
                  required
                  variant="outlined"
                  placeholder="Enter your phone number"
                />
              </Box>
              <Box marginBottom={2}>
                <TextField fullWidth label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required variant="outlined" placeholder="Enter your password" />
              </Box>
              {!isLogin && (
                <Box marginBottom={2}>
                  <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required variant="outlined" placeholder="Confirm your password" />
                </Box>
              )}
              <LuxuryButton type="submit">{isLogin ? "Login" : "Register"}</LuxuryButton>
            </form>
            <Box textAlign="center" marginTop={3}>
              <Typography variant="body2" gutterBottom>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Link component="button" variant="body2" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign Up" : "Login"}
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default LoginRegisterModal;