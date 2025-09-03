import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from './auth/PrivateRoute';

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/dashboard">Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </>
  );
}