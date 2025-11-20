import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ref, onValue, set, remove } from 'firebase/database'
import { database } from './firebase'
import GardenField from './components/GardenField'
import FlowerControls from './components/FlowerControls'
import { FLOWER_POSITIONS, MAX_FLOWERS } from './utils/flowerPositions'
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
    // Проверяем лимит цветов
    if (flowers.length >= MAX_FLOWERS) {
      console.log('🤖 Достигнут лимит цветов:', MAX_FLOWERS)
      return null
    }

    // Получаем список занятых позиций
    const occupiedPositions = new Set(
      flowers.map(f => f.positionIndex).filter(idx => idx !== undefined)
    )

    // Находим первую свободную позицию
    let freePositionIndex = -1
    for (let i = 0; i < FLOWER_POSITIONS.length; i++) {
      if (!occupiedPositions.has(i)) {
        freePositionIndex = i
        break
      }
    }

    // Если нет свободных позиций, выходим
    if (freePositionIndex === -1) {
      console.log('🤖 Нет свободных позиций')
      return null
    }

    // Получаем координаты из предопределенной позиции
    const position = FLOWER_POSITIONS[freePositionIndex]

    const flowerWithPosition = {
      ...flowerData,
      positionIndex: freePositionIndex,
      xPercent: position.xPercent,
      yPercent: position.yPercent
    }

    // Сохраняем в Firebase
    const flowerRef = ref(database, `flowers/${flowerData.id}`)
    set(flowerRef, flowerWithPosition)

    return freePositionIndex
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
