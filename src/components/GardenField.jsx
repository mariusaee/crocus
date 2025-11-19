import { useEffect, useRef } from 'react'
import './GardenField.css'

function GardenField({ flowers, onRemoveFlower }) {
  const gardenRef = useRef(null)

  useEffect(() => {
    // Убираем инструкции после первой посадки
    if (flowers.length > 0) {
      const instructions = document.querySelector('.instructions')
      if (instructions) {
        instructions.style.animation = 'fadeOut 0.5s forwards'
        setTimeout(() => instructions && instructions.remove(), 500)
      }
    }
  }, [flowers.length])

  const handleFlowerClick = (flower) => {
    if (confirm(`Удалить цветок "${flower.userName}"?`)) {
      onRemoveFlower(flower.id)
      playRemoveSound()
    }
  }

  const handleFlowerHover = (e, flower) => {
    const tooltip = document.getElementById('tooltip')
    if (tooltip) {
      tooltip.innerHTML = `
        <strong>${flower.userName}</strong><br>
        Посажен: ${new Date(flower.plantDate).toLocaleDateString('ru-RU')}<br>
        <small>Клик для удаления</small>
      `

      const rect = e.currentTarget.getBoundingClientRect()
      const gardenRect = gardenRef.current.getBoundingClientRect()

      tooltip.style.left = (rect.left - gardenRect.left + rect.width / 2) + 'px'
      tooltip.style.top = (rect.top - gardenRect.top - 10) + 'px'
      tooltip.classList.add('show')
    }
  }

  const handleFlowerLeave = () => {
    const tooltip = document.getElementById('tooltip')
    if (tooltip) {
      tooltip.classList.remove('show')
    }
  }

  const playRemoveSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)()
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.setValueAtTime(440, audioContext.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 0.3)

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)

      oscillator.start(audioContext.currentTime)
      oscillator.stop(audioContext.currentTime + 0.3)
    } catch (e) {}
  }

  return (
    <div className="garden-area" ref={gardenRef}>
      {/* Облака */}
      <div className="cloud cloud1"></div>
      <div className="cloud cloud2"></div>

      {/* Цветы */}
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className={`planted-item animation-${flower.animation}`}
          style={{ left: flower.x + 'px', top: flower.y + 'px' }}
          onClick={() => handleFlowerClick(flower)}
          onMouseEnter={(e) => handleFlowerHover(e, flower)}
          onMouseLeave={handleFlowerLeave}
        >
          <div className={`flower-sign-container ${flower.layout}`}>
            <div className="flower-wrapper">
              <img
                className={`flower-image sway-${flower.sway}`}
                src={`/${flower.flower}`}
                alt="Цветок"
              />
            </div>
            <div className="sign">
              <img className="sign-image" src={`/${flower.sign}`} alt="Табличка" />
              <div className="sign-text">{flower.userName}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Инструкции */}
      {flowers.length === 0 && (
        <div className="instructions">
          ✨ Перейдите на страницу "Добавить Цветок", чтобы посадить свой первый цветок! ✨<br />
          <small>Цветы будут отображаться здесь на волшебной поляне</small>
        </div>
      )}

      {/* Тултип */}
      <div className="info-tooltip" id="tooltip"></div>
    </div>
  )
}

export default GardenField
