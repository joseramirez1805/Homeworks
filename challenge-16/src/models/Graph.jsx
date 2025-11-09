import { Person } from './Person';

export class MyGraph {
  constructor() {
    this.nodes = []; // Lista de Node objects
    this.adjList = {}; // Lista de adyacencia: { id: [adjacentIds] }
  }

  // Agregar un nodo (person o city)
  addNode(node) {
    if (!this.adjList[node.id]) {
      this.nodes.push(node);
      this.adjList[node.id] = [];
    }
  }

  // Agregar arista undirected (para amigos o person-to-city)
  addEdge(node1Id, node2Id) {
    if (!this.adjList[node1Id].includes(node2Id)) {
      this.adjList[node1Id].push(node2Id);
    }
    if (!this.adjList[node2Id].includes(node1Id)) {
      this.adjList[node2Id].push(node1Id);
    }
  }

  // Buscar nodo por ID
  findNode(nodeId) {
    return this.nodes.find(node => node.id === nodeId);
  }

  // Imprimir la lista de adyacencia (como en las slides)
  printGraph() {
    console.log('Adjacency List:');
    for (let nodeId in this.adjList) {
      console.log(`${nodeId} -> ${this.adjList[nodeId].join(', ')}`);
    }
  }

  // Obtener e imprimir lista de personas en una ciudad particular
  getPeopleInCity(cityId) {
    const adj = this.adjList[cityId] || [];
    const people = adj
      .map(adjId => this.findNode(adjId))
      .filter(node => node instanceof Person) // Filtrar solo personas
      .map(person => ({ name: person.name, age: person.age }));

    console.log(`People living in ${this.findNode(cityId)?.name || cityId}:`);
    people.forEach(person => {
      console.log(`- ${person.name} (Age: ${person.age})`);
    });
    return people;
  }

  // Preparar datos para react-force-graph (2D)
  prepareGraphData() {
    const nodes = this.nodes.map(node => ({
      id: node.id,
      nodeLabel: node.type === 'person' ? `${node.name} (${node.age})` : node.name, // Para ForceGraph2D
      color: node.type === 'person' ? 'lightblue' : 'lightgreen',
      type: node.type, // conservar tipo para manejar clicks en la visualización
      // nodeVal se usará para determinar el radio al dibujar el nodo
      nodeVal: node.type === 'city' ? 10 : 6,
      // size no es directo, usa nodeVal para tamaño si necesitas (ej: nodeVal: node.type === 'city' ? 10 : 5)
    }));

    const links = [];
    const addedLinks = new Set();
    for (let source in this.adjList) {
      for (let target of this.adjList[source]) {
        const linkKey = [source, target].sort().join(',');
        if (!addedLinks.has(linkKey)) {
          links.push({ source, target });
          addedLinks.add(linkKey);
        }
      }
    }

    return { nodes, links };
  }
}