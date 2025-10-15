import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDms, dequeueDM } from '../store/slices/dmsSlice'
import { getDatabase, ref, push, onValue, remove, query, orderByChild } from 'firebase/database'
import './components.css'

export default function DMs() {
  const dispatch = useDispatch()
  const queue = useSelector((s) => s.dms.queue)
  const [text, setText] = useState('')
  const db = getDatabase()

  useEffect(() => {
    const dmsRef = query(ref(db, 'dms'), orderByChild('createdAt'))
    const unsubscribe = onValue(dmsRef, (snapshot) => {
      const arr = []
      snapshot.forEach(child => {
        arr.push({ id: child.key, ...child.val() })
      })
      dispatch(setDms(arr))
    })
    return () => unsubscribe()
  }, [db, dispatch])

  const send = async () => {
    if (!text.trim()) return
    const item = {
      text,
      createdAt: Date.now(),
    }
    try {
      const dmsRef = ref(db, 'dms')
      await push(dmsRef, item)
      setText('')
    } catch (e) {
      console.error('Error al enviar DM:', e)
    }
  }

  const processOne = async () => {
    const first = queue[0]
    if (!first) return
    try {
      const msgRef = ref(db, `dms/${first.id}`)
      await remove(msgRef)
    } catch (e) {
      console.error('Error al procesar DM:', e)
    }
  }

  return (
    <section className="dms-section">
      <h3>Mensajes Directos (cola)</h3>
      <div className="input-container">
        <input
          value={text}
          onChange={(e)=>setText(e.target.value)}
          placeholder="Mensaje directo"
        />
        <button onClick={send}>Enviar</button>
        <button onClick={processOne}>Eliminar</button>
      </div>
      <ul className="dms-list">
        {queue.map(m => (
          <li key={m.id}>{m.text} <small>({new Date(m.createdAt).toLocaleString()})</small></li>
        ))}
      </ul>
    </section>
  )
}
