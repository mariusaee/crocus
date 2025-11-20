// Предопределенные позиции для 101 цветка
// Оптимизировано для 4K экрана 75" (16:9)
// Распределение по 6 рядам для эффекта глубины

// Функция генерации позиций (использовалась один раз для создания массива)
function generatePositions() {
  const rows = [
    { yMin: 52, yMax: 60, count: 12 }, // Дальний план
    { yMin: 60, yMax: 68, count: 14 },
    { yMin: 68, yMax: 76, count: 16 }, // Средний план
    { yMin: 76, yMax: 84, count: 18 },
    { yMin: 84, yMax: 92, count: 20 },
    { yMin: 92, yMax: 98, count: 21 }  // Ближний план
  ]

  const positions = []
  let index = 0

  rows.forEach((row) => {
    const yCenter = (row.yMin + row.yMax) / 2
    const spacing = 84 / (row.count + 1) // 84% = доступная ширина (8% до 92%)

    for (let i = 0; i < row.count; i++) {
      // Базовая позиция с равномерным распределением
      const baseX = 8 + spacing * (i + 1)
      const baseY = yCenter

      // Добавляем небольшой jitter для органичности
      const jitterX = (Math.random() - 0.5) * 2 // ±1%
      const jitterY = (Math.random() - 0.5) * 3 // ±1.5%

      positions.push({
        id: index++,
        xPercent: Math.max(10, Math.min(90, baseX + jitterX)),
        yPercent: Math.max(row.yMin + 1, Math.min(row.yMax - 1, baseY + jitterY))
      })
    }
  })

  return positions
}

