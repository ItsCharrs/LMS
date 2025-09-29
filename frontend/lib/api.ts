// frontend/lib/api.ts

import axios from 'axios';

// Create a new Axios instance
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8001/api/v1', // Your Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// We will add an interceptor here later to automatically add the auth token
// to every request.

export default apiClient;