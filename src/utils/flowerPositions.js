// Предопределенные позиции для 101 цветка
// Соответствуют красному прямоугольнику границ посадки
// Распределение по 6 рядам для эффекта глубины
// Границы: X от 2% до 98%, Y от 33% до 98%

// Функция генерации позиций (использовалась один раз для создания массива)
function generatePositions() {
  const rows = [
    { yMin: 35, yMax: 45, count: 12 }, // Дальний план
    { yMin: 45, yMax: 55, count: 14 },
    { yMin: 55, yMax: 65, count: 16 }, // Средний план
    { yMin: 65, yMax: 75, count: 18 },
    { yMin: 75, yMax: 85, count: 20 },
    { yMin: 85, yMax: 97, count: 21 }  // Ближний план
  ]

  const positions = []
  let index = 0

  rows.forEach((row) => {
    const yCenter = (row.yMin + row.yMax) / 2
    const spacing = 94 / (row.count + 1) // 94% = доступная ширина (от 2% до 96%)

    for (let i = 0; i < row.count; i++) {
      // Базовая позиция с равномерным распределением
      const baseX = 3 + spacing * (i + 1)
      const baseY = yCenter

      // Добавляем небольшой jitter для органичности
      const jitterX = (Math.random() - 0.5) * 2 // ±1%
      const jitterY = (Math.random() - 0.5) * 3 // ±1.5%

      positions.push({
        id: index++,
        xPercent: Math.max(3, Math.min(97, baseX + jitterX)),
        yPercent: Math.max(row.yMin + 1, Math.min(row.yMax - 1, baseY + jitterY))
      })
    }
  })

  return positions
}

