import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
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
    // Генерируем координаты в процентах (0-100)
    // GardenField сам конвертирует их в пиксели на основе своих размеров
    const xPercent = 5 + Math.random() * 90  // 5%-95% по ширине
    const yPercent = 50 + Math.random() * 45  // 50%-95% по высоте

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

  return (
    <Router basename="/crocus">
      <div className="app">
        <nav className="navigation">
          <Link to="/" className="nav-link">🌼 Волшебный Сад</Link>
          <Link to="/add" className="nav-link">🌸 Добавить Цветок</Link>
        </nav>

        <Routes>
          <Route path="/" element={<GardenField flowers={flowers} onRemoveFlower={removeFlower} />} />
          <Route path="/add" element={<FlowerControls onAddFlower={addFlower} onRemoveFlower={removeFlower} onRemoveAllFlowers={removeAllFlowers} existingFlowers={flowers} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
