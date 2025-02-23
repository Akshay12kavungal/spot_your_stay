import axios from 'axios';

// Use environment variable or fallback to localhost
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000/', // More flexible setup
    headers: {
        'Content-Type': 'application/json',
    },
});

// Token authorization (optional)
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
