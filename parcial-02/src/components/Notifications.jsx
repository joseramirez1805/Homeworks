import   { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotifications, popNotification } from '../store/slices/notificationsSlice'
import { db } from '../firebase/config'
import { collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore'
import './components.css'

export default function Notifications() {
  const dispatch = useDispatch()
  const stack = useSelector((s) => s.notifications.stack)
  const [text, setText] = useState('')

  useEffect(() => {
    const notificationsQuery = query(
      collection(db, 'notifications'), 
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      dispatch(setNotifications(notifications))
    })

    return () => unsubscribe()
  }, [dispatch])

  const push = async () => {
    if (!text.trim()) return
    setText('') 
    const item = { 
      text, 
      createdAt: Date.now()
    }
    try {
      await addDoc(collection(db, 'notifications'), item)

    } catch(e) {
      console.error('Error al crear notificación:', e)
      setText(text) 
    }
  }

  const pop = async () => {
    const top = stack[0] 
    if (!top) return
    try {
      await deleteDoc(doc(db, 'notifications', top.id))
    } catch(e) {
      console.error('Error al eliminar notificación:', e)
    }
  }

  return (
    <section className="notifications-section">
      <h3>Notificaciones (pila)</h3>
      <div className="input-container">
        <input 
          value={text} 
          onChange={(e)=>setText(e.target.value)} 
          placeholder="Nueva notificación" 
        />
        <button onClick={push}>Enviar</button>
        <button onClick={pop}>Eliminar</button>
      </div>
      <ol reversed className="notifications-list">
        {stack.map(n => (
          <li key={n.id}>{n.text} <small>({new Date(n.createdAt).toLocaleString()})</small></li>
        ))}
      </ol>
    </section>
  )
}
