import { useState } from "react";
import { songs } from "./mockSongs";

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SimpleLinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) current = current.next;
    current.next = newNode;
  }

  print() {
    let result = [];
    let current = this.head;
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    return result;
  }
}

export default function SimpleList() {
  const [current, setCurrent] = useState(0);

  const next = () => {
    if (current < songs.length - 1) setCurrent(current + 1);
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div>
      <h2>Reproduciendo canción:</h2>
      <div>
        <strong>{songs[current].title}</strong> - {songs[current].artist}
      </div>
      <button onClick={prev} disabled={current === 0}>Anterior</button>
      <button onClick={next} disabled={current === songs.length - 1}>Siguiente</button>
    </div>
  );
}

