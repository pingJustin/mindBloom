// src/pages/Login.tsx
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { AuthContext } from '../context/AuthContext';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: #a6c4a3;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: formData });
      localStorage.setItem('token', data.login.token);
      localStorage.setItem('email', data.login.user.email);
      setAuth({
        token: data.login.token, email: data.login.user.email,
        isAuthenticated: false
      });
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
        {error && <p style={{ color: 'red' }}>{error.message}</p>}
      </form>
    </FormContainer>
  );
};

export default Login;
