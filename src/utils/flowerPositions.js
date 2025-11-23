// Предопределенные позиции для 101 цветка
// Соответствуют красному прямоугольнику границ посадки
// Распределение по 5 рядам для эффекта глубины
// Границы: X от 2% до 98%, Y от 48% до 98%

// Функция генерации позиций (использовалась один раз для создания массива)
function generatePositions() {
  const rows = [
    { yMin: 50, yMax: 60, count: 17 }, // Дальний план
    { yMin: 60, yMax: 70, count: 20 }, // Средний план
    { yMin: 70, yMax: 80, count: 22 },
    { yMin: 80, yMax: 90, count: 21 },
    { yMin: 90, yMax: 97, count: 21 }  // Ближний план
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

      // Добавляем большой jitter для хаотичного расположения
      const jitterX = (Math.random() - 0.5) * 14 // ±7%
      const jitterY = (Math.random() - 0.5) * 10 // ±5%

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
// Границы соответствуют красному прямоугольнику (2%-98% по X, 48%-98% по Y)
// Позиции генерируются с большим случайным смещением для хаотичного вида
export const FLOWER_POSITIONS = [
  { id: 0, xPercent: 10.80, yPercent: 59.00 },
  { id: 1, xPercent: 6.80, yPercent: 52.68 },
  { id: 2, xPercent: 23.25, yPercent: 54.45 },
  { id: 3, xPercent: 23.20, yPercent: 54.89 },
  { id: 4, xPercent: 31.77, yPercent: 51.36 },
  { id: 5, xPercent: 35.75, yPercent: 51.00 },
  { id: 6, xPercent: 43.33, yPercent: 51.00 },
  { id: 7, xPercent: 50.03, yPercent: 56.92 },
  { id: 8, xPercent: 43.27, yPercent: 58.91 },
  { id: 9, xPercent: 49.24, yPercent: 52.36 },
  { id: 10, xPercent: 65.94, yPercent: 55.51 },
  { id: 11, xPercent: 60.54, yPercent: 52.63 },
  { id: 12, xPercent: 68.51, yPercent: 56.57 },
  { id: 13, xPercent: 74.94, yPercent: 56.69 },
  { id: 14, xPercent: 82.84, yPercent: 57.12 },
  { id: 15, xPercent: 89.77, yPercent: 57.12 },
  { id: 16, xPercent: 86.04, yPercent: 51.20 },
  { id: 17, xPercent: 8.70, yPercent: 66.51 },
  { id: 18, xPercent: 16.81, yPercent: 62.96 },
  { id: 19, xPercent: 14.99, yPercent: 69.00 },
  { id: 20, xPercent: 26.49, yPercent: 62.08 },
  { id: 21, xPercent: 22.94, yPercent: 61.00 },
  { id: 22, xPercent: 26.11, yPercent: 61.00 },
  { id: 23, xPercent: 36.79, yPercent: 61.12 },
  { id: 24, xPercent: 44.03, yPercent: 64.30 },
  { id: 25, xPercent: 46.64, yPercent: 67.77 },
  { id: 26, xPercent: 44.04, yPercent: 63.95 },
  { id: 27, xPercent: 56.61, yPercent: 64.31 },
  { id: 28, xPercent: 62.69, yPercent: 63.27 },
  { id: 29, xPercent: 66.56, yPercent: 66.35 },
  { id: 30, xPercent: 61.43, yPercent: 61.00 },
  { id: 31, xPercent: 76.83, yPercent: 64.45 },
  { id: 32, xPercent: 80.28, yPercent: 66.12 },
  { id: 33, xPercent: 75.25, yPercent: 63.09 },
  { id: 34, xPercent: 82.54, yPercent: 63.92 },
  { id: 35, xPercent: 90.22, yPercent: 65.58 },
  { id: 36, xPercent: 96.77, yPercent: 62.93 },
  { id: 37, xPercent: 11.97, yPercent: 77.88 },
  { id: 38, xPercent: 17.55, yPercent: 72.44 },
  { id: 39, xPercent: 21.13, yPercent: 71.20 },
  { id: 40, xPercent: 16.84, yPercent: 79.00 },
  { id: 41, xPercent: 18.20, yPercent: 75.38 },
  { id: 42, xPercent: 30.17, yPercent: 79.00 },
  { id: 43, xPercent: 27.19, yPercent: 72.58 },
  { id: 44, xPercent: 32.42, yPercent: 78.82 },
  { id: 45, xPercent: 43.71, yPercent: 71.76 },
  { id: 46, xPercent: 39.59, yPercent: 72.47 },
  { id: 47, xPercent: 46.43, yPercent: 73.45 },
  { id: 48, xPercent: 50.02, yPercent: 77.07 },
  { id: 49, xPercent: 61.56, yPercent: 74.48 },
  { id: 50, xPercent: 65.05, yPercent: 73.15 },
  { id: 51, xPercent: 64.01, yPercent: 75.94 },
  { id: 52, xPercent: 61.86, yPercent: 71.32 },
  { id: 53, xPercent: 75.45, yPercent: 73.47 },
  { id: 54, xPercent: 77.01, yPercent: 72.49 },
  { id: 55, xPercent: 77.35, yPercent: 74.48 },
  { id: 56, xPercent: 90.04, yPercent: 72.61 },
  { id: 57, xPercent: 94.49, yPercent: 75.77 },
  { id: 58, xPercent: 95.55, yPercent: 78.45 },
  { id: 59, xPercent: 10.86, yPercent: 86.85 },
  { id: 60, xPercent: 5.06, yPercent: 81.00 },
  { id: 61, xPercent: 11.76, yPercent: 83.27 },
  { id: 62, xPercent: 14.61, yPercent: 86.26 },
  { id: 63, xPercent: 19.23, yPercent: 85.93 },
  { id: 64, xPercent: 33.42, yPercent: 81.85 },
  { id: 65, xPercent: 30.00, yPercent: 81.00 },
  { id: 66, xPercent: 37.65, yPercent: 85.89 },
  { id: 67, xPercent: 43.02, yPercent: 89.00 },
  { id: 68, xPercent: 41.54, yPercent: 87.05 },
  { id: 69, xPercent: 50.04, yPercent: 88.15 },
  { id: 70, xPercent: 55.09, yPercent: 85.22 },
  { id: 71, xPercent: 55.47, yPercent: 86.31 },
  { id: 72, xPercent: 65.05, yPercent: 86.83 },
  { id: 73, xPercent: 69.59, yPercent: 84.13 },
  { id: 74, xPercent: 68.98, yPercent: 85.58 },
  { id: 75, xPercent: 81.19, yPercent: 84.45 },
  { id: 76, xPercent: 83.95, yPercent: 88.20 },
  { id: 77, xPercent: 82.00, yPercent: 88.37 },
  { id: 78, xPercent: 88.10, yPercent: 81.00 },
  { id: 79, xPercent: 89.50, yPercent: 84.42 },
  { id: 80, xPercent: 3.23, yPercent: 91.89 },
  { id: 81, xPercent: 18.22, yPercent: 91.58 },
  { id: 82, xPercent: 11.08, yPercent: 91.72 },
  { id: 83, xPercent: 19.62, yPercent: 96.00 },
  { id: 84, xPercent: 30.04, yPercent: 92.84 },
  { id: 85, xPercent: 26.43, yPercent: 91.00 },
  { id: 86, xPercent: 34.00, yPercent: 96.00 },
  { id: 87, xPercent: 30.58, yPercent: 92.38 },
  { id: 88, xPercent: 45.66, yPercent: 95.00 },
  { id: 89, xPercent: 52.23, yPercent: 93.01 },
  { id: 90, xPercent: 53.70, yPercent: 92.78 },
  { id: 91, xPercent: 52.64, yPercent: 94.10 },
  { id: 92, xPercent: 63.57, yPercent: 91.00 },
  { id: 93, xPercent: 64.59, yPercent: 92.55 },
  { id: 94, xPercent: 68.86, yPercent: 91.00 },
  { id: 95, xPercent: 70.01, yPercent: 96.00 },
  { id: 96, xPercent: 82.37, yPercent: 92.81 },
  { id: 97, xPercent: 82.70, yPercent: 96.00 },
  { id: 98, xPercent: 89.02, yPercent: 96.00 },
  { id: 99, xPercent: 94.00, yPercent: 96.00 },
  { id: 100, xPercent: 94.41, yPercent: 96.00 }
]

export const MAX_FLOWERS = FLOWER_POSITIONS.length
