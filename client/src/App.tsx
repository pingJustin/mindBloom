import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import GlobalStyles from './styles/GlobalStyles';

import NavBar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Journal from './pages/PastEntries';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App: React.FC = () => {
  return (
      <AuthProvider>
        <GlobalStyles />
        <NavBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
  );
};

export default App;
