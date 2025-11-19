import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './FlowerControls.css'

const flowers = ['flower1.png', 'flower2.png']
const signs = ['sign1.png', 'sign2.png', 'sign3.png']
const animations = ['spiral', 'bounce', 'zoom', 'flip', 'elastic', 'wave']
const swayTypes = ['gentle', 'wind', 'dance', 'rotate', 'bounce']

function FlowerControls({ onAddFlower, onRemoveAllFlowers, existingFlowers }) {
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
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    const x = 100 + Math.random() * (viewportWidth - 200)
    const y = viewportHeight * 0.5 + Math.random() * (viewportHeight * 0.4)

    const flowerData = {
      id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
      x: x,
      y: y,
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
    if (!userName.trim()) {
      alert('🌷 Сначала введите ваше имя!')
      return
    }

    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createFlowerComposition(userName.trim())
      }, i * 200)
    }
  }

  const removeLastFlower = () => {
    if (existingFlowers.length === 0) {
      alert('🌱 Сад пуст, нечего удалять!')
      return
    }

    const lastFlower = existingFlowers[existingFlowers.length - 1]
    alert(`🗑️ Чтобы удалить цветок "${lastFlower.userName}", перейдите в Волшебный Сад и кликните на него`)
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
            🌸 Посадить 5 цветов
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
