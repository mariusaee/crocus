import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import GuestList from './components/GuestList'
import AddGuest from './components/AddGuest'
import './App.css'

function App() {
  const [guests, setGuests] = useState([])

  // Функция для загрузки гостей из localStorage
  const loadGuests = () => {
    const savedGuests = localStorage.getItem('guests')
    if (savedGuests) {
      const parsedGuests = JSON.parse(savedGuests)
      setGuests(parsedGuests)
    }
  }

  // Загрузка гостей из localStorage при загрузке
  useEffect(() => {
    loadGuests()
  }, [])

  // Сохранение гостей в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('guests', JSON.stringify(guests))
  }, [guests])

  // Автоматическое обновление: слушатель события storage (для синхронизации между вкладками)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'guests') {
        loadGuests()
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Автоматическое обновление: периодическая проверка каждые 2 секунды
  useEffect(() => {
    const interval = setInterval(() => {
      const savedGuests = localStorage.getItem('guests')
      if (savedGuests) {
        const parsedGuests = JSON.parse(savedGuests)
        // Обновляем только если данные изменились
        if (JSON.stringify(parsedGuests) !== JSON.stringify(guests)) {
          setGuests(parsedGuests)
        }
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [guests])

  const addGuest = (name) => {
    const newGuest = {
      id: Date.now(),
      name: name,
      timestamp: new Date().toLocaleString('ru-RU')
    }
    setGuests([...guests, newGuest])
  }

  const deleteGuest = (id) => {
    setGuests(guests.filter(guest => guest.id !== id))
  }

  return (
    <Router basename="/crocus">
      <div className="app">
        <nav className="navigation">
          <Link to="/" className="nav-link">Список Гостей</Link>
          <Link to="/add" className="nav-link">Добавить Гостя</Link>
        </nav>

        <Routes>
          <Route path="/" element={<GuestList guests={guests} deleteGuest={deleteGuest} />} />
          <Route path="/add" element={<AddGuest addGuest={addGuest} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
