import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  auth: { token: null, email: null, isAuthenticated: false },
  setAuth: () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: localStorage.getItem('token'),
    email: localStorage.getItem('email'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');
    setAuth({
      token: storedToken,
      email: storedEmail,
      isAuthenticated: !!storedToken,
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setAuth({ token: null, email: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
