import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  auth: { token: null, isAuthenticated: false },
  setAuth: () => {},
  logout: () => {},
});

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setAuth({
      token: storedToken,
      isAuthenticated: !!storedToken,
    });
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
