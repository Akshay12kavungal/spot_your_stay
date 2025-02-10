import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Box, Card, CardContent, TextField, Typography, Alert, Link } from "@mui/material";

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

const LoginRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

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
      });
      alert("Registration successful! You can now log in.");
      setIsLogin(true);
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "Registration failed!");
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:8000/api/token/", {
        username,
        password,
      });
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", username);
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
    <Box sx={{ display: "flex", justifyContent: "center", height: "100vh", padding: 2 }}>
      <Card sx={{ display: "flex", width: "100%", maxWidth: 900, height: "500px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: 2 }}>
        <Box sx={{ flex: 1, backgroundImage: `url('http://localhost:8000/media/property_images/login.jpeg')`, backgroundSize: "cover", backgroundPosition: "center", borderRadius: "8px 0 0 8px" }} />
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: 4 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
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
  );
};

export default LoginRegister;