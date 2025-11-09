import React, { useRef, useEffect, useState } from 'react';
// Importar el paquete 2D específico evita referencias a AFRAME (VR) al cargar el bundle
import ForceGraph2D from 'react-force-graph-2d';

export const GraphVisualization = ({ graphData, onClickNode, onClickCity }) => {
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [size, setSize] = useState({ width: 800, height: 600 });

  // ResizeObserver para mantener el canvas responsivo dentro del contenedor
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        setSize({ width: Math.max(300, Math.floor(cr.width)), height: Math.max(200, Math.floor(cr.height)) });
      }
    });
    ro.observe(el);
    // disparar una vez con el tamaño actual
    setSize({ width: Math.max(300, el.clientWidth), height: Math.max(200, el.clientHeight) });
    return () => ro.disconnect();
  }, []);

  // Cuando cambian los datos, centrar y escalar para que quepan
  useEffect(() => {
    const fg = fgRef.current;
    if (!fg) return;
    const id = setTimeout(() => {
      try {
        // zoomToFit(duration = ms, padding = px)
        if (typeof fg.zoomToFit === 'function') fg.zoomToFit(400, 40);
      } catch (e) {
        // ignore si el método no está disponible
      }
    }, 200);
    return () => clearTimeout(id);
  }, [graphData]);

  const handleNodeClick = (node) => {
    if (node.type === 'person') {
      // ya mostramos la información en la etiqueta del nodo, no usar alert
      if (onClickNode) onClickNode(node.id);
    } else if (node.type === 'city') {
      // ya mostramos la información en la etiqueta del nodo, no usar alert
      if (onClickCity) onClickCity(node.id);
    }
  };

  return (
    <div ref={containerRef} className="graph-container">
      <ForceGraph2D
        ref={fgRef}
        graphData={{ nodes: graphData.nodes, links: graphData.links }}
      nodeLabel="nodeLabel" // Muestra label al hover
      nodeColor="color" // Usa color definido
      nodeAutoColorBy="type" // Opcional, auto-color por tipo
      onNodeClick={handleNodeClick}
      // Dibujar nodos y etiquetas personalizados para control total del tamaño
      nodeCanvasObjectMode={() => 'after'}
      nodeCanvasObject={(node, ctx, globalScale) => {
        ctx.save();
        const label = node.nodeLabel || node.id;
        // radius basado en nodeVal
        const baseR = node.nodeVal || 6;
        // Ajustar el radio para que no crezca excesivamente cuando el zoom es bajo
        const r = baseR * Math.max(1, 1.0 / Math.max(globalScale, 0.8));

        // Círculo
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
        ctx.fillStyle = node.color || 'lightgray';
        ctx.fill();

        // Borde
        ctx.lineWidth = Math.max(1, 1 / Math.max(globalScale, 0.8));
        ctx.strokeStyle = '#666';
        ctx.stroke();

        // Texto (debajo del nodo) — mantener tamaño legible y no escalar en exceso
        const fontSize = Math.min(14, Math.max(10, 12 / Math.max(globalScale, 0.9)));
        ctx.font = `${fontSize}px Sans-Serif`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        // Fondo oscuro para que contraste sobre el fondo de la app
        const textWidth = ctx.measureText(label).width;
        const padding = 4;
        ctx.fillStyle = 'rgba(0,0,0,0.6)';
        ctx.fillRect(node.x - textWidth / 2 - padding, node.y + r + 4, textWidth + padding * 2, fontSize + 6);
        ctx.fillStyle = '#fff';
        ctx.fillText(label, node.x, node.y + r + 6);
        ctx.restore();
      }}
      // Área de interacción
      nodePointerAreaPaint={(node, color, ctx) => {
        const baseR = node.nodeVal || 6;
        const r = baseR * 1.3;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, 2 * Math.PI, false);
        ctx.fill();
      }}
  // Width/height controlados por el ResizeObserver para que el canvas llene el contenedor
  width={size.width}
  height={size.height}
  // ajustes de visual
  linkWidth={1}
  linkDirectionalParticles={0}
  nodeRelSize={8}
  backgroundColor="#ffffff" // Fondo blanco
  linkDirectionalArrowLength={0} // Sin flechas para undirected
    />
    </div>
  );
};