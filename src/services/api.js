import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: `${API_BASE_URL}api`,
});

// ✅ Interceptor de request → adiciona access token
api.interceptors.request.use(
  (config) => {
    const tokens = JSON.parse(localStorage.getItem('authTokens'));
    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const refreshToken = async () => {
  const tokens = JSON.parse(localStorage.getItem('authTokens'));
  if (!tokens?.refresh) return null;

  try {
    const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
      refresh: tokens.refresh,
    });

    const newTokens = {
      access: response.data.access,
      refresh: tokens.refresh,
    };

    localStorage.setItem('authTokens', JSON.stringify(newTokens));
    return newTokens.access;
  } catch (err) {
    console.error('❌ Erro ao atualizar token:', err);
    localStorage.removeItem('authTokens');
    window.location.href = '/login';
    return null;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
