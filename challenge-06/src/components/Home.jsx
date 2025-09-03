import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Página Pública</h1>
      <Link to="/login">Ir a Login</Link>
    </div>
  );
}