import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ref, onValue, set, remove } from 'firebase/database'
import { database } from './firebase'
import GardenField from './components/GardenField'
import FlowerControls from './components/FlowerControls'
import './App.css'

function App() {
  const [flowers, setFlowers] = useState([])

  // Подписка на изменения в Firebase в реальном времени
  useEffect(() => {
    const flowersRef = ref(database, 'flowers')

    const unsubscribe = onValue(flowersRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        // Конвертируем объект в массив
        const flowersArray = Object.keys(data).map(key => ({
          ...data[key],
          id: key
        }))
        setFlowers(flowersArray)
      } else {
        setFlowers([])
      }
    })

    // Отписываемся при размонтировании
    return () => unsubscribe()
  }, [])

  const addFlower = (flowerData) => {
    // Генерируем координаты в процентах с безопасными отступами от краев
    // и проверкой минимального расстояния до других цветов
    const minDistance = 12 // Минимальное расстояние в процентах между цветами
    const maxAttempts = 50 // Максимальное количество попыток найти свободное место

    let xPercent, yPercent
    let attempt = 0
    let positionFound = false

    // Пытаемся найти позицию с минимальным расстоянием от других цветов
    while (attempt < maxAttempts && !positionFound) {
      xPercent = 8 + Math.random() * 84  // 8%-92% по ширине (весь экран)
      yPercent = 52 + Math.random() * 46  // 52%-98% по высоте (вся область травы от горизонта до низа)

      // Проверяем расстояние до всех существующих цветов
      positionFound = true
      for (const flower of flowers) {
        // Используем процентные координаты или конвертируем старые пиксельные
        const flowerX = flower.xPercent !== undefined ? flower.xPercent : 50
        const flowerY = flower.yPercent !== undefined ? flower.yPercent : 70

        // Вычисляем расстояние между точками
        const distance = Math.sqrt(
          Math.pow(xPercent - flowerX, 2) +
          Math.pow(yPercent - flowerY, 2)
        )

        if (distance < minDistance) {
          positionFound = false
          break
        }
      }

      attempt++
    }

    const flowerWithPosition = {
      ...flowerData,
      xPercent,
      yPercent
    }

    // Сохраняем в Firebase
    const flowerRef = ref(database, `flowers/${flowerData.id}`)
    set(flowerRef, flowerWithPosition)
  }

  const removeFlower = (id) => {
    // Удаляем из Firebase
    const flowerRef = ref(database, `flowers/${id}`)
    remove(flowerRef)
  }

  const removeAllFlowers = () => {
    // Удаляем все цветы из Firebase
    const flowersRef = ref(database, 'flowers')
    remove(flowersRef)
  }

  const removeFirstFiveFlowers = () => {
    if (flowers.length === 0) return

    // Сортируем цветы по дате посадки (самые старые первыми)
    const sortedFlowers = [...flowers].sort((a, b) => {
      const dateA = new Date(a.plantDate).getTime()
      const dateB = new Date(b.plantDate).getTime()
      return dateA - dateB
    })

    // Берём первые 5 (или меньше, если цветов меньше 5)
    const flowersToRemove = sortedFlowers.slice(0, 5)

    // Удаляем каждый из них
    flowersToRemove.forEach(flower => {
      const flowerRef = ref(database, `flowers/${flower.id}`)
      remove(flowerRef)
    })
  }

  return (
    <Router basename="/crocus">
      <div className="app">
        <Routes>
          <Route path="/" element={<GardenField flowers={flowers} onRemoveFlower={removeFlower} />} />
          <Route path="/add" element={<FlowerControls onAddFlower={addFlower} onRemoveFlower={removeFlower} onRemoveAllFlowers={removeAllFlowers} onRemoveFirstFive={removeFirstFiveFlowers} existingFlowers={flowers} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
