class PriorityQueue {
  constructor() {
    this.items = [];
  }

  // Función auxiliar para parsear "DD/MM/YYYY, HH:MM:SS" correctamente
  parseCustomDate(str) {
    const [datePart, timePart] = str.split(', ');
    const [day, month, year] = datePart.split('/').map(Number);
    const [hours, minutes, seconds] = timePart.split(':').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds).getTime();
  }

  // Añade y ordena por fecha ascendente (más antigua primero)
  enqueue(person) {
    this.items.push(person);
    this.items.sort((a, b) => {
      return this.parseCustomDate(a.arrivalTime) - this.parseCustomDate(b.arrivalTime);
    });
  }

  // Remueve del frente (más antigua)
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

  // Mira el frente
  peek() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  // Retorna para mostrar (ya ordenado)
  print() {
    console.log(this.items);
    return [...this.items];
  }
}

export default PriorityQueue;