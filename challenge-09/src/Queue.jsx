class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(person) {
    this.items.push(person);
  }

  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }

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

  print() {
    console.log(this.items);
    return [...this.items]; 
  }
}

export default Queue;