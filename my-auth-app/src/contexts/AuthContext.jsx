import { createContext, useContext, useState, useEffect } from 'react';
import { login, refreshToken } from '../services/AuthenticationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const tokens = localStorage.getItem('authTokens');
    return tokens ? JSON.parse(tokens) : null;
  });

  useEffect(() => {
    if (authTokens) {
      localStorage.setItem('authTokens', JSON.stringify(authTokens));
    } else {
      localStorage.removeItem('authTokens');
    }
  }, [authTokens]);

  const handleLogin = async (username, password) => {
    const data = await login(username, password);
    setAuthTokens(data);
  };

  const handleRefreshToken = async () => {
    const data = await refreshToken(authTokens.refreshToken);
    setAuthTokens({ ...authTokens, accessToken: data.accessToken });
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens, handleLogin, handleRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
