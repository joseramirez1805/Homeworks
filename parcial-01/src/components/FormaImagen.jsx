import { useState } from 'react';

const FormaImagen = ({ anadirImagen }) => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');

    const cargar = (e) => {
        e.preventDefault();
        if (!id || !title) return;
        anadirImagen(id, title);
        setId('');
        setTitle('');
    };

    return (
        <form onSubmit={cargar}>
            <input
                type="number"
                placeholder="ID de la imagen"
                value={id}
                onChange={e => setId(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
            />
            <button type="submit">Añadir Imagen</button>
        </form>
    );
};

export default FormaImagen;