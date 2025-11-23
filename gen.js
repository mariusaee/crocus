// Генерация с правильной проверкой расстояний

function generateClusteredPositions() {
  const positions = []

  const bands = [
    { name: 'C', yMin: 35, yMax: 55, singles: 8, pairs: 6, triples: 2 },
    { name: 'B', yMin: 55, yMax: 75, singles: 13, pairs: 10, triples: 4 },
    { name: 'A', yMin: 75, yMax: 97, singles: 9, pairs: 6, triples: 3 }
  ]

  const clearingZone = { xMin: 40, xMax: 60 }
  const isInClearing = (x) => x >= clearingZone.xMin && x <= clearingZone.xMax

  const hasMinDistance = (x, y, existingPositions, minDistance) => {
    for (const pos of existingPositions) {
      const dx = x - pos.xPercent
      const dy = y - pos.yPercent
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < minDistance) {
        return false
      }
    }
    return true
  }

  // Создает кластер без id (id будут добавлены при финальном размещении)
  const createCluster = (centerX, centerY, size, bandYMin, bandYMax) => {
    const cluster = []

    if (size === 1) {
      cluster.push({
        xPercent: centerX,
        yPercent: centerY
      })
    } else if (size === 2) {
      const offset = 6 + Math.random() * 3 // Уменьшено с 8-12 до 6-9%
      const angle = Math.random() * Math.PI * 2

      cluster.push({
        xPercent: Math.max(3, Math.min(97, centerX + Math.cos(angle) * offset)),
        yPercent: Math.max(bandYMin + 1, Math.min(bandYMax - 1, centerY + Math.sin(angle) * offset))
      })
      cluster.push({
        xPercent: Math.max(3, Math.min(97, centerX - Math.cos(angle) * offset)),
        yPercent: Math.max(bandYMin + 1, Math.min(bandYMax - 1, centerY - Math.sin(angle) * offset))
      })
    } else if (size === 3) {
      const offset = 6 + Math.random() * 2 // Уменьшено с 8-10 до 6-8%
      const baseAngle = Math.random() * Math.PI * 2

      for (let i = 0; i < 3; i++) {
        const angle = baseAngle + (i * Math.PI * 2 / 3)
        cluster.push({
          xPercent: Math.max(3, Math.min(97, centerX + Math.cos(angle) * offset)),
          yPercent: Math.max(bandYMin + 1, Math.min(bandYMax - 1, centerY + Math.sin(angle) * offset))
        })
      }
    }

    return cluster
  }

  bands.forEach(band => {
    const yCenter = (band.yMin + band.yMax) / 2
    const yRange = band.yMax - band.yMin

    const clusterTypes = [
      ...Array(band.singles).fill(1),
      ...Array(band.pairs).fill(2),
      ...Array(band.triples).fill(3)
    ]

    clusterTypes.sort(() => Math.random() - 0.5)

    clusterTypes.forEach((clusterSize, index) => {
      let centerX, centerY
      let cluster = []
      let attempts = 0
      const maxAttempts = 300
      const minDistanceBetweenFlowers = 5.0

      do {
        const segment = index / clusterTypes.length
        centerX = 10 + segment * 80 + (Math.random() - 0.5) * 12
        centerY = yCenter + (Math.random() - 0.5) * yRange * 0.6

        const clearingOk = clusterSize === 1 || !isInClearing(centerX)

        if (!clearingOk && attempts < maxAttempts) {
          attempts++
          continue
        }

        cluster = createCluster(centerX, centerY, clusterSize, band.yMin, band.yMax)

        let allFlowersOk = true
        for (const newFlower of cluster) {
          if (!hasMinDistance(newFlower.xPercent, newFlower.yPercent, positions, minDistanceBetweenFlowers)) {
            allFlowersOk = false
            break
          }
        }

        attempts++

        if (allFlowersOk || attempts >= maxAttempts) {
          break
        }
      } while (attempts < maxAttempts)

      // Добавляем id только при финальном размещении
      cluster.forEach(flower => {
        positions.push({
          ...flower,
          id: positions.length
        })
      })
    })
  })

  return positions
}

function generateStablePositions() {
  let seed = 12345
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }

  const originalRandom = Math.random
  Math.random = seededRandom

  const positions = generateClusteredPositions()

  Math.random = originalRandom

  return positions
}

const positions = generateStablePositions()

console.log('🤖 Сгенерировано позиций:', positions.length)
console.log('')
console.log('export const FLOWER_POSITIONS = [')
positions.forEach((pos, index) => {
  const comma = index < positions.length - 1 ? ',' : ''
  console.log(`  { id: ${pos.id}, xPercent: ${pos.xPercent.toFixed(2)}, yPercent: ${pos.yPercent.toFixed(2)} }${comma}`)
})
console.log(']')
