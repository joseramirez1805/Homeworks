const FiltroBusqueda = ({ searchTerm, setSearchTerm }) => {
    return (
        <div>
            <input 
                type="text" 
                placeholder="Buscar por título" 
                value={searchTerm} 
                onChange={e => setSearchTerm(e.target.value)} 
            />
        </div>
    );
};

export default FiltroBusqueda;