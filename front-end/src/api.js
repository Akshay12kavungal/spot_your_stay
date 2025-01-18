import axios from 'axios';

// Create an axios instance with a base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/', // Replace with your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optionally, set up token authorization if needed
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