// Предопределенный массив из 101 позиции
export const FLOWER_POSITIONS = [
  { id: 0, xPercent: 14.46, yPercent: 55.32 },
  { id: 1, xPercent: 21.31, yPercent: 55.78 },
  { id: 2, xPercent: 28.85, yPercent: 56.21 },
  { id: 3, xPercent: 35.23, yPercent: 55.89 },
  { id: 4, xPercent: 42.54, yPercent: 56.45 },
  { id: 5, xPercent: 49.12, yPercent: 55.67 },
  { id: 6, xPercent: 56.89, yPercent: 56.12 },
  { id: 7, xPercent: 63.45, yPercent: 55.93 },
  { id: 8, xPercent: 70.78, yPercent: 56.34 },
  { id: 9, xPercent: 77.23, yPercent: 55.56 },
  { id: 10, xPercent: 84.12, yPercent: 56.08 },
  { id: 11, xPercent: 90.67, yPercent: 55.71 },

  { id: 12, xPercent: 12.89, yPercent: 63.45 },
  { id: 13, xPercent: 18.92, yPercent: 64.21 },
  { id: 14, xPercent: 25.67, yPercent: 63.87 },
  { id: 15, xPercent: 32.11, yPercent: 64.56 },
  { id: 16, xPercent: 38.78, yPercent: 63.92 },
  { id: 17, xPercent: 45.34, yPercent: 64.33 },
  { id: 18, xPercent: 51.89, yPercent: 63.78 },
  { id: 19, xPercent: 58.56, yPercent: 64.45 },
  { id: 20, xPercent: 65.12, yPercent: 63.67 },
  { id: 21, xPercent: 71.89, yPercent: 64.12 },
  { id: 22, xPercent: 78.34, yPercent: 63.89 },
  { id: 23, xPercent: 84.92, yPercent: 64.23 },
  { id: 24, xPercent: 90.23, yPercent: 63.56 },
  { id: 25, xPercent: 89.78, yPercent: 64.78 },

  { id: 26, xPercent: 13.21, yPercent: 71.89 },
  { id: 27, xPercent: 18.78, yPercent: 72.34 },
  { id: 28, xPercent: 24.56, yPercent: 71.67 },
  { id: 29, xPercent: 30.23, yPercent: 72.45 },
  { id: 30, xPercent: 36.12, yPercent: 71.78 },
  { id: 31, xPercent: 41.89, yPercent: 72.21 },
  { id: 32, xPercent: 47.67, yPercent: 71.56 },
  { id: 33, xPercent: 53.34, yPercent: 72.34 },
  { id: 34, xPercent: 59.12, yPercent: 71.89 },
  { id: 35, xPercent: 64.78, yPercent: 72.12 },
  { id: 36, xPercent: 70.56, yPercent: 71.45 },
  { id: 37, xPercent: 76.23, yPercent: 72.23 },
  { id: 38, xPercent: 81.89, yPercent: 71.67 },
  { id: 39, xPercent: 87.45, yPercent: 72.34 },
  { id: 40, xPercent: 90.12, yPercent: 71.89 },
  { id: 41, xPercent: 11.67, yPercent: 72.56 },

  { id: 42, xPercent: 12.45, yPercent: 79.78 },
  { id: 43, xPercent: 17.23, yPercent: 80.34 },
  { id: 44, xPercent: 22.89, yPercent: 79.89 },
  { id: 45, xPercent: 28.34, yPercent: 80.56 },
  { id: 46, xPercent: 33.78, yPercent: 79.67 },
  { id: 47, xPercent: 39.45, yPercent: 80.21 },
  { id: 48, xPercent: 44.89, yPercent: 79.78 },
  { id: 49, xPercent: 50.56, yPercent: 80.45 },
  { id: 50, xPercent: 56.12, yPercent: 79.89 },
  { id: 51, xPercent: 61.67, yPercent: 80.23 },
  { id: 52, xPercent: 67.23, yPercent: 79.56 },
  { id: 53, xPercent: 72.78, yPercent: 80.34 },
  { id: 54, xPercent: 78.45, yPercent: 79.78 },
  { id: 55, xPercent: 84.12, yPercent: 80.21 },
  { id: 56, xPercent: 89.34, yPercent: 79.67 },
  { id: 57, xPercent: 11.89, yPercent: 80.45 },
  { id: 58, xPercent: 16.45, yPercent: 79.92 },
  { id: 59, xPercent: 90.78, yPercent: 80.12 },

  { id: 60, xPercent: 12.34, yPercent: 87.89 },
  { id: 61, xPercent: 16.78, yPercent: 88.34 },
  { id: 62, xPercent: 21.45, yPercent: 87.67 },
  { id: 63, xPercent: 26.12, yPercent: 88.45 },
  { id: 64, xPercent: 30.67, yPercent: 87.78 },
  { id: 65, xPercent: 35.34, yPercent: 88.21 },
  { id: 66, xPercent: 40.12, yPercent: 87.56 },
  { id: 67, xPercent: 44.67, yPercent: 88.34 },
  { id: 68, xPercent: 49.34, yPercent: 87.89 },
  { id: 69, xPercent: 53.89, yPercent: 88.12 },
  { id: 70, xPercent: 58.45, yPercent: 87.45 },
  { id: 71, xPercent: 63.12, yPercent: 88.23 },
  { id: 72, xPercent: 67.78, yPercent: 87.67 },
  { id: 73, xPercent: 72.34, yPercent: 88.34 },
  { id: 74, xPercent: 76.89, yPercent: 87.78 },
  { id: 75, xPercent: 81.45, yPercent: 88.21 },
  { id: 76, xPercent: 86.12, yPercent: 87.56 },
  { id: 77, xPercent: 90.45, yPercent: 88.12 },
  { id: 78, xPercent: 10.89, yPercent: 87.89 },
  { id: 79, xPercent: 15.23, yPercent: 88.45 },

  { id: 80, xPercent: 11.78, yPercent: 94.67 },
  { id: 81, xPercent: 15.89, yPercent: 95.21 },
  { id: 82, xPercent: 20.12, yPercent: 94.78 },
  { id: 83, xPercent: 24.45, yPercent: 95.34 },
  { id: 84, xPercent: 28.67, yPercent: 94.56 },
  { id: 85, xPercent: 32.89, yPercent: 95.12 },
  { id: 86, xPercent: 37.23, yPercent: 94.89 },
  { id: 87, xPercent: 41.45, yPercent: 95.45 },
  { id: 88, xPercent: 45.78, yPercent: 94.67 },
  { id: 89, xPercent: 50.12, yPercent: 95.23 },
  { id: 90, xPercent: 54.34, yPercent: 94.78 },
  { id: 91, xPercent: 58.67, yPercent: 95.34 },
  { id: 92, xPercent: 62.89, yPercent: 94.56 },
  { id: 93, xPercent: 67.12, yPercent: 95.21 },
  { id: 94, xPercent: 71.45, yPercent: 94.89 },
  { id: 95, xPercent: 75.67, yPercent: 95.12 },
  { id: 96, xPercent: 79.89, yPercent: 94.67 },
  { id: 97, xPercent: 84.23, yPercent: 95.34 },
  { id: 98, xPercent: 88.45, yPercent: 94.78 },
  { id: 99, xPercent: 90.89, yPercent: 95.23 },
  { id: 100, xPercent: 10.23, yPercent: 94.89 }
]

export const MAX_FLOWERS = FLOWER_POSITIONS.length
