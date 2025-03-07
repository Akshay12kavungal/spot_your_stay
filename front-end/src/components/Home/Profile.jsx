import React, { useState, useEffect } from "react";
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
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const ProfileModal = ({ open, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showProfileEdit, setShowProfileEdit] = useState(false);

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("access_token"); // Retrieve access token
        if (!token) {
          setErrorMessage("You must be logged in to view your profile.");
          return;
        }
        const userName = localStorage.getItem("username");
        const response = await axios.get(
          `http://localhost:8000/api/users/profile/${userName}/`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token") || token}`,
            },
          }
        );

        console.log("API response:", response.data); // Check the response
        const userProfile = response.data;
        setUsername(userProfile.user.username);
        setEmail(userProfile.user.email);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setErrorMessage("Failed to load user details. Please try again.");
      }
    };

    fetchUserDetails();
  }, []);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (password && password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    try {
      const token = localStorage.getItem("access_token"); // Ensure token is available
      const response = await axios.put(
        "http://127.0.0.1:8000/api/users/profile/",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token") || token}`,
          },
        }
      );

      alert("Profile updated successfully!");
      setShowProfileEdit(false);
    } catch (error) {
      if (error.response) {
        console.error("Update failed:", error.response.data);
        setErrorMessage(error.response.data || "Update failed!");
      } else {
        console.error("Network error or unexpected issue:", error);
        setErrorMessage("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="profile-modal" aria-describedby="profile-modal-description">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
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
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box
            sx={{
              flex: 1,
              backgroundImage: `url('http://localhost:8000/media/property_images/profile.jpeg')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px 0 0 8px",
            }}
          />
          <CardContent
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: 4,
              position: "relative",
            }}
          >
            <IconButton
              sx={{ position: "absolute", top: 8, right: 8 }}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h4" gutterBottom textAlign="center">
              {showProfileEdit ? "Edit Profile" : "My Profile"}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              textAlign="center"
              marginBottom={3}
            >
              {showProfileEdit
                ? "Update your details below."
                : "Here are your current account details."}
            </Typography>

            {errorMessage && (
              <Alert severity="error" sx={{ marginBottom: 2 }}>
                {errorMessage}
              </Alert>
            )}

            {showProfileEdit ? (
              <form onSubmit={handleSubmitUpdate}>
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
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    variant="outlined"
                    placeholder="Enter your email address"
                  />
                </Box>
                <Box marginBottom={2}>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    placeholder="Enter your new password"
                  />
                </Box>
                <Box marginBottom={2}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    placeholder="Confirm your new password"
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
                  Update Profile
                </Button>
              </form>
            ) : (
              <Box>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Username: {username || "Loading..."}
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                  Email: {email || "Loading..."}
                </Typography>
              </Box>
            )}

            <Box textAlign="center" marginTop={3}>
              <Typography variant="body2" gutterBottom>
                {showProfileEdit
                  ? "Done editing? "
                  : "Want to edit your profile? "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setShowProfileEdit(!showProfileEdit)}
                >
                  {showProfileEdit ? "Save Changes" : "Edit Profile"}
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default ProfileModal;