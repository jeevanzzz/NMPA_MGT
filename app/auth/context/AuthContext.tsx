import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginResponse } from '../types/auth';
import { authService } from '../services/authService';
import { getToken, setToken, removeToken } from '../utils/token';
import { LoginCredentials } from '../validation/authSchema';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    token: getToken(),
  });

  const checkAuth = async () => {
    const token = getToken();
    if (!token) {
      setState(prev => ({ ...prev, isLoading: false }));
      return;
    }

    try {
      const user = await authService.validateToken(token);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        token,
      });
    } catch (error) {
      removeToken();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        token: null,
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const { user, token } = await authService.login(credentials);
      setToken(token, credentials.remember);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        token,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    removeToken();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
