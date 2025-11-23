import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MAX_FLOWERS } from '../utils/flowerPositions'
import './FlowerControls.css'

const flowers = ['flowerP.png', 'flowerPW.png', 'flowerW.png', 'flowerWYP.png', 'flowerY.png', 'flowerYP.png', 'flowerYW.png']
const animations = ['spiral', 'bounce', 'zoom', 'flip', 'elastic', 'wave']
const swayTypes = ['gentle', 'wind', 'dance', 'rotate', 'bounce']

// Случайные имена на латинице
const randomNames = [
  'Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry',
  'Ivy', 'Jack', 'Kate', 'Leo', 'Mia', 'Noah', 'Olivia', 'Peter',
  'Quinn', 'Rose', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xander',
  'Yara', 'Zoe', 'Alex', 'Blake', 'Chris', 'Dana', 'Eli', 'Finn',
  'Gabe', 'Hana', 'Ian', 'Jade', 'Kyle', 'Luna', 'Max', 'Nina',
  'Oscar', 'Pam', 'Quin', 'Rex', 'Sara', 'Tom', 'Uri', 'Vera',
  'Will', 'Xena', 'Yale', 'Zara', 'Ace', 'Bea', 'Cody', 'Demi',
  'Ezra', 'Faye', 'Gia', 'Hugo', 'Iris', 'Jude', 'Kira', 'Liam',
  'Maya', 'Nico', 'Owen', 'Piper', 'Reed', 'Sky', 'Theo', 'Ula'
]

function FlowerControls({ onAddFlower, onRemoveFlower, onRemoveAllFlowers, existingFlowers }) {
  const [userName, setUserName] = useState('')
  const navigate = useNavigate()

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const createFlowerComposition = (name) => {
    // Создаем только данные о цветке, без координат
    // Координаты будут добавлены в GardenField на основе его размеров
    const flowerData = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      flower: getRandomElement(flowers),
      animation: getRandomElement(animations),
      sway: getRandomElement(swayTypes),
      scale: 0.85 + Math.random() * 0.3, // Размер от 0.85 до 1.15
      flipped: Math.random() > 0.5, // 50% вероятность зеркального отражения
      userName: name,
      plantDate: new Date().toISOString()
    }

    onAddFlower(flowerData)
  }

  const plantRandomFlower = () => {
    if (existingFlowers.length >= MAX_FLOWERS) {
      alert(`🌻 Сад полон! Достигнут лимит в ${MAX_FLOWERS} цветов. Удалите старые цветы перед добавлением новых.`)
      return
    }

    if (!userName.trim()) {
      alert('🌷 Сначала введите ваше имя!')
      return
    }

    createFlowerComposition(userName.trim())
  }

  const removeLastFlower = () => {
    if (existingFlowers.length === 0) {
      alert('🌱 Сад пуст, нечего удалять!')
      return
    }

    // Находим самый новый цветок (последний посаженный)
    const sortedFlowers = [...existingFlowers].sort((a, b) => {
      const dateA = new Date(a.plantDate).getTime()
      const dateB = new Date(b.plantDate).getTime()
      return dateB - dateA // Сортируем от новых к старым
    })

    const lastFlower = sortedFlowers[0]
    const confirmed = confirm(`Удалить последний цветок "${lastFlower.userName}"?`)
    if (confirmed) {
      onRemoveFlower(lastFlower.id)
      alert(`🗑️ Цветок "${lastFlower.userName}" удалён!`)
    }
  }

  const removeAllFlowers = () => {
    if (existingFlowers.length === 0) {
      alert('🌱 Сад уже пуст!')
      return
    }

    const confirmed = confirm(`Вы уверены, что хотите удалить все ${existingFlowers.length} цветов? Это действие нельзя отменить!`)
    if (confirmed) {
      onRemoveAllFlowers()
      alert('🗑️ Все цветы удалены!')
    }
  }

  return (
    <div className="flower-controls-container">
      <div className="controls-panel">
        <h1 className="panel-title">
          <span className="title-icon">🌻</span>
          Добавить Цветок
        </h1>

        <div className="flower-counter" style={{
          textAlign: 'center',
          margin: '10px 0 20px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: existingFlowers.length >= MAX_FLOWERS ? '#d32f2f' : '#4caf50'
        }}>
          🌸 {existingFlowers.length} / {MAX_FLOWERS} цветов
          {existingFlowers.length >= MAX_FLOWERS && ' (сад полон!)'}
        </div>

        <div className="control-group">
          <label htmlFor="userName">👤 Ваше Имя:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                plantRandomFlower()
              }
            }}
            placeholder="Введите имя..."
            maxLength={12}
            autoFocus
          />
        </div>

        <div className="button-group-panel">
          <button className="action-button add-one-button" onClick={plantRandomFlower}>
            🌺 Посадить 1 цветок
          </button>
          <button className="action-button remove-button" onClick={removeLastFlower}>
            🗑️ Удалить последний
          </button>
          <button className="action-button remove-all-button" onClick={removeAllFlowers}>
            ❌ Удалить все
          </button>
          <button className="action-button view-list-btn" onClick={() => navigate('/')}>
            🌼 Посмотреть сад
          </button>
        </div>
      </div>
    </div>
  )
}

export default FlowerControls
