import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FlowerControls.css'

const flowers = ['flower1.png', 'flower2.png']
const signs = ['sign1.png', 'sign2.png', 'sign3.png']
const animations = ['spiral', 'bounce', 'zoom', 'flip', 'elastic', 'wave']
const swayTypes = ['gentle', 'wind', 'dance', 'rotate', 'bounce']

function FlowerControls({ onAddFlower, existingFlowers }) {
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!userName.trim()) {
      alert('Пожалуйста, введите имя!')
      return
    }

    // Генерируем случайные координаты
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Случайная позиция в нижней части экрана (где трава)
    const x = 100 + Math.random() * (viewportWidth - 200)
    const y = viewportHeight * 0.5 + Math.random() * (viewportHeight * 0.4)

    const flowerData = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      x: x,
      y: y,
      flower: getRandomElement(flowers),
      sign: getRandomElement(signs),
      layout: Math.random() > 0.5 ? 'left-layout' : 'right-layout',
      animation: getRandomElement(animations),
      sway: getRandomElement(swayTypes),
      userName: userName.trim(),
      plantDate: new Date().toISOString()
    }

    onAddFlower(flowerData)
    setUserName('')

    // Переходим на главную страницу для просмотра
    setTimeout(() => navigate('/'), 500)
  }

  return (
    <div className="simple-add-container">
      <form onSubmit={handleSubmit} className="simple-form">
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Введите имя..."
          maxLength={12}
          autoFocus
          className="simple-input"
        />

        <button type="submit" className="simple-button">
          Добавить
        </button>
      </form>
    </div>
  )
}

export default FlowerControls
