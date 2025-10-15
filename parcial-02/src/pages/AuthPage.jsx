import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Login from '../components/Login'

export default function AuthPage() {
  const user = useSelector((state) => state.auth.user)

  if (user) {
    return <Navigate to="/" replace />
  }

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>UAO Social</h1>
      <Login />
    </div>
  )
}