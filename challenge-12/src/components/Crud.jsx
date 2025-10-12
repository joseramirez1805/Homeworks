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
        <div style={{ padding: '20px' }}>
            <h2>CRUD con Firestore</h2>
            
            <div style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Nombre del usuario"
                    onChange={handleSetUser} 
                    value={user.name}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <button 
                    type="button" 
                    onClick={save}
                    disabled={isPending || !user.name.trim()}
                    style={{ padding: '5px 10px' }}
                > 
                    {isPending ? 'Guardando...' : 'Guardar'} 
                </button>
            </div>

            {error && (
                <div style={{ 
                    color: 'red', 
                    backgroundColor: '#ffe6e6', 
                    padding: '10px', 
                    borderRadius: '5px',
                    marginBottom: '20px'
                }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            <div>
                <h3>Usuarios ({results.length})</h3>
                {results.length === 0 && !isPending && !error && (
                    <p>No hay usuarios registrados</p>
                )}
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {results.map(item => (
                        <li key={item.id} style={{ 
                            border: '1px solid #ccc', 
                            margin: '5px 0', 
                            padding: '10px',
                            borderRadius: '5px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}>
                            {editingId === item.id ? (
                                <>
                                    <input 
                                        value={editValue} 
                                        onChange={(e) => setEditValue(e.target.value)}
                                        style={{ flex: 1, padding: '5px' }}
                                    />
                                    <button 
                                        onClick={() => saveEdit(item.id)}
                                        disabled={isPending}
                                        style={{ padding: '5px 10px' }}
                                    >
                                        Guardar
                                    </button>
                                    <button 
                                        onClick={cancelEdit}
                                        style={{ padding: '5px 10px' }}
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span style={{ flex: 1 }}>{item.name || item.title}</span>
                                    <button 
                                        onClick={() => startEdit(item)}
                                        style={{ padding: '5px 10px' }}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(item.id)}
                                        disabled={isPending}
                                        style={{ 
                                            padding: '5px 10px',
                                            backgroundColor: '#ff6b6b',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '3px'
                                        }}
                                    >
                                        Borrar
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}