import React, { createContext, useState, useEffect, ReactNode } from 'react';
import api from '../utils/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface AuthContextProps extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  logout: () => {},
  clearError: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  // Check if user is logged in
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setAuth({
          ...auth,
          loading: false,
        });
        return;
      }
      
      try {
        const res = await api.get('/auth/me');
        setAuth({
          isAuthenticated: true,
          user: res.data.user,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('token');
        setAuth({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Authentication failed',
        });
      }
    };
    
    loadUser();
  }, []);

  // Login user
  const login = async (email: string, password: string) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      
      setAuth({
        isAuthenticated: true,
        user: res.data.user,
        loading: false,
        error: null,
      });
    } catch (error: any) {
      setAuth({
        ...auth,
        error: error.response?.data?.message || 'Login failed',
      });
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setAuth({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  // Clear error
  const clearError = () => {
    setAuth({
      ...auth,
      error: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth.isAuthenticated,
        user: auth.user,
        loading: auth.loading,
        error: auth.error,
        login,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};