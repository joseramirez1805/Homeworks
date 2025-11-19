export function makeCity(name) {
  return {
    id: cryptoRandomId(),
    name,
    zones: [] 
  }
}

function cryptoRandomId() {
  return Math.random().toString(36).slice(2, 9)
}

export function addZone(rootZones, parentId, zoneName) {
  if (!parentId) {
    rootZones.push({ id: cryptoRandomId(), name: zoneName, children: [] })
    return
  }

  const node = findZoneById(rootZones, parentId)
  if (node) {
    node.children.push({ id: cryptoRandomId(), name: zoneName, children: [] })
  }
}

export function editZone(rootZones, zoneId, newName) {
  const node = findZoneById(rootZones, zoneId)
  if (node) node.name = newName
}

export function findZoneById(zones, id) {
  for (const z of zones) {
    if (z.id === id) return z
    const found = findZoneById(z.children || [], id)
    if (found) return found
  }
  return null
}

export function countZones(zones) {
  let total = 0
  for (const z of zones) {
    total += 1
    total += countZones(z.children || [])
  }
  return total
}

export function maxHeight(zones) {
  if (!zones || zones.length === 0) return 0
  let best = 0
  for (const z of zones) {
    const childH = 1 + maxHeight(z.children || [])
    if (childH > best) best = childH
  }
  return best
}

export function deleteZone(zones, id) {
  if (!zones || zones.length === 0) return false
  for (let i = 0; i < zones.length; i++) {
    if (zones[i].id === id) {
      zones.splice(i, 1)
      return true
    }
    if (deleteZone(zones[i].children || [], id)) return true
  }
  return false
}
