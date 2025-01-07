import axios from 'axios';
import { getToken } from './utils/utils';

const https = axios.create({
  baseURL: 'https://api.spotify.com/v1/browse/',
});

https.interceptors.request.use(async (config) => {
  let authToken = localStorage.getItem('token');
  
  if (!authToken) {
    await getToken();
    authToken = localStorage.getItem('token'); 
  }
  
  if (authToken) {
    config.headers.Authorization = authToken;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default https;
