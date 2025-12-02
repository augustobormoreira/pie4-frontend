import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens'))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem('authTokens')
      ? jwtDecode(JSON.parse(localStorage.getItem('authTokens')).access)
      : null
  );

  const navigate = useNavigate();

  const loginUser = async (email, password) => {
    try {
      const response = await api.post('/token/', { email, password });
      const data = response.data;

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify(data));
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('Algo deu errado! Verifique seu email e senha.');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/login');
  };

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
      localStorage.setItem('authTokens', JSON.stringify(authTokens));
    } else {
      setUser(null);
    }
  }, [authTokens]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (authTokens) {
        const decoded = jwtDecode(authTokens.refresh);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          logoutUser();
        }
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [authTokens]);

  const contextData = {
    user,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
