import axios from 'axios';

const api = axios.create({
  baseURL: '/api/auth',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token from localStorage if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
