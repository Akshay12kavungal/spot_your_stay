import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import ListProperty from './Home/ListProperty';
import LoginRegisterModal from './Home/login';
import ProfileModal from './Home/Profile';
import NotificationComponent from '../pages/Notification'; // Correct import path

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
  const [showProfile, setShowProfile] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const [showListProperty, setShowListProperty] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State to control notification visibility

  // Handle notification icon click
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications); // Toggle notification visibility
  };

  // Handle menu open/close
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleListProperty = () => {
    setShowListProperty(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle profile menu open/close
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchorEl(null);
  };

  // Handle profile redirect
  const handleProfileRedirect = () => {
    setShowProfile(true); // Show the profile page
    handleProfileMenuClose(); // Close the profile menu after redirection
  };

  // Handle login click
  const handleLoginClick = () => {
    setShowLogin(!showlogin); // Toggle the login modal visibility
    handleMenuClose(); // Close the menu after action
  };

  // Handle bookings redirect
  const handleBookings = () => {
    navigate('/bookings'); // Redirect to the Bookings page
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    alert('Logged out successfully!');
    window.location.reload(); // Refresh to reflect logout
  };

  // Handle scroll to toggle transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <StyledAppBar position="fixed" transparent={isTransparent}>
        <Toolbar>
          {/* Logo */}
          <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <a href="/" to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: 'inherit' }}>
              <img
                src="https://i.postimg.cc/L5ckc6Bh/Screenshot-2024-11-11-123700-removebg-preview.png"
                alt="Logo"
                style={{ height: 40, marginRight: 8 }}
              />
            </a>
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
                <MenuItem onClick={handleMenuClose}>Bookings</MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <PhoneIcon /> +91 9846865888
                </MenuItem>
                <MenuItem onClick={handleNotificationClick}>
                  <NotificationsIcon color="error" />
                  Notifications
                </MenuItem>
                <MenuItem onClick={handleProfileMenuOpen}>
                  <AccountCircleIcon />
                  My Account
                </MenuItem>
              </Menu>
              <Menu
                anchorEl={profileMenuAnchorEl}
                open={Boolean(profileMenuAnchorEl)}
                onClose={handleProfileMenuClose}
              >
                <MenuItem onClick={handleProfileRedirect}>My Profile</MenuItem>
                <MenuItem onClick={handleLoginClick}>Login</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* Desktop View */}
              <TransparentButton onClick={handleMenuOpen} color="inherit" scroll={!isTransparent} sx={{ marginRight: 1 }}>
                Explore
              </TransparentButton>
              <TransparentButton onClick={handleListProperty} color="inherit" scroll={!isTransparent} sx={{ marginRight: 1 }}>
                List Your Property
              </TransparentButton>
              <LuxuryButton onClick={handleBookings} variant="contained" sx={{ marginRight: 1 }}>
                Bookings
              </LuxuryButton>
              <TransparentButton startIcon={<PhoneIcon />} color="inherit" scroll={!isTransparent} sx={{ marginRight: 1 }}>
                +91 9846865888
              </TransparentButton>
              <IconButton color="inherit" onClick={handleNotificationClick}>
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
                <MenuItem onClick={handleProfileRedirect}>My Profile</MenuItem>
                {localStorage.getItem('access_token') ? (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                  <MenuItem onClick={handleLoginClick}>Login</MenuItem>
                )}
              </Menu>
            </>
          )}
        </Toolbar>
      </StyledAppBar>

      {/* Modals */}
      <LoginRegisterModal open={showlogin} onClose={() => setShowLogin(false)} />
      <ProfileModal open={showProfile} onClose={() => setShowProfile(false)} />
      <ListProperty open={showListProperty} onClose={() => setShowListProperty(false)} />

      {/* Notification Component */}
      {showNotifications && (
        <div style={{ position: 'fixed', top: '64px', right: '16px', zIndex: 1300 }}>
          <NotificationComponent onClose={() => setShowNotifications(false)} />
        </div>
      )}
    </>
  );
};

export default Header;