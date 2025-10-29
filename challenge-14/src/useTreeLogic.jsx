import { useEffect, useState } from 'react'
import { BinarySearchTree, toD3TreeFromNode } from './tree'

export function useTreeLogic() {
  const [bst] = useState(() => new BinarySearchTree())
  const [d3Tree, setD3Tree] = useState(null)
  const [query, setQuery] = useState('')
  const [found, setFound] = useState(null)

  useEffect(() => {
    // Insert a preset series of numbers into a new BST
    const series = [50, 30, 70, 20, 40, 60, 80]
    series.forEach((n) => bst.insert(n))

    // Print traversals to console
    console.log('Preorder:', bst.preorder())
    console.log('Inorder:', bst.inorder())
    console.log('Postorder:', bst.postorder())

    // prepare data for react-d3-tree and render
    const d3 = toD3TreeFromNode(bst.root)
    setD3Tree(d3)
  }, [bst])

  const handleSearch = () => {
    const val = Number(query)
    if (Number.isNaN(val)) return
    const exists = bst.contains(val)
    console.log(`Value ${val} exists in tree:`, exists)
    setFound(exists)
  }

  return { d3Tree, query, setQuery, found, handleSearch }
}

export default useTreeLogic
