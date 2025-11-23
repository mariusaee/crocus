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
// Границы соответствуют красному прямоугольнику (2%-98% по X, 33%-98% по Y)
// Позиции генерируются с большим случайным смещением для хаотичного вида
export const FLOWER_POSITIONS = [
  { id: 0, xPercent: 7.57, yPercent: 36.85 },
  { id: 1, xPercent: 15.05, yPercent: 38.65 },
  { id: 2, xPercent: 26.16, yPercent: 39.28 },
  { id: 3, xPercent: 28.29, yPercent: 43.05 },
  { id: 4, xPercent: 45.59, yPercent: 36 },
  { id: 5, xPercent: 53.18, yPercent: 42.74 },
  { id: 6, xPercent: 51.38, yPercent: 37.67 },
  { id: 7, xPercent: 64.39, yPercent: 39.45 },
  { id: 8, xPercent: 70.9, yPercent: 39.9 },
  { id: 9, xPercent: 72.99, yPercent: 44 },
  { id: 10, xPercent: 88.62, yPercent: 43.9 },
  { id: 11, xPercent: 85.79, yPercent: 36.85 },
  { id: 12, xPercent: 3.86, yPercent: 52.57 },
  { id: 13, xPercent: 14.18, yPercent: 49.84 },
  { id: 14, xPercent: 16.71, yPercent: 54 },
  { id: 15, xPercent: 30.8, yPercent: 49.84 },
  { id: 16, xPercent: 39.05, yPercent: 48.51 },
  { id: 17, xPercent: 44.48, yPercent: 47.37 },
  { id: 18, xPercent: 48.57, yPercent: 46 },
  { id: 19, xPercent: 47.57, yPercent: 52.07 },
  { id: 20, xPercent: 66.17, yPercent: 51.42 },
  { id: 21, xPercent: 67.7, yPercent: 46 },
  { id: 22, xPercent: 68.38, yPercent: 48.17 },
  { id: 23, xPercent: 81.03, yPercent: 53.31 },
  { id: 24, xPercent: 88.39, yPercent: 50.33 },
  { id: 25, xPercent: 85.82, yPercent: 50.85 },
  { id: 26, xPercent: 11.47, yPercent: 57.45 },
  { id: 27, xPercent: 16.02, yPercent: 60.43 },
  { id: 28, xPercent: 20.67, yPercent: 60.47 },
  { id: 29, xPercent: 20.32, yPercent: 61.12 },
  { id: 30, xPercent: 27.61, yPercent: 64 },
  { id: 31, xPercent: 31.68, yPercent: 58.97 },
  { id: 32, xPercent: 45.48, yPercent: 56.33 },
  { id: 33, xPercent: 46.11, yPercent: 59.1 },
  { id: 34, xPercent: 53.31, yPercent: 60.49 },
  { id: 35, xPercent: 61.54, yPercent: 57.29 },
  { id: 36, xPercent: 63.13, yPercent: 63.51 },
  { id: 37, xPercent: 74, yPercent: 60.7 },
  { id: 38, xPercent: 81.54, yPercent: 56.29 },
  { id: 39, xPercent: 78.68, yPercent: 57.52 },
  { id: 40, xPercent: 91.84, yPercent: 59.09 },
  { id: 41, xPercent: 94.18, yPercent: 56.78 },
  { id: 42, xPercent: 9.33, yPercent: 70.85 },
  { id: 43, xPercent: 11.03, yPercent: 70.21 },
  { id: 44, xPercent: 20.78, yPercent: 70.48 },
  { id: 45, xPercent: 18.05, yPercent: 68.84 },
  { id: 46, xPercent: 34.56, yPercent: 69.32 },
  { id: 47, xPercent: 37.28, yPercent: 68.58 },
  { id: 48, xPercent: 41.76, yPercent: 68.46 },
  { id: 49, xPercent: 37.37, yPercent: 66 },
  { id: 50, xPercent: 46.03, yPercent: 73.89 },
  { id: 51, xPercent: 59, yPercent: 66 },
  { id: 52, xPercent: 60.99, yPercent: 71.6 },
  { id: 53, xPercent: 56.01, yPercent: 70.83 },
  { id: 54, xPercent: 62.86, yPercent: 66.76 },
  { id: 55, xPercent: 68.51, yPercent: 72.26 },
  { id: 56, xPercent: 75.5, yPercent: 67.71 },
  { id: 57, xPercent: 81.53, yPercent: 68.32 },
  { id: 58, xPercent: 81.34, yPercent: 66 },
  { id: 59, xPercent: 85.31, yPercent: 70.38 },
  { id: 60, xPercent: 4.31, yPercent: 81.23 },
  { id: 61, xPercent: 15.76, yPercent: 77.58 },
  { id: 62, xPercent: 19.56, yPercent: 84 },
  { id: 63, xPercent: 27.85, yPercent: 81.95 },
  { id: 64, xPercent: 27.73, yPercent: 76 },
  { id: 65, xPercent: 26.69, yPercent: 82.54 },
  { id: 66, xPercent: 30.34, yPercent: 82.75 },
  { id: 67, xPercent: 36.62, yPercent: 79.51 },
  { id: 68, xPercent: 47.21, yPercent: 79.51 },
  { id: 69, xPercent: 53.49, yPercent: 83.8 },
  { id: 70, xPercent: 46.77, yPercent: 76.57 },
  { id: 71, xPercent: 59.54, yPercent: 84 },
  { id: 72, xPercent: 60.97, yPercent: 78.17 },
  { id: 73, xPercent: 71.05, yPercent: 79.68 },
  { id: 74, xPercent: 69.06, yPercent: 84 },
  { id: 75, xPercent: 70.59, yPercent: 76 },
  { id: 76, xPercent: 76.05, yPercent: 78.65 },
  { id: 77, xPercent: 82.63, yPercent: 76.2 },
  { id: 78, xPercent: 84.27, yPercent: 80.19 },
  { id: 79, xPercent: 94.36, yPercent: 84 },
  { id: 80, xPercent: 3, yPercent: 87.68 },
  { id: 81, xPercent: 9.48, yPercent: 88.2 },
  { id: 82, xPercent: 15.34, yPercent: 86.32 },
  { id: 83, xPercent: 20.99, yPercent: 86.56 },
  { id: 84, xPercent: 28.19, yPercent: 89.74 },
  { id: 85, xPercent: 31.83, yPercent: 87.91 },
  { id: 86, xPercent: 34.5, yPercent: 94.66 },
  { id: 87, xPercent: 35.79, yPercent: 91.83 },
  { id: 88, xPercent: 42.98, yPercent: 88.09 },
  { id: 89, xPercent: 51.46, yPercent: 88.84 },
  { id: 90, xPercent: 52.56, yPercent: 90.85 },
  { id: 91, xPercent: 47.95, yPercent: 92.48 },
  { id: 92, xPercent: 58.71, yPercent: 87.09 },
  { id: 93, xPercent: 64.61, yPercent: 91.11 },
  { id: 94, xPercent: 70.84, yPercent: 94.41 },
  { id: 95, xPercent: 69.16, yPercent: 90.56 },
  { id: 96, xPercent: 75.46, yPercent: 89.37 },
  { id: 97, xPercent: 82.4, yPercent: 93.88 },
  { id: 98, xPercent: 84.66, yPercent: 89.17 },
  { id: 99, xPercent: 93.97, yPercent: 86.29 },
  { id: 100, xPercent: 94.67, yPercent: 86.45 }
]

export const MAX_FLOWERS = FLOWER_POSITIONS.length
