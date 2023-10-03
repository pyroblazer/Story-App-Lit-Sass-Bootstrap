// src/utils/http.js
import axios from 'axios';
import Config from '../config/config';

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  timeout: 5000,
});

export default axiosInstance;
