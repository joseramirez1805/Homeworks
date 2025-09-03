import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
    navigate('/dashboard', { replace: true });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Entrar</button>
    </form>
  );
}