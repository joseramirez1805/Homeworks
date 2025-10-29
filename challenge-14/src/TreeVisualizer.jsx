import React, { useRef, useEffect, useState } from 'react'
import Tree from 'react-d3-tree'

const TreeVisualizer = ({ treeData }) => {
  const containerRef = useRef(null)
  const [translate, setTranslate] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (el) {
      const { width } = el.getBoundingClientRect()
      setTranslate({ x: width / 2, y: 50 })
    }
  }, [])

  if (!treeData) return null

  return (
    <div ref={containerRef} className="tree-visualizer">
      <Tree
        data={treeData}
        translate={translate}
        orientation="vertical"
        pathFunc="elbow"
        collapsible={false}
        zoomable={true}
        initialDepth={undefined}
      />
    </div>
  )
}

export default TreeVisualizer
