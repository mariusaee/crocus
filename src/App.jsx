import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import GuestList from './components/GuestList'
import AddGuest from './components/AddGuest'
import './App.css'

function App() {
  const [guests, setGuests] = useState([])

  // Загрузка гостей из localStorage при загрузке
  useEffect(() => {
    const savedGuests = localStorage.getItem('guests')
    if (savedGuests) {
      setGuests(JSON.parse(savedGuests))
    }
  }, [])

  // Сохранение гостей в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('guests', JSON.stringify(guests))
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
