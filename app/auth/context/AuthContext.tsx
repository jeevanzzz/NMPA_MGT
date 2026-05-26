import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginResponse } from '../types/auth';
import { authService } from '../services/authService';
import { getToken, setToken, removeToken, decodeMockToken } from '../utils/token';
import { LoginCredentials } from '../validation/authSchema';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<User>;
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

  const logout = () => {
    removeToken();
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,
    });
  };

  // Session Management: Inactivity auto-logout & token expiration check
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let activityTimeout: ReturnType<typeof setTimeout>;

    const handleSessionExpired = () => {
      logout();
      window.location.hash = '#/session-expired';
    };

    const resetActivity = () => {
      clearTimeout(activityTimeout);
      // Enterprise Auto-Logout: 15 minutes of inactivity
      activityTimeout = setTimeout(handleSessionExpired, 15 * 60 * 1000); 
    };

    if (state.isAuthenticated && state.token) {
      // 1. Setup token expiration check
      interval = setInterval(() => {
        const decoded = decodeMockToken(state.token!);
        if (decoded && decoded.exp * 1000 < Date.now()) {
          handleSessionExpired();
        }
      }, 30000); // Check every 30 seconds

      // 2. Setup inactivity tracker
      window.addEventListener('mousemove', resetActivity);
      window.addEventListener('keypress', resetActivity);
      window.addEventListener('click', resetActivity);
      window.addEventListener('scroll', resetActivity);
      
      resetActivity();
    }

    return () => {
      clearInterval(interval);
      clearTimeout(activityTimeout);
      window.removeEventListener('mousemove', resetActivity);
      window.removeEventListener('keypress', resetActivity);
      window.removeEventListener('click', resetActivity);
      window.removeEventListener('scroll', resetActivity);
    };
  }, [state.isAuthenticated, state.token]);

  const login = async (credentials: LoginCredentials): Promise<User> => {
    try {
      const { user, token } = await authService.login(credentials);
      setToken(token, credentials.remember);
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
        token,
      });
      return user;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
