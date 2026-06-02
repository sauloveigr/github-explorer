import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Accept: 'application/vnd.github.v3+json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      return Promise.reject(new Error('Rate limit excedido. Tente novamente em alguns minutos.'));
    }
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Usuário não encontrado.'));
    }
    return Promise.reject(error);
  },
);

export default api;
