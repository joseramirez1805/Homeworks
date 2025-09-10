const ListaImagen = ({ images }) => {
    if (images.length === 0) {
        return <p>No hay imágenes para mostrar.</p>;
    }

    return (
        <div>
            {images.map(image => (
                <div key={image.id}>
                    <h3>{image.title}</h3>
                    <img src={image.url} alt={image.title} />
                </div>
            ))}
        </div>
    );
};

export default ListaImagen;