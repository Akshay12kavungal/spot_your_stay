import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const LuxuryButton = styled(Button)({
  backgroundColor: "#000",
  color: "#a89160",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#333",
  },
});

const NotificationComponent = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const refreshToken = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await axios.post('http://127.0.0.1:8000/api/token/refresh/', {
        refresh: refreshToken,
      });

      localStorage.setItem('access_token', response.data.access);
      console.log('Token refreshed successfully!');
    } catch (error) {
      console.error('Token refresh failed:', error);
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      setOpenModal(true);
    }
  }, []);

  const fetchNotifications = useCallback(async () => {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      setOpenModal(true);
      return;
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/notification/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setNotifications(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        await refreshToken();
        const newAccessToken = localStorage.getItem('access_token');
        if (newAccessToken) {
          const retryResponse = await axios.get('http://127.0.0.1:8000/api/notification/', {
            headers: { Authorization: `Bearer ${newAccessToken}` },
          });
          setNotifications(retryResponse.data);
        }
      } else {
        setError('Failed to fetch notifications. Please try again.');
        setOpenModal(true);
      }
    } finally {
      setLoading(false);
    }
  }, [refreshToken]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (loading) {
    return (
      <div style={{ position: 'absolute', top: '60px', right: '20px', backgroundColor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px', borderRadius: '4px', zIndex: 1000, width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', top: '60px', right: '20px', backgroundColor: '#fff', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', padding: '16px', borderRadius: '4px', zIndex: 1000, width: '300px', maxHeight: '400px', overflowY: 'auto' }}>
      <Typography class="msg_title" variant="h6" gutterBottom>
        Notifications
      </Typography>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} style={{ marginBottom: '16px' }}>
            <Typography variant="body1">{notification.message}</Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(notification.created_at).toLocaleString()}
            </Typography>
          </div>
        ))
      ) : (
        <Typography className="msg_text" variant="body1">No new notifications</Typography>
      )}
      <LuxuryButton onClick={onClose} fullWidth style={{ marginTop: '16px' }}>
        Close
      </LuxuryButton>

    </div>
  );
};

export default NotificationComponent;