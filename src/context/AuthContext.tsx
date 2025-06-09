import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  clearAuth: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authToken, setAuthTokenState] = useState<string | null>(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setAuthTokenState(savedToken);
    }
  }, []);

  const setAuthToken = (token: string | null) => {
    setAuthTokenState(token);
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  };

  const clearAuth = () => {
    setAuthTokenState(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('guestData');
  };

  const isAuthenticated = !!authToken;

  return (
    <AuthContext.Provider value={{ 
      authToken, 
      setAuthToken, 
      clearAuth, 
      isAuthenticated 
    }}>
      {children}
    </AuthContext.Provider>
  );
};