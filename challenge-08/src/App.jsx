import { useState, useEffect } from 'react';
import Stack from './Stack';
import './App.css'; // Si quieres estilos, edita este archivo

function App() {
  const [stack, setStack] = useState(new Stack());
  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [author, setAuthor] = useState('');
  const [editorial, setEditorial] = useState('');

  useEffect(() => {
    const mockBooks = [
      { name: 'El Quijote', isbn: '123', author: 'Miguel de Cervantes', editorial: 'Editorial XYZ' },
      { name: '1984', isbn: '122', author: 'George Orwell', editorial: 'Penguin Books' },
      { name: 'Harry Potter y la Piedra Filosofal', isbn: '121', author: 'J.K. Rowling', editorial: 'Bloomsbury' },
    ];

    const newStack = new Stack();
    mockBooks.forEach(book => newStack.push(book));
    setStack(newStack);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !isbn || !author || !editorial) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const newBook = { name, isbn, author, editorial };
    const updatedStack = new Stack();
    stack.items.forEach(book => updatedStack.push(book));
    updatedStack.push(newBook);
    setStack(updatedStack);

    setName('');
    setIsbn('');
    setAuthor('');
    setEditorial('');
  };

  const booksToDisplay = stack.print();

  return (
    <div className="App">
      <h1>Challenge - 08</h1>
      <h2>Pila de Libros (Stack)</h2>

      {/* Formulario para añadir libro */}
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          ISBN:
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        </label>
        <br />
        <label>
          Autor:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <br />
        <label>
          Editorial:
          <input type="text" value={editorial} onChange={(e) => setEditorial(e.target.value)} />
        </label>
        <br />
        <button type="submit">Añadir Libro</button>
      </form>

      {/* Muestra la pila */}
      <h2>Libros en la Pila (más reciente arriba)</h2>
      {stack.isEmpty() ? (
        <p>La pila está vacía.</p>
      ) : (
        <ul>
          {booksToDisplay.map((book, index) => (
            <li key={index}>
              <strong>{book.name}</strong> - ISBN: {book.isbn}, Autor: {book.author}, Editorial: {book.editorial}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;