import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const Nav = styled.nav`
  background: #f5f3ef;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-family: 'Lora', serif;
  color: #444c46;
`;

const NavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 600px) {
    flex-direction: row;
    gap: 1rem;
  }
`;

const StyledLink = styled(Link)`
  color: #444c46;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    background-color: #dbe9ee;
  }
`;

const LogoutButton = styled.button`
  background: #b9d8c2;
  color: #444c46;
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #a6c4a3;
  }
`;

const NavBar: React.FC = () => {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav>
      <Logo>🪴 MindBloom</Logo>
      <NavLinks>
        <StyledLink to="/">Dashboard</StyledLink>
        <StyledLink to="/journal">Journal</StyledLink>
        {auth.isAuthenticated ? (
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        ) : (
          <>
            <StyledLink to="/login">Login</StyledLink>
            <StyledLink to="/signup">Signup</StyledLink>
          </>
        )}
      </NavLinks>
    </Nav>
  );
};

export default NavBar;
