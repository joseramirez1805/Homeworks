import React, { useMemo, useState } from 'react';
import { MyGraph } from './models/Graph';
import { Person } from './models/Person';
import { City } from './models/City';
import { GraphVisualization } from './components/GraphVisualization';

export default function App() {
  // Crear el grafo una sola vez
  const graph = useMemo(() => {
    const g = new MyGraph();
    // Ciudades
    const city1 = new City('NewYork', 'New York');
    const city2 = new City('LosAngeles', 'Los Angeles');
    g.addNode(city1);
    g.addNode(city2);

    // Personas
    const person1 = new Person('Alice', 'Alice', 30);
    const person2 = new Person('Bob', 'Bob', 25);
    const person3 = new Person('Charlie', 'Charlie', 35);
    const person4 = new Person('David', 'David', 28);
    g.addNode(person1);
    g.addNode(person2);
    g.addNode(person3);
    g.addNode(person4);

    // Relaciones
    g.addEdge('Alice', 'NewYork');
    g.addEdge('Bob', 'NewYork');
    g.addEdge('Charlie', 'LosAngeles');
    g.addEdge('David', 'LosAngeles');
    g.addEdge('Alice', 'Bob');
    g.addEdge('Alice', 'Charlie');
    g.addEdge('Charlie', 'David');

    return g;
  }, []);

  const [selectedCity, setSelectedCity] = useState(null);
  const [peopleInCity, setPeopleInCity] = useState([]);

  const handleCityClick = (cityId) => {
    setSelectedCity(cityId);
    const people = graph.getPeopleInCity(cityId);
    setPeopleInCity(people);
  };

  const graphData = graph.prepareGraphData();

  return (
    <div className="app-root">
      <h1>Graph of Friends and Cities</h1>
      <div className="graph-wrap">
        <div className="graph-container">
          <GraphVisualization graphData={graphData} onClickCity={handleCityClick} />
        </div>
        <div className="list-section">
          <h2>People in {selectedCity ? graph.findNode(selectedCity)?.name : 'selected city'}</h2>
          <div className="people-list">
            {peopleInCity.length === 0 ? (
              <p>Haz click en una ciudad para ver sus habitantes.</p>
            ) : (
              <ul>
                {peopleInCity.map((p, i) => (
                  <li key={`${p.name}-${i}`}>{p.name} (Age: {p.age})</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}