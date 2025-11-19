import React, { useState, useMemo, useRef } from 'react'
import GraphView from './GraphView'
import ZoneTree from './ZoneTree'
import { makeCity, addZone, editZone, countZones, maxHeight, findZoneById, deleteZone } from '../utils/networkUtils'

export default function CityNetwork() {
  const [cities, setCities] = useState([])
  const [links, setLinks] = useState([])
  const [selectedCityId, setSelectedCityId] = useState(null)
  const [cityName, setCityName] = useState('')
  const [linkFrom, setLinkFrom] = useState('')
  const [linkTo, setLinkTo] = useState('')
  const [zoneName, setZoneName] = useState('')
  const [zoneParentId, setZoneParentId] = useState('')
  const [editZoneId, setEditZoneId] = useState('')
  const [editZoneName, setEditZoneName] = useState('')
  const [hoveredNode, setHoveredNode] = useState(null)
  const graphRef = useRef(null)
  const [showZonesInGraph, setShowZonesInGraph] = useState(true)

  function handleAddCity() {
    if (!cityName.trim()) return
    const c = makeCity(cityName.trim())
    setCities(prev => [...prev, c])
    setCityName('')
  }

  function handleDeleteCity(id) {
    setCities(prev => prev.filter(c => c.id !== id))
    setLinks(prev => prev.filter(l => l.source !== id && l.target !== id))
    if (selectedCityId === id) setSelectedCityId(null)
  }

  function handleAddLink() {
    if (!linkFrom || !linkTo) return
    if (linkFrom === linkTo) return
    // prevent duplicates
    setLinks(prev => {
      const exists = prev.find(l => (l.source === linkFrom && l.target === linkTo) || (l.source === linkTo && l.target === linkFrom))
      if (exists) return prev
      return [...prev, { source: linkFrom, target: linkTo }]
    })
    setLinkFrom('')
    setLinkTo('')
  }

  function handleAddZone() {
    if (!selectedCityId) return
    setCities(prev => prev.map(c => {
      if (c.id !== selectedCityId) return c
      const newZones = JSON.parse(JSON.stringify(c.zones || []))
      addZone(newZones, zoneParentId || null, zoneName.trim())
      return { ...c, zones: newZones }
    }))
    setZoneName('')
    setZoneParentId('')
  }

  function handleEditZone() {
    if (!selectedCityId || !editZoneId) return
    setCities(prev => prev.map(c => {
      if (c.id !== selectedCityId) return c
      const newZones = JSON.parse(JSON.stringify(c.zones || []))
      editZone(newZones, editZoneId, editZoneName.trim())
      return { ...c, zones: newZones }
    }))
    setEditZoneId('')
    setEditZoneName('')
  }

  function handleDeleteZone(zoneId) {
    if (!selectedCityId || !zoneId) return
    setCities(prev => prev.map(c => {
      if (c.id !== selectedCityId) return c
      const newZones = JSON.parse(JSON.stringify(c.zones || []))
      deleteZone(newZones, zoneId)
      return { ...c, zones: newZones }
    }))
    if (editZoneId === zoneId) {
      setEditZoneId('')
      setEditZoneName('')
    }
  }

  function handleAddSubZoneRequest(parentId) {
    setZoneParentId(parentId)
  }

  const { graphNodes, graphLinks } = useMemo(() => {
    const gNodes = []
    const gLinks = []

    for (const c of cities) {
      gNodes.push({ id: c.id, name: c.name, type: 'city', val: 6 + countZones(c.zones || []) })
    }

    for (const l of links) {
      gLinks.push({ source: l.source, target: l.target })
    }

    if (showZonesInGraph) {
      for (const c of cities) {
        const walk = (zones, parentId) => {
          if (!zones) return
          for (const z of zones) {
            const zid = `${c.id}::zone::${z.id}`
            gNodes.push({ id: zid, name: z.name, type: 'zone', cityId: c.id })
            gLinks.push({ source: parentId, target: zid })
            if (z.children && z.children.length > 0) walk(z.children, zid)
          }
        }
        walk(c.zones || [], c.id)
      }
    }

    return { graphNodes: gNodes, graphLinks: gLinks }
  }, [cities, links, showZonesInGraph])

  function onNodeClick(node) {
    if (!node) return
    if (node.type === 'zone') {
      setSelectedCityId(node.cityId || (node.id && node.id.split('::zone::')[0]))
      const parts = String(node.id).split('::zone::')
      if (parts.length === 2) {
        setEditZoneId(parts[1])
        setEditZoneName(node.name)
      }
      return
    }
    setSelectedCityId(node.id)
  }

  function onNodeHover(node) {
    setHoveredNode(node)
  }

  const selectedCity = cities.find(c => c.id === selectedCityId) || null

  const stats = selectedCity ? { total: countZones(selectedCity.zones || []), height: maxHeight(selectedCity.zones || []) } : null

  return (
    <div className="network-root">
      <div className="panel left">
        <section>
          <h2>Ciudades</h2>
          <input placeholder="Nombre ciudad" value={cityName} onChange={e=>setCityName(e.target.value)} />
          <button className="primary" onClick={handleAddCity}>Añadir ciudad</button>
          <ul className="city-list">
            {cities.map(c => (
              <li key={c.id} className={c.id===selectedCityId? 'selected':''}>
                <span onClick={()=>setSelectedCityId(c.id)}>{c.name}</span>
                <button className="small ghost" onClick={()=>handleDeleteCity(c.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Enlaces</h2>
          <select value={linkFrom} onChange={e=>setLinkFrom(e.target.value)}>
            <option value="">Desde...</option>
            {cities.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select value={linkTo} onChange={e=>setLinkTo(e.target.value)}>
            <option value="">Hasta...</option>
            {cities.map(c=> <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <button className="primary" onClick={handleAddLink}>Conectar</button>
        </section>

        <section>
          <h2>Zonas Verdes (selecciona ciudad)</h2>
          {selectedCity ? (
            <>
              <div className="zone-controls">
                <input placeholder="Nombre zona" value={zoneName} onChange={e=>setZoneName(e.target.value)} />
                <select value={zoneParentId} onChange={e=>setZoneParentId(e.target.value)}>
                  <option value="">Raíz</option>
                  {(function renderZones(zones, depth=0){
                    if(!zones) return null
                    return zones.flatMap(z=>[
                      <option key={z.id} value={z.id}>{'—'.repeat(depth)+z.name}</option>,
                      ...renderZones(z.children, depth+1)
                    ])
                  })(selectedCity.zones)}
                </select>
                <button className="primary" onClick={handleAddZone}>Añadir zona</button>
              </div>

              <div className="zone-edit">
                <select value={editZoneId} onChange={e=>{
                  setEditZoneId(e.target.value)
                  const node = findZoneById(selectedCity.zones || [], e.target.value)
                  setEditZoneName(node? node.name : '')
                }}>
                  <option value="">Seleccionar zona...</option>
                  {(function renderZones2(zones, depth=0){
                    if(!zones) return null
                    return zones.flatMap(z=>[
                      <option key={z.id} value={z.id}>{'—'.repeat(depth)+z.name}</option>,
                      ...renderZones2(z.children, depth+1)
                    ])
                  })(selectedCity.zones)}
                </select>
                <input placeholder="Nuevo nombre" value={editZoneName} onChange={e=>setEditZoneName(e.target.value)} />
                <button className="primary" onClick={handleEditZone}>Editar zona</button>
              </div>

              <div className="zone-tree">
                <h4>Árbol de zonas</h4>
                {selectedCity.zones && selectedCity.zones.length > 0 ? (
                  <ZoneTree
                    zones={selectedCity.zones}
                    onDelete={handleDeleteZone}
                    onSelectZone={(zone) => { setEditZoneId(zone.id); setEditZoneName(zone.name) }}
                    onAddSub={handleAddSubZoneRequest}
                  />
                ) : (
                  <p>No hay zonas</p>
                )}
              </div>

              <div className="stats">
                <strong>Total zonas:</strong> {stats.total} <br />
                <strong>Altura máxima:</strong> {stats.height}
              </div>
            </>
          ) : (
            <p>Selecciona una ciudad en la lista para ver y editar sus zonas.</p>
          )}
        </section>
      </div>

      <div className="panel right">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="node-info">
          {hoveredNode ? (
            (() => {
              const city = cities.find(c => c.id === hoveredNode.id)
              if (!city) return <div>Ciudad: {hoveredNode.name}</div>
              return (
                <div>
                  <div><strong>{city.name}</strong></div>
                  <div>Zonas: {countZones(city.zones || [])}</div>
                  <div>Altura: {maxHeight(city.zones || [])}</div>
                </div>
              )
            })()
          ) : (
            <div>Pasa el cursor sobre un nodo para ver detalles</div>
          )}
          </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <button className="ghost" onClick={() => graphRef.current && graphRef.current.zoomToFit()}>Ajustar vista</button>
            <button className="ghost" onClick={() => { if (selectedCityId && graphRef.current) graphRef.current.centerOnNode(selectedCityId) }}>Centrar selección</button>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, marginLeft: 8 }}>
              <input type="checkbox" checked={showZonesInGraph} onChange={e => setShowZonesInGraph(e.target.checked)} />
              <span style={{ fontSize: 12 }}>Mostrar zonas</span>
            </label>
          </div>
        </div>
        <GraphView ref={graphRef} nodes={graphNodes} links={graphLinks} onNodeClick={onNodeClick} onNodeHover={onNodeHover} />
      </div>
    </div>
  )
}
