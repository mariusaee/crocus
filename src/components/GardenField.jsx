import { useRef, useEffect } from 'react'
import './GardenField.css'

function GardenField({ flowers, onRemoveFlower, highlightedFlowerId, onClearHighlight }) {
  const gardenRef = useRef(null)
  const highlightedRef = useRef(null)

  // Эффект для фокусировки на новом цветке
  useEffect(() => {
    if (highlightedFlowerId && highlightedRef.current) {
      // Небольшая задержка для завершения рендера
      setTimeout(() => {
        highlightedRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        })

        // Убираем подсветку через 4 секунды
        setTimeout(() => {
          onClearHighlight?.()
        }, 4000)
      }, 100)
    }
  }, [highlightedFlowerId, onClearHighlight])

  // Конвертируем процентные координаты в пиксельные
  const getPixelPosition = (flower) => {
    if (!gardenRef.current) return { x: 0, y: 0 }

    const gardenWidth = gardenRef.current.clientWidth
    const gardenHeight = gardenRef.current.clientHeight

    // Если есть старые координаты в пикселях (для обратной совместимости)
    if (flower.x !== undefined && flower.y !== undefined) {
      return { x: flower.x, y: flower.y }
    }

    // Конвертируем проценты в пиксели
    const x = (flower.xPercent / 100) * gardenWidth
    const y = (flower.yPercent / 100) * gardenHeight

    return { x, y }
  }


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
      {flowers.map((flower) => {
        const { x, y } = getPixelPosition(flower)
        const isHighlighted = flower.id === highlightedFlowerId
        return (
          <div
            key={flower.id}
            ref={isHighlighted ? highlightedRef : null}
            className={`planted-item animation-${flower.animation} ${isHighlighted ? 'highlighted-flower' : ''}`}
            style={{ left: x + 'px', top: y + 'px' }}
            onClick={() => handleFlowerClick(flower)}
            onMouseEnter={(e) => handleFlowerHover(e, flower)}
            onMouseLeave={handleFlowerLeave}
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
        )
      })}


      {/* Тултип */}
      <div className="info-tooltip" id="tooltip"></div>
    </div>
  )
}

export default GardenField
