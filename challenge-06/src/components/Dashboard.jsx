import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      <h1>Bienvenido, {user}</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}