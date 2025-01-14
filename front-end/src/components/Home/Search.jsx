import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const SearchContainer = styled(Box)({
  display: 'flex',
  maxWidth:"1200px",
  flexDirection: 'column',
  margin:"0 auto ",
  alignItems: 'center',
  backgroundColor: '#fff',
  borderRadius: 8,
  padding: '16px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
});

const InputGroup = styled(Box)({
  display: 'flex',
  width: '100%',
  gap: '16px',
  marginBottom: '16px',
  '@media (max-width: 600px)': {
    flexDirection: 'column',
    gap: '8px',
  },
});

const SearchButton = styled(Button)({
  backgroundColor: '#000',
  color: '#fff',
  minWidth: '120px',
  '&:hover': {
    backgroundColor: '#333',
  },
});

const HelperContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginTop: '8px',
  backgroundColor: '#FFE4C4',
  padding: '8px',
  borderRadius: '4px',
});

const Title = styled(Box)({
   fontSize:"24px",
   fontWeight:"600",
   marginBottom:"40px",
   textTransform:"uppercase",
   letterSpacing:"1px",
  });

 



const SearchBar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/checkout"); // Redirect to the /home page
    window.scrollTo(0, 0); 
  };

  return (
    <SearchContainer>
     <Title>Pick a destination</Title>
      <InputGroup>
        <TextField
          label="Location/Villas/Landmark"
          placeholder="Where To?"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Check-in"
          placeholder="Select Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <TextField
          label="Check-out"
          placeholder="Select Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
        />
        <SearchButton onClick={handleClick} variant="contained">Book Now</SearchButton>
      </InputGroup>

      <HelperContainer>
        <Typography variant="body2">
          Finding your ideal vacation spot should be easy! We're here to help.
        </Typography>
        <Typography variant="body2" color="primary">
          <a href="#callback" style={{ color: '#1976d2', textDecoration: 'none' }}>
            Request Callback
          </a>
        </Typography>
      </HelperContainer>
    </SearchContainer>
  );
};

export default SearchBar;
