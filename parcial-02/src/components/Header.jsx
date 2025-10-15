import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { auth } from '../firebase/config'
import { signOut } from 'firebase/auth'
import { clearUser } from '../store/slices/authSlice'

export default function Header() {
  const dispatch = useDispatch()
  const notifications = useSelector((state) => state.notifications.stack)
  const user = useSelector((state) => state.auth.user)
  const count = notifications.length

  const logout = async () => {
    try {
      await signOut(auth)
      dispatch(clearUser())
    } catch (e) {
      console.error('Error al cerrar sesión:', e)
    }
  }

  return (
    <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, borderBottom: '1px solid #ddd'}}>
      <h2>UAO Social</h2>
      <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
        <div>
          Notificaciones: <strong>{count}</strong>
        </div>
        <div>
          {user?.email}
          <button onClick={logout} style={{marginLeft: 8}}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  )
}
