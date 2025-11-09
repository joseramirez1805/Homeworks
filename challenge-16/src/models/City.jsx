import { Node } from './Node';

export class City extends Node {
  constructor(id, name) {
    super(id);
    this.name = name;
    this.type = 'city'; // Para visualización
  }
}