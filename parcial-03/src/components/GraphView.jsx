import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import ForceGraph2D from 'react-force-graph-2d'

const GraphView = forwardRef(function GraphView({ nodes, links, onNodeClick, onNodeHover }, ref) {
  const fgRef = useRef()

  useEffect(() => {
    if (fgRef.current && fgRef.current.d3Force) {
      const charge = fgRef.current.d3Force('charge')
      if (charge && charge.strength) charge.strength(-300)

      const linkForce = fgRef.current.d3Force('link')
      if (linkForce) {
        linkForce.distance(d => {
          try {
            const s = d.source && d.source.type ? d.source.type : (d.source || {}).type
            const t = d.target && d.target.type ? d.target.type : (d.target || {}).type
            // if either end is a zone, keep link short (zone attached to city)
            if (s === 'zone' || t === 'zone') return 70
          } catch (e) {}
          return 220
        })
        linkForce.strength(0.9)
      }
    }
  }, [])

  useEffect(() => {
    if (!fgRef.current) return
    const t = setTimeout(() => {
      try {
        if (fgRef.current.zoomToFit) fgRef.current.zoomToFit(400, 40)
      } catch (e) {}
    }, 120)
    return () => clearTimeout(t)
  }, [nodes, links])

  useImperativeHandle(ref, () => ({
    zoomToFit: (ms = 400, padding = 40) => {
      if (fgRef.current && fgRef.current.zoomToFit) fgRef.current.zoomToFit(ms, padding)
    },
    centerOnNode: (nodeId, ms = 400) => {
      if (!fgRef.current) return
      const node = (nodes || []).find(n => n.id === nodeId)
      if (node && typeof node.x === 'number' && typeof node.y === 'number') {
        try { fgRef.current.centerAt(node.x, node.y, ms) } catch (e) {}
      } else {
        if (fgRef.current.zoomToFit) fgRef.current.zoomToFit(ms, 40)
      }
    }
  }), [nodes, links])

  return (
    <div className="force-graph-container" style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes, links }}
        style={{ width: '100%', height: '100%' }}
        nodeLabel={node => node.name}
        nodeAutoColorBy="id"
        onNodeClick={onNodeClick}
        onNodeHover={onNodeHover}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name || ''
          const isZone = node.type === 'zone'
          const sizeVal = node.val || 6
          const r = isZone ? Math.max(6, Math.min(18, 6 + (sizeVal - 6))) : Math.max(12, Math.min(64, 6 + sizeVal * 3))

          ctx.beginPath()
          ctx.fillStyle = isZone ? '#eaf6e8' : '#f3f6f9'
          ctx.strokeStyle = isZone ? 'rgba(90,150,90,0.35)' : 'rgba(120,130,140,0.35)'
          ctx.lineWidth = Math.max(1, 1 / (globalScale || 1))
          ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false)
          ctx.fill()
          ctx.stroke()

          const fontSize = isZone ? Math.max(8, 10 / (globalScale || 1)) : Math.max(10, 12 / (globalScale || 1))
          ctx.font = `${fontSize}px Sans-Serif`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = isZone ? '#0b3d0b' : '#0f1720'
          ctx.fillText(label, node.x, node.y)
        }}
        linkCanvasObject={(link, ctx) => {
          const src = link.source
          const tgt = link.target
          if (!src || !tgt || !src.x || !tgt.x) return

          const getR = (n) => {
            const isZone = n.type === 'zone'
            const sizeVal = n.val || 6
            return isZone ? Math.max(6, Math.min(18, 6 + (sizeVal - 6))) : Math.max(12, Math.min(64, 6 + sizeVal * 3))
          }

          const r1 = getR(src)
          const r2 = getR(tgt)

          const dx = tgt.x - src.x
          const dy = tgt.y - src.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist === 0) return
          const ux = dx / dist
          const uy = dy / dist

          const startX = src.x + ux * r1
          const startY = src.y + uy * r1
          const endX = tgt.x - ux * r2
          const endY = tgt.y - uy * r2

          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(endX, endY)
          const isZoneLink = (src.type === 'zone' || tgt.type === 'zone')
          ctx.strokeStyle = isZoneLink ? 'rgba(46,125,50,0.55)' : 'rgba(96,104,112,0.55)'
          ctx.lineWidth = isZoneLink ? 1.6 : 2.4
          ctx.stroke()
        }}
      />
    </div>
  )
})

export default GraphView
