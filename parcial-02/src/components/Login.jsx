import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, clearUser } from '../store/slices/authSlice'
import { auth } from '../firebase/config'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'

export default function Login() {
  const dispatch = useDispatch()
  const user = useSelector((s) => s.auth.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) dispatch(setUser({ uid: u.uid, email: u.email }))
      else dispatch(clearUser())
    })
    return unsub
  }, [])

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.error(e)
      alert('Error registrando: ' + e.message)
    }
  }

  const login = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      console.error(e)
      alert('Error login: ' + e.message)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  return (
    <div style={{padding: 12}}>
      <input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder="password" value={password} type="password" onChange={(e)=>setPassword(e.target.value)} />
      <div style={{marginTop:8}}>
        <button onClick={login}>Iniciar sesión</button>
        <button onClick={register} style={{marginLeft:8}}>Registrarse</button>
      </div>
    </div>
  )
}
