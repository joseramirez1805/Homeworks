import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPost, setPosts, removePost } from '../store/slices/postsSlice'
import { db } from '../firebase/config'
import { collection, query, orderBy, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore'
import './components.css'

export default function Posts() {
  const dispatch = useDispatch()
  const posts = useSelector((s) => s.posts.items)
  const [text, setText] = useState('')

  useEffect(() => {
    const postsQuery = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc')
    )

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      dispatch(setPosts(posts))
    })

    return () => unsubscribe()
  }, [dispatch])

  const submit = async () => {
    if (!text.trim()) return
    setText('') 
    const newPost = { text, createdAt: Date.now() }
    try {
      await addDoc(collection(db, 'posts'), newPost)
    } catch (e) {
      console.error('add post', e)
      setText(text) 
    }
  }

  const deletePost = async (id) => {
    try {
      await deleteDoc(doc(db, 'posts', id))
    } catch (e) {
      console.error('Error al eliminar post:', e)
    }
  }

  return (
    <section className="posts-section">
      <h3>Publicaciones (Lista Enlazada)</h3>
      <div className="input-container">
        <input value={text} onChange={(e)=>setText(e.target.value)} placeholder="Escribe un post" />
        <button onClick={submit}>Publicar</button>
      </div>
      <ul className="posts-list">
        {posts.map(p => (
          <li key={p.id}>
            {p.text} 
            <small>({new Date(p.createdAt).toLocaleString()})</small>
            <button onClick={() => deletePost(p.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
