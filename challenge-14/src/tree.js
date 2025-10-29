// Simple Binary Search Tree implementation with traversal helpers
class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class BinarySearchTree {
  constructor() {
    this.root = null
  }

  insert(value) {
    const newNode = new Node(value)
    if (!this.root) {
      this.root = newNode
      return
    }

    let current = this.root
    while (true) {
      if (value === current.value) return // ignore duplicates
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode
          return
        }
        current = current.left
      } else {
        if (!current.right) {
          current.right = newNode
          return
        }
        current = current.right
      }
    }
  }

  contains(value) {
    let current = this.root
    while (current) {
      if (value === current.value) return true
      current = value < current.value ? current.left : current.right
    }
    return false
  }

  preorder() {
    const res = []
    const traverse = (node) => {
      if (!node) return
      res.push(node.value)
      traverse(node.left)
      traverse(node.right)
    }
    traverse(this.root)
    return res
  }

  inorder() {
    const res = []
    const traverse = (node) => {
      if (!node) return
      traverse(node.left)
      res.push(node.value)
      traverse(node.right)
    }
    traverse(this.root)
    return res
  }

  postorder() {
    const res = []
    const traverse = (node) => {
      if (!node) return
      traverse(node.left)
      traverse(node.right)
      res.push(node.value)
    }
    traverse(this.root)
    return res
  }
}

// Convert our Node to format expected by react-d3-tree
export function toD3TreeFromNode(node) {
  if (!node) return null
  const recurse = (n) => {
    if (!n) return null
    const obj = { name: String(n.value) }
    const children = []
    if (n.left) children.push(recurse(n.left))
    if (n.right) children.push(recurse(n.right))
    if (children.length) obj.children = children
    return obj
  }
  return recurse(node)
}

export default BinarySearchTree
