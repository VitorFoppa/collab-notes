import axios from 'axios';
import { isTokenExpired } from '../utils/auth';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
});

// Interceptor de REQUISIÇÃO
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('cyber_token');
    const jaPagina = window.location.pathname;

    if (token && token !== 'null' && token !== 'undefined') {
      if (isTokenExpired(token) && jaPagina !== '/login' && jaPagina !== '/register') {
        localStorage.removeItem('cyber_token');
        window.location.href = '/login';
        return Promise.reject(new Error('Token expirado'));
      }
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de RESPOSTA
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const jaPagina = window.location.pathname;

    if (error.response?.status === 401 || error.response?.status === 403) {
      if (jaPagina !== '/login' && jaPagina !== '/register') {
        console.warn('Token expirado. Redirecionando para login...');
        localStorage.removeItem('cyber_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);