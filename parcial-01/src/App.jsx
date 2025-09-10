import { useState } from 'react';
import ListaImagen from './components/ListaImagen';
import FormaImagen from './components/FormaImagen';
import FiltroBusqueda from './components/FiltroBusqueda';

const App = () => {
    const [images, setImages] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const anadirImagen = (id, title) => {
        const nuevaImagen = {
            id,
            title,
            url: `https://picsum.photos/id/${id}/200/300`
        };
        setImages([...images, nuevaImagen]);
    };

    const filtrarImagenes = images.filter(image =>
        image.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="App">
            <h1>Parcial-01  Estructura de datos II</h1>
            <FiltroBusqueda searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <FormaImagen anadirImagen={anadirImagen} />
            <ListaImagen images={filtrarImagenes} />
        </div>
    );
};

export default App;