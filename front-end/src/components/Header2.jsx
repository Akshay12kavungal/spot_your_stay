import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { styled } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const StyledAppBar = styled(AppBar)(({ transparent }) => ({
  backgroundColor: '#fff', // Make the background always white
  color: '#000', // Text color is black
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Keep a slight shadow effect
  borderBottom: '1px solid #e0e0e0', // Border for separation
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
  color: '#000', // Black text
  borderColor: '#000', // Black border
  borderWidth: '1px',
  borderStyle: 'solid',
  fontWeight: 'bold',
  '&:hover': {
    borderColor: '#333', // Darker black on hover
  },
}));

const Header2 = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

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

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" noWrap sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <img src="https://i.postimg.cc/L5ckc6Bh/Screenshot-2024-11-11-123700-removebg-preview.png" alt="Logo" style={{ height: 40, marginRight: 8 }} />
          <span></span>
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
              <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Login</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {/* Desktop View */}
            <TransparentButton onClick={handleMenuOpen} color="inherit" sx={{ marginRight: 1 }}>
              Explore
            </TransparentButton>
            <LuxuryButton variant="contained" sx={{ marginRight: 1 }}>
              Luxury Getaways
            </LuxuryButton>
            <TransparentButton color="inherit" sx={{ marginRight: 1 }}>
              List Your Property
            </TransparentButton>
            <TransparentButton startIcon={<PhoneIcon />} color="inherit" sx={{ marginRight: 1 }}>
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
              <MenuItem onClick={handleProfileMenuClose}>My Profile</MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>Login</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header2;
