import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
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
  background: #b9d8c2;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`;

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setAuth({ token: data.token, isAuthenticated: true });
      navigate('/');
    } catch (err) {
      alert('Invalid login credentials');
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h2>Login</h2>
      <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleSubmit}>Log In</Button>
    </FormContainer>
  );
};

export default Login;
