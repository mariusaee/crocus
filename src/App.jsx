import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import GardenField from './components/GardenField'
import FlowerControls from './components/FlowerControls'
import './App.css'

function App() {
  const [flowers, setFlowers] = useState([])

  // Функция для загрузки цветов из localStorage
  const loadFlowers = () => {
    const savedFlowers = localStorage.getItem('magicGardenData')
    if (savedFlowers) {
      const parsedFlowers = JSON.parse(savedFlowers)
      setFlowers(parsedFlowers)
    }
  }

  // Загрузка цветов из localStorage при загрузке
  useEffect(() => {
    loadFlowers()
  }, [])

  // Сохранение цветов в localStorage при изменении
  useEffect(() => {
    if (flowers.length > 0) {
      localStorage.setItem('magicGardenData', JSON.stringify(flowers))
    }
  }, [flowers])

  // Реактивное обновление при изменении localStorage в других вкладках
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'magicGardenData') {
        loadFlowers()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const addFlower = (flowerData) => {
    setFlowers([...flowers, flowerData])
  }

  const removeFlower = (id) => {
    setFlowers(flowers.filter(flower => flower.id !== id))
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
          <Route path="/add" element={<FlowerControls onAddFlower={addFlower} onRemoveFlower={removeFlower} existingFlowers={flowers} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
