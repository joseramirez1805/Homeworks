import React, { useState } from 'react'

export default function ZoneTree({ zones = [], onDelete, onSelectZone, onAddSub }) {
  const [openIds, setOpenIds] = useState(new Set())

  function toggle(id) {
    setOpenIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function renderList(list, depth = 0) {
    if (!list || list.length === 0) return null
    return (
      <ul className="zone-tree-ul">
        {list.map(z => (
          <li key={z.id} className="zone-node">
            <div className="zone-row" style={{ paddingLeft: depth * 12 }}>
              {z.children && z.children.length > 0 ? (
                <button className="zone-toggle" onClick={() => toggle(z.id)} aria-label="Expandir/colapsar">{openIds.has(z.id) ? '▾' : '▸'}</button>
              ) : (
                <span style={{ width: 18, display: 'inline-block' }} />
              )}

              <button className="zone-name" onClick={() => onSelectZone && onSelectZone(z)}>{z.name}</button>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                <button className="small zone-add" onClick={() => onAddSub && onAddSub(z.id)}>+</button>
                <button className="small zone-del" onClick={() => onDelete && onDelete(z.id)}>Eliminar</button>
              </div>
            </div>

            {z.children && z.children.length > 0 && openIds.has(z.id) ? renderList(z.children, depth + 1) : null}
          </li>
        ))}
      </ul>
    )
  }

  return <div className="zone-tree-component">{renderList(zones)}</div>
}
