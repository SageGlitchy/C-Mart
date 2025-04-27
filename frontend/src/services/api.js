import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (userData) => API.post('/auth/register', userData);
export const login = (userData) => API.post('/auth/login', userData);

export const fetchItems = (params) => API.get('/items', { params });
export const fetchItemById = (id) => API.get(`/items/${id}`);
export const createItem = (itemData) => API.post('/items', itemData);
export const updateItem = (id, itemData) => API.put(`/items/${id}`, itemData);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export const sendMessage = (messageData) => API.post('/messages', messageData);
export const getMessages = (params) => API.get('/messages', { params });

export default API;
