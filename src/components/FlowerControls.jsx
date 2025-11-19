import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './FlowerControls.css'

const flowers = ['flower-1.png', 'flower-2.png']
const signs = ['1.png', '2.png', '3.png']
const animations = ['spiral', 'bounce', 'zoom', 'flip', 'elastic', 'wave']
const swayTypes = ['gentle', 'wind', 'dance', 'rotate', 'bounce']
const particleTypes = ['star', 'petal', 'sparkle', 'heart', 'butterfly']

function FlowerControls({ onAddFlower, existingFlowers }) {
  const [userName, setUserName] = useState('')
  const [animationType, setAnimationType] = useState('random')
  const [swayType, setSwayType] = useState('random')
  const [showSuccess, setShowSuccess] = useState(false)
  const gardenRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Предзагрузка изображений
    flowers.forEach(f => {
      const img = new Image()
      img.src = `${import.meta.env.BASE_URL}${f}`
    })
    signs.forEach(s => {
      const img = new Image()
      img.src = `${import.meta.env.BASE_URL}${s}`
    })
  }, [])

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)]

  const getSelectedAnimation = () => {
    return animationType === 'random' ? getRandomElement(animations) : animationType
  }

  const getSelectedSwayType = () => {
    return swayType === 'random' ? getRandomElement(swayTypes) : swayType
  }

  const plantFlower = (event) => {
    if (event.target.closest('.planted-item')) {
      return
    }

    if (!userName.trim()) {
      const input = document.getElementById('userName')
      input.style.animation = 'shake 0.5s'
      input.style.borderColor = '#ff6b6b'
      setTimeout(() => {
        input.style.animation = ''
        input.style.borderColor = 'transparent'
      }, 500)
      showNotification('🌷 Пожалуйста, введите ваше имя!')
      return
    }

    const garden = gardenRef.current
    const rect = garden.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    // Проверка границ
    if (x < 60 || x > rect.width - 60 || y < 40 || y > rect.height - 80) {
      showNotification('🌻 Посадите цветок подальше от края!')
      return
    }

    // Проверка на близость к другим цветам
    const minDistance = 100
    const tooClose = existingFlowers.some(item => {
      const dx = item.x - x
      const dy = item.y - y
      return Math.sqrt(dx * dx + dy * dy) < minDistance
    })

    if (tooClose) {
      showNotification('🌺 Слишком близко к другой композиции!')
      return
    }

    createFlowerComposition(x, y, userName.trim())
  }

  const createFlowerComposition = (x, y, name) => {
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

    // Создаем частицы
    createParticles(x, y)

    // Звук
    playPlantSound()

    // Показываем успех
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)

    showNotification(`🌸 Цветок "${name}" посажен!`)
  }

  const plantRandomFlowers = () => {
    if (!userName.trim()) {
      showNotification('🌷 Сначала введите ваше имя!')
      return
    }

    const garden = gardenRef.current
    const rect = garden.getBoundingClientRect()
    let planted = 0
    let attempts = 0
    const maxAttempts = 50

    const plantInterval = setInterval(() => {
      if (planted >= 5 || attempts >= maxAttempts) {
        clearInterval(plantInterval)
        if (planted > 0) {
          showNotification(`🌻 Посажено ${planted} цветов!`)
        } else {
          showNotification('😔 Не хватает места для новых цветов!')
        }
        return
      }

      attempts++

      const x = 60 + Math.random() * (rect.width - 120)
      const y = 40 + Math.random() * (rect.height - 120)

      const minDistance = 100
      const tooClose = existingFlowers.some(item => {
        const dx = item.x - x
        const dy = item.y - y
        return Math.sqrt(dx * dx + dy * dy) < minDistance
      })

      if (!tooClose) {
        createFlowerComposition(x, y, userName.trim())
        planted++
      }
    }, 200)
  }

  const createParticles = (x, y) => {
    const garden = gardenRef.current
    const particleCount = 8 + Math.floor(Math.random() * 5)

    for (let i = 0; i < particleCount; i++) {
      setTimeout(() => {
        const particle = document.createElement('div')
        const type = getRandomElement(particleTypes)

        particle.className = `particle particle-${type}`

        const offsetX = (Math.random() - 0.5) * 40
        const offsetY = (Math.random() - 0.5) * 40

        particle.style.left = (x + offsetX) + 'px'
        particle.style.top = (y + offsetY) + 'px'
        particle.style.transform = `rotate(${Math.random() * 360}deg)`

        garden.appendChild(particle)

        const duration = type === 'butterfly' ? 3000 : 2000
        setTimeout(() => particle.remove(), duration)
      }, i * 60)
    }
  }

  const playPlantSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      const notes = [261.63, 329.63, 392, 523.25]
      const noteIndex = Math.floor(Math.random() * notes.length)

      oscillator.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(notes[(noteIndex + 1) % notes.length], audioContext.currentTime + 0.1)

      gainNode.gain.setValueAtTime(0.12, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.4)
    } catch (e) {}
  }

  const showNotification = (message) => {
    const existing = document.querySelector('.notification')
    if (existing) existing.remove()

    const notification = document.createElement('div')
    notification.className = 'notification'
    notification.innerHTML = message
    document.body.appendChild(notification)

    setTimeout(() => {
      notification.style.animation = 'notificationFade 0.5s ease-out'
      setTimeout(() => notification.remove(), 500)
    }, 2500)
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
          <button className="action-button random-button" onClick={plantRandomFlowers}>
            🌸 Посадить 5 цветов
          </button>
          <button className="action-button view-list-btn" onClick={() => navigate('/')}>
            🌼 Посмотреть сад
          </button>
        </div>

        {showSuccess && (
          <div className="success-message">
            ✓ Цветок успешно посажен!
          </div>
        )}
      </div>

      <div className="interactive-garden" ref={gardenRef} onClick={plantFlower}>
        {/* Облака */}
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>

        {/* Временные цветы для визуализации */}
        {existingFlowers.map((flower) => (
          <div
            key={flower.id}
            className="planted-item-preview"
            style={{ left: flower.x + 'px', top: flower.y + 'px' }}
          >
            <div className={`flower-sign-container ${flower.layout}`}>
              <div className="flower-wrapper">
                <img
                  className={`flower-image sway-${flower.sway}`}
                  src={`${import.meta.env.BASE_URL}${flower.flower}`}
                  alt="Цветок"
                />
              </div>
              <div className="sign">
                <img className="sign-image" src={`${import.meta.env.BASE_URL}${flower.sign}`} alt="Табличка" />
                <div className="sign-text">{flower.userName}</div>
              </div>
            </div>
          </div>
        ))}

        <div className="instructions">
          ✨ Нажмите на поляну, чтобы посадить цветок с вашим именем! ✨<br />
          <small>Выберите анимацию или позвольте магии решить!</small>
        </div>
      </div>
    </div>
  )
}

export default FlowerControls
