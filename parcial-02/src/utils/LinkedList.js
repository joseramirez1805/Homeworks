class Node {
  constructor(data) {
    this.data = data
    this.next = null
    this.prev = null
  }
}

export class LinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  insertFirst(data) {
    const newNode = new Node(data)
    this.size++

    if (!this.head) {
      this.head = newNode
      this.tail = newNode
      return
    }

    newNode.next = this.head
    this.head.prev = newNode
    this.head = newNode
  }

  insertLast(data) {
    const newNode = new Node(data)
    this.size++

    if (!this.tail) {
      this.head = newNode
      this.tail = newNode
      return
    }

    newNode.prev = this.tail
    this.tail.next = newNode
    this.tail = newNode
  }

  removeById(id) {
    if (!this.head) return null

    let current = this.head
    while (current) {
      if (current.data.id === id) {
        if (current === this.head) {
          this.head = current.next
          if (this.head) this.head.prev = null
          else this.tail = null
        } else if (current === this.tail) {
          this.tail = current.prev
          this.tail.next = null
        } else {
          current.prev.next = current.next
          current.next.prev = current.prev
        }
        this.size--
        return current.data
      }
      current = current.next
    }
    return null
  }

  toArray() {
    const array = []
    let current = this.head
    while (current) {
      array.push(current.data)
      current = current.next
    }
    return array
  }

  clear() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  getSize() {
    return this.size
  }

  findById(id) {
    let current = this.head
    while (current) {
      if (current.data.id === id) {
        return current.data
      }
      current = current.next
    }
    return null
  }
}