import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Login from '../pages/login';
import Profile from '../pages/Profile'; // Profile page component

const StyledAppBar = styled(AppBar)(({ transparent }) => ({
  backgroundColor: transparent ? 'transparent' : '#fff',
  color: transparent ? '#fff' : '#000',
  boxShadow: transparent ? 'none' : '0px 4px 8px rgba(0, 0, 0, 0.1)',
  transition: 'background-color 0.3s, color 0.3s, box-shadow 0.3s',
  borderBottom: transparent ? 'none' : '1px solid #e0e0e0',
}));

const LuxuryButton = styled(Button)({
  backgroundColor: '#000', // Black background
  color: '#a89160', // Golden text color
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#333', // Darker black on hover
  },
});

const TransparentButton = styled(Button)(({ scroll }) => ({
  color: scroll ? '#000' : '#fff', // Black text on scroll, white otherwise
  borderColor: scroll ? '#000' : '#fff', // Black border on scroll, white otherwise
  borderWidth: '1px',
  borderStyle: 'solid',
  fontWeight: 'bold',
  '&:hover': {
    borderColor: scroll ? '#333' : '#ddd',
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const [isTransparent, setIsTransparent] = useState(true);
  const [showlogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false); // State to toggle profile page
  const [profileEditMode, setProfileEditMode] = useState(false); // State to toggle edit mode in profile
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate(); // Initialize navigate

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  const handleProfileRedirect = () => {
    setShowProfile(true); // Show the profile page
    handleProfileMenuClose(); // Close the profile menu after redirection
  };

  const handleProfileEditToggle = () => {
    setProfileEditMode(!profileEditMode); // Toggle between view and edit mode in the profile
  };

  const handleLoginClick = () => {
    setShowLogin(!showlogin); // Toggle the login modal visibility
    handleMenuClose(); // Close the menu after action
  };

  const handleLogout = () => {
    
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("authToken");
  localStorage.removeItem("scribe_extension_state");
  localStorage.removeItem("groceryadmin");

  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "") // Trim spaces
      .replace(/=.*/, "=;expires=" + new Date(0).toUTCString() + ";path=/");
  });

  alert("Logged out successfully!");
  window.location.reload(); // Refresh to reflect logout
  };

useEffect(() => {
  const handleScroll = () => {
    setIsTransparent(window.scrollY < 100); // Change to false after scrolling down 100px
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
  <StyledAppBar position="fixed" transparent={isTransparent}>
    <Toolbar>
      {/* Logo */}
      <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <a href="/" to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
            <img src="https://i.postimg.cc/L5ckc6Bh/Screenshot-2024-11-11-123700-removebg-preview.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
          </a>
        </Typography>
      </Typography>

      {/* Conditional display based on screen size */}
      {isMobile ? (
        <>
          {/* Mobile View */}
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={handleMenuClose}>Explore</MenuItem>
            <MenuItem onClick={handleMenuClose}>Luxury Getaways</MenuItem>
            <MenuItem onClick={handleMenuClose}>List Your Property</MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <PhoneIcon /> +91 9167 928 471
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <NotificationsIcon color="error" />
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
              <AccountCircleIcon />
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={profileMenuAnchorEl}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileRedirect}>My Profile</MenuItem> {/* Redirect to Profile */}
            <MenuItem onClick={handleLoginClick}>Login</MenuItem> {/* Toggle login modal */}
          </Menu>
        </>
      ) : (
        <>
          {/* Desktop View */}
          <TransparentButton onClick={handleMenuOpen} color="inherit" scroll={!isTransparent} sx={{ marginRight: 1 }}>
            Explore
          </TransparentButton>
          <LuxuryButton variant="contained" sx={{ marginRight: 1 }}>
            Luxury Getaways
          </LuxuryButton>
          <TransparentButton color="inherit" scroll={!isTransparent} sx={{ marginRight: 1 }}>
            List Your Property
          </TransparentButton>
          <TransparentButton startIcon={<PhoneIcon />} color="inherit" scroll={!isTransparent} sx={{ marginRight: 1 }}>
            +91 9167 928 471
          </TransparentButton>
          <IconButton color="inherit">
            <NotificationsIcon color="error" />
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchorEl}
            open={Boolean(profileMenuAnchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileRedirect}>My Profile</MenuItem> {/* Redirect to Profile */}
            {localStorage.getItem("access_token") ? (
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            ) : (
              <MenuItem onClick={handleLoginClick}>Login</MenuItem>
            )}
          </Menu>
        </>
      )}
    </Toolbar>
    {showlogin && <Login />} {/* Display login modal */}

    {showProfile && (
      <Profile
        isEditing={profileEditMode}
        toggleEditMode={handleProfileEditToggle}
      />
    )}
  </StyledAppBar>
);
};

export default Header;
