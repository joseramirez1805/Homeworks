import './App.css'
import './BinaryTree.css'
import TreeVisualizer from './TreeVisualizer'
import useTreeLogic from './useTreeLogic'

export const App = () => {
    const { d3Tree, query, setQuery, found, handleSearch } = useTreeLogic()

    return (
        <div className="app-container">
            <h1>Árbol Binario (BST)</h1>

            <div className="search-bar">
                <label>Buscar valor:</label>
                <input className="search-input" value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="search-button" onClick={handleSearch}>Buscar</button>
                {found !== null && (
                    <span className="result-label">{found ? 'Encontrado' : 'No encontrado'}</span>
                )}
            </div>

            <div className="tree-wrapper">
                {d3Tree ? <TreeVisualizer treeData={d3Tree} /> : <p>Cargando árbol...</p>}
            </div>
        </div>
    )
}

export default App