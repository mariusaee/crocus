import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FlowerControls.css'

const flowers = ['flower1.png', 'flower2.png']
const signs = ['sign1.png', 'sign2.png', 'sign3.png']
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

function FlowerControls({ onAddFlower, onRemoveFlower, onRemoveAllFlowers, onRemoveFirstFive, existingFlowers }) {
  const [userName, setUserName] = useState('')
  const [animationType, setAnimationType] = useState('random')
  const [swayType, setSwayType] = useState('random')
  const navigate = useNavigate()

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const getSelectedAnimation = () => {
    return animationType === 'random' ? getRandomElement(animations) : animationType
  }

  const getSelectedSwayType = () => {
    return swayType === 'random' ? getRandomElement(swayTypes) : swayType
  }

  const createFlowerComposition = (name) => {
    // Создаем только данные о цветке, без координат
    // Координаты будут добавлены в GardenField на основе его размеров
    const flowerData = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      flower: getRandomElement(flowers),
      sign: getRandomElement(signs),
      layout: Math.random() > 0.5 ? 'left-layout' : 'right-layout',
      animation: getSelectedAnimation(),
      sway: getSelectedSwayType(),
      userName: name,
      plantDate: new Date().toISOString()
    }

    onAddFlower(flowerData)
  }

  const plantRandomFlower = () => {
    if (!userName.trim()) {
      alert('🌷 Сначала введите ваше имя!')
      return
    }

    createFlowerComposition(userName.trim())
  }

  const plantRandomFlowers = () => {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        // Выбираем случайное имя из массива
        const randomName = randomNames[Math.floor(Math.random() * randomNames.length)]
        createFlowerComposition(randomName)
      }, i * 200)
    }
  }

  const plant100Flowers = () => {
    const confirmed = confirm('Посадить 100 цветков с номерами от 1 до 100? Это займёт около 20 секунд.')
    if (!confirmed) return

    for (let i = 1; i <= 100; i++) {
      setTimeout(() => {
        createFlowerComposition(String(i))
      }, (i - 1) * 200)
    }
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

  const removeFirstFive = () => {
    if (existingFlowers.length === 0) {
      alert('🌱 Сад пуст, нечего удалять!')
      return
    }

    const countToRemove = Math.min(5, existingFlowers.length)
    const confirmed = confirm(`Удалить ${countToRemove} самых старых цветов?`)
    if (confirmed) {
      onRemoveFirstFive()
      alert(`🗑️ Удалено ${countToRemove} цветов!`)
    }
  }

  return (
    <div className="flower-controls-container">
      <div className="controls-panel">
        <h1 className="panel-title">
          <span className="title-icon">🌻</span>
          Добавить Цветок
        </h1>

        <div className="control-group">
          <label htmlFor="userName">👤 Ваше Имя:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Введите имя..."
            maxLength={12}
            autoFocus
          />
        </div>

        <div className="control-group">
          <label htmlFor="animationType">🎭 Анимация посадки:</label>
          <select
            id="animationType"
            value={animationType}
            onChange={(e) => setAnimationType(e.target.value)}
          >
            <option value="random">🎲 Случайная</option>
            <option value="spiral">🌀 Спираль</option>
            <option value="bounce">⚡ Прыжок</option>
            <option value="zoom">🔍 Зум</option>
            <option value="flip">🔄 Переворот</option>
            <option value="elastic">🎯 Эластичная</option>
            <option value="wave">🌊 Волна</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="swayType">🍃 Покачивание:</label>
          <select
            id="swayType"
            value={swayType}
            onChange={(e) => setSwayType(e.target.value)}
          >
            <option value="random">🎲 Случайное</option>
            <option value="gentle">🌸 Нежное</option>
            <option value="wind">💨 Ветер</option>
            <option value="dance">💃 Танец</option>
            <option value="rotate">🔄 Вращение</option>
            <option value="bounce">⬆️ Подпрыгивание</option>
          </select>
        </div>

        <div className="button-group-panel">
          <button className="action-button add-one-button" onClick={plantRandomFlower}>
            🌺 Посадить 1 цветок
          </button>
          <button className="action-button random-button" onClick={plantRandomFlowers}>
            🌸 Посадить 5 случайных
          </button>
          <button className="action-button random-button" onClick={plant100Flowers}>
            🌻 Посадить 100 цветов
          </button>
          <button className="action-button remove-button" onClick={removeLastFlower}>
            🗑️ Удалить последний
          </button>
          <button className="action-button remove-button" onClick={removeFirstFive}>
            🧹 Удалить 5 старых
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
