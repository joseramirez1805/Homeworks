import { Node } from './Node';

export class Person extends Node {
  constructor(id, name, age) {
    super(id);
    this.name = name;
    this.age = age;
    this.type = 'person'; // Para visualización
  }
}