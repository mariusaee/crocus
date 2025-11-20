import { useRef } from 'react'
import './GardenField.css'

function GardenField({ flowers, onRemoveFlower }) {
  const gardenRef = useRef(null)


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

      {/* Красный прямоугольник границ посадки */}
      <div style={{
        position: 'absolute',
        left: '2%',
        top: '33%',
        width: '96%',
        height: '65%',
        border: '3px solid red',
        pointerEvents: 'none',
        zIndex: 1000,
        boxSizing: 'border-box'
      }}></div>

      {/* Цветы */}
      {flowers.map((flower) => {
        // Не рендерим цветок, пока у него нет координат
        if (!flower.xPercent || !flower.yPercent) return null

        // Используем процентные координаты напрямую - браузер пересчитает их синхронно
        return (
          <div
            key={flower.id}
            className={`planted-item animation-${flower.animation}`}
            style={{ left: `${flower.xPercent}%`, top: `${flower.yPercent}%` }}
            onClick={() => handleFlowerClick(flower)}
            onMouseEnter={(e) => handleFlowerHover(e, flower)}
            onMouseLeave={handleFlowerLeave}
          >
            <img
              className={`flower-image sway-${flower.sway}`}
              src={`${import.meta.env.BASE_URL}${flower.flower}`}
              alt="Цветок"
            />
          </div>
        )
      })}


      {/* Тултип */}
      <div className="info-tooltip" id="tooltip"></div>
    </div>
  )
}

export default GardenField
