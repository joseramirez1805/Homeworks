import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import useCollection from '../firebase/firestore'

export const Crud = () => {
    const [user, setUser] = useState({ name: '' });
    // [ add, getAll, isPending, results, error, update, remove ]
    const [add, getAll, isPending, results, error, update, remove] = useCollection("users");
    const [editingId, setEditingId] = useState(null)
    const [editValue, setEditValue] = useState('')

    const getAllDocs = async() => {
        await getAll([]);
    }

    const save = async () => {
        await add( user )
        await getAllDocs();
    }

    const handleSetUser = (event) => {
        setUser({ name: event.target.value })
    }

    useEffect( () => {
        getAllDocs();
    }, [])

    const startEdit = (item) => {
        setEditingId(item.id)
        setEditValue(item.name || item.title || '')
    }

    const cancelEdit = () => {
        setEditingId(null)
        setEditValue('')
    }

    const saveEdit = async (id) => {
        // update field 'name'
        const payload = { name: editValue }
        await update(id, payload)
        await getAllDocs()
        cancelEdit()
    }

    const handleDelete = async (id) => {
        await remove(id)
        await getAllDocs()
    }

    return (
        <>
            <input type="text" onChange={handleSetUser} value={user.name} />
            <button type="button" onClick={save}> Guardar </button>
            {
                isPending ? <span> Saving... </span> : ''
            }
            {error && <p>Error: {error}</p>}
            <ul>
                {
                    results.map( item => {
                        return (
                            <li key={item.id}>
                                {editingId === item.id ? (
                                    <>
                                        <input value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                                        <button onClick={() => saveEdit(item.id)}>Guardar</button>
                                        <button onClick={cancelEdit}>Cancelar</button>
                                    </>
                                ) : (
                                    <>
                                        <span>{ item.name || item.title }</span>
                                        <button onClick={() => startEdit(item)}>Editar</button>
                                        <button onClick={() => handleDelete(item.id)}>Borrar</button>
                                    </>
                                )}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
}