// Предопределенный массив из 101 позиции
// Границы соответствуют красному прямоугольнику (2%-98% по X, 33%-98% по Y)
export const FLOWER_POSITIONS = [
  { id: 0, xPercent: 10.06, yPercent: 40.21 },
  { id: 1, xPercent: 16.51, yPercent: 39.97 },
  { id: 2, xPercent: 24.86, yPercent: 40.51 },
  { id: 3, xPercent: 31.68, yPercent: 39.19 },
  { id: 4, xPercent: 38.73, yPercent: 40.16 },
  { id: 5, xPercent: 46.11, yPercent: 40.9 },
  { id: 6, xPercent: 54.46, yPercent: 38.86 },
  { id: 7, xPercent: 60.6, yPercent: 38.68 },
  { id: 8, xPercent: 68.08, yPercent: 41.18 },
  { id: 9, xPercent: 75.51, yPercent: 39.68 },
  { id: 10, xPercent: 83.49, yPercent: 39.39 },
  { id: 11, xPercent: 89.53, yPercent: 40.68 },

  { id: 12, xPercent: 8.62, yPercent: 50.27 },
  { id: 13, xPercent: 14.61, yPercent: 48.7 },
  { id: 14, xPercent: 21.31, yPercent: 49.75 },
  { id: 15, xPercent: 27.61, yPercent: 51.32 },
  { id: 16, xPercent: 34.01, yPercent: 50.43 },
  { id: 17, xPercent: 40.39, yPercent: 51.47 },
  { id: 18, xPercent: 47.03, yPercent: 48.64 },
  { id: 19, xPercent: 52.87, yPercent: 50.56 },
  { id: 20, xPercent: 58.66, yPercent: 50.62 },
  { id: 21, xPercent: 65.16, yPercent: 49.64 },
  { id: 22, xPercent: 71.77, yPercent: 49.06 },
  { id: 23, xPercent: 78.45, yPercent: 51.01 },
  { id: 24, xPercent: 83.99, yPercent: 50.07 },
  { id: 25, xPercent: 90.67, yPercent: 50.78 },

  { id: 26, xPercent: 8.72, yPercent: 58.99 },
  { id: 27, xPercent: 13.67, yPercent: 59.32 },
  { id: 28, xPercent: 20.51, yPercent: 58.68 },
  { id: 29, xPercent: 25.99, yPercent: 61.35 },
  { id: 30, xPercent: 30.94, yPercent: 60.99 },
  { id: 31, xPercent: 36.82, yPercent: 61.23 },
  { id: 32, xPercent: 41.61, yPercent: 60.38 },
  { id: 33, xPercent: 47.19, yPercent: 60.61 },
  { id: 34, xPercent: 52.49, yPercent: 60.59 },
  { id: 35, xPercent: 57.95, yPercent: 61.38 },
  { id: 36, xPercent: 64.27, yPercent: 59.33 },
  { id: 37, xPercent: 69.77, yPercent: 61 },
  { id: 38, xPercent: 74.3, yPercent: 59.49 },
  { id: 39, xPercent: 80.5, yPercent: 59.78 },
  { id: 40, xPercent: 85.83, yPercent: 61.21 },
  { id: 41, xPercent: 91.18, yPercent: 60.03 },

  { id: 42, xPercent: 7.76, yPercent: 68.91 },
  { id: 43, xPercent: 13.15, yPercent: 70.26 },
  { id: 44, xPercent: 18.59, yPercent: 69.41 },
  { id: 45, xPercent: 22.56, yPercent: 68.88 },
  { id: 46, xPercent: 26.75, yPercent: 68.74 },
  { id: 47, xPercent: 31.99, yPercent: 69.88 },
  { id: 48, xPercent: 38.42, yPercent: 69.69 },
  { id: 49, xPercent: 42.73, yPercent: 70.16 },
  { id: 50, xPercent: 47.57, yPercent: 69.12 },
  { id: 51, xPercent: 53.33, yPercent: 68.51 },
  { id: 52, xPercent: 57.94, yPercent: 71.05 },
  { id: 53, xPercent: 62.81, yPercent: 69.6 },
  { id: 54, xPercent: 66.87, yPercent: 68.69 },
  { id: 55, xPercent: 73.09, yPercent: 71.28 },
  { id: 56, xPercent: 76.31, yPercent: 71.09 },
  { id: 57, xPercent: 82.43, yPercent: 69.59 },
  { id: 58, xPercent: 87.14, yPercent: 69.39 },
  { id: 59, xPercent: 91.98, yPercent: 69.55 },

  { id: 60, xPercent: 7.93, yPercent: 79.53 },
  { id: 61, xPercent: 12.6, yPercent: 79.05 },
  { id: 62, xPercent: 15.57, yPercent: 78.82 },
  { id: 63, xPercent: 20.37, yPercent: 80.56 },
  { id: 64, xPercent: 24.95, yPercent: 79.07 },
  { id: 65, xPercent: 30.71, yPercent: 81.44 },
  { id: 66, xPercent: 33.66, yPercent: 79.35 },
  { id: 67, xPercent: 38.02, yPercent: 80.94 },
  { id: 68, xPercent: 42.32, yPercent: 80.68 },
  { id: 69, xPercent: 48.07, yPercent: 78.56 },
  { id: 70, xPercent: 53.05, yPercent: 79.87 },
  { id: 71, xPercent: 57.32, yPercent: 79.65 },
  { id: 72, xPercent: 60.91, yPercent: 78.69 },
  { id: 73, xPercent: 66.01, yPercent: 80.97 },
  { id: 74, xPercent: 70.6, yPercent: 80.54 },
  { id: 75, xPercent: 74.71, yPercent: 79.67 },
  { id: 76, xPercent: 79.8, yPercent: 79.53 },
  { id: 77, xPercent: 83.66, yPercent: 80.36 },
  { id: 78, xPercent: 87.75, yPercent: 79.34 },
  { id: 79, xPercent: 93.34, yPercent: 80.27 },

  { id: 80, xPercent: 7.58, yPercent: 91.64 },
  { id: 81, xPercent: 11.22, yPercent: 91.39 },
  { id: 82, xPercent: 16.34, yPercent: 89.71 },
  { id: 83, xPercent: 19.15, yPercent: 90.02 },
  { id: 84, xPercent: 23.83, yPercent: 92.08 },
  { id: 85, xPercent: 29.55, yPercent: 90.44 },
  { id: 86, xPercent: 32.82, yPercent: 90.18 },
  { id: 87, xPercent: 36.86, yPercent: 91.25 },
  { id: 88, xPercent: 42.26, yPercent: 92.4 },
  { id: 89, xPercent: 45.77, yPercent: 91.86 },
  { id: 90, xPercent: 50.13, yPercent: 90.52 },
  { id: 91, xPercent: 53.3, yPercent: 89.56 },
  { id: 92, xPercent: 59.07, yPercent: 92.49 },
  { id: 93, xPercent: 62.01, yPercent: 90.68 },
  { id: 94, xPercent: 66.14, yPercent: 92.37 },
  { id: 95, xPercent: 71.27, yPercent: 90.76 },
  { id: 96, xPercent: 76.09, yPercent: 90.19 },
  { id: 97, xPercent: 79.75, yPercent: 91.93 },
  { id: 98, xPercent: 85.01, yPercent: 91.51 },
  { id: 99, xPercent: 87.75, yPercent: 91.88 },
  { id: 100, xPercent: 93.39, yPercent: 90.55 }
]

export const MAX_FLOWERS = FLOWER_POSITIONS.length
