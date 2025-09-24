import { useState, useEffect } from 'react';
import Queue from './Queue';
import './App.css';

function App() {
  const [queue, setQueue] = useState(new Queue());
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const mockPeople = [
      { name: 'Juan Pérez', amount: 100 },
      { name: 'Ana López', amount: 200 },
      { name: 'Carlos Gómez', amount: 50 },
    ];

    const newQueue = new Queue();
    mockPeople.forEach(person => newQueue.enqueue(person));
    setQueue(newQueue);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount) {
      alert('Completa todos los campos.');
      return;
    }

    const newPerson = { name, amount: parseFloat(amount) };
    const updatedQueue = new Queue();
    queue.items.forEach(person => updatedQueue.enqueue(person));
    updatedQueue.enqueue(newPerson);
    setQueue(updatedQueue);

    setName('');
    setAmount('');
  };

  const peopleToDisplay = queue.print();

  return (
    <div className="App">
      <h1>Challenge - 09</h1>
      <h2>Cola en ATM</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Monto de Retiro:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <br />
        <button type="submit">Añadir Persona</button>
      </form>

      <h2>Personas en la Cola (primera en fila arriba)</h2>
      {queue.isEmpty() ? (
        <p>La cola está vacía.</p>
      ) : (
        <ul>
          {peopleToDisplay.map((person, index) => (
            <li key={index}>
              <strong>{person.name}</strong> - Monto: ${person.amount}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;