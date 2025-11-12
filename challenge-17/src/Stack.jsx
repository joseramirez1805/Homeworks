class Stack {
  constructor() {
    this.items = [];
  }

  push(book) {
    this.items.push(book);
  }

  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  print() {
    console.log(this.items);
    return this.items.slice().reverse();
  }
}

export default Stack;