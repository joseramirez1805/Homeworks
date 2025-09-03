const Hijo = ({ category, onInputChange, onAddCategory }) => {
    return (
    <div>
      <input
        type="text"
        placeholder="Escribe una categoría"
        value={category}
        onChange={onInputChange}
      />
      <button onClick={onAddCategory}>
        Agregar categoría
      </button>
    </div>
  );
}

export { Hijo }
