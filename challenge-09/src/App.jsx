import { useState, useEffect } from 'react';
import PriorityQueue from './PriorityQueue';
import './App.css';

function App() {
  const [queue, setQueue] = useState(new PriorityQueue());
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(''); // YYYY-MM-DD
  const [time, setTime] = useState(''); // HH:MM

  // Datos mock con timestamps manuales (ordenados al añadir)
  useEffect(() => {
    const mockPeople = [
      { name: 'Juan Pérez', amount: 100, arrivalTime: '24/9/2025, 09:00:00' },
      { name: 'Ana López', amount: 200, arrivalTime: '24/9/2025, 09:15:00' },
      { name: 'Carlos Gómez', amount: 50, arrivalTime: '24/9/2025, 09:30:00' },
    ];

    const newQueue = new PriorityQueue();
    mockPeople.forEach(person => newQueue.enqueue(person));
    setQueue(newQueue);
  }, []);

  // Submit formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date || !time) {
      alert('Completa todos los campos, incluyendo fecha y hora.');
      return;
    }

    // Combina en timestamp, agregando :00 para segundos
    const fullTime = time.includes(':') && time.split(':').length === 2 ? `${time}:00` : time;
    const arrivalTime = new Date(`${date}T${fullTime}`).toLocaleString();

    const newPerson = { name, amount: parseFloat(amount), arrivalTime };
    const updatedQueue = new PriorityQueue();
    queue.items.forEach(person => updatedQueue.enqueue({ ...person }));
    updatedQueue.enqueue(newPerson); // Añade y ordena automáticamente
    setQueue(updatedQueue);

    setName('');
    setAmount('');
    setDate('');
    setTime('');
  };

  // Botón para atender (dequeue: más antigua)
  const handleDequeue = () => {
    const updatedQueue = new PriorityQueue();
    queue.items.slice(1).forEach(person => updatedQueue.enqueue({ ...person }));
    setQueue(updatedQueue);
  };

  const peopleToDisplay = queue.print();

  return (
    <div className="App">
      <h1>Challenge - 09</h1>
      <h2>Cola Prioritaria en ATM</h2>

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
        <label>
          Fecha de Llegada:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <br />
        <label>
          Hora de Llegada:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <br />
        <button type="submit">Añadir Persona</button>
      </form>

      <h2>Personas en la Cola </h2>
      {queue.isEmpty() ? (
        <p>La cola está vacía.</p>
      ) : (
        <ul>
          {peopleToDisplay.map((person, index) => (
            <li key={index}>
              <strong>{person.name}</strong> - Monto: ${person.amount} - Llegada: {person.arrivalTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;