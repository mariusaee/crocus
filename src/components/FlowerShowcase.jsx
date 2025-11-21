import './FlowerShowcase.css'

function FlowerShowcase({ flower, onClose }) {
  if (!flower) return null

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flower-showcase-overlay" onClick={onClose}>
      <div className="flower-showcase-content" onClick={(e) => e.stopPropagation()}>
        <div className="showcase-flower">
          <img
            className="showcase-flower-image"
            src={`${import.meta.env.BASE_URL}${flower.flower}`}
            alt="Цветок"
          />
        </div>

        <div className="showcase-info">
          <h2 className="showcase-name">{flower.userName}</h2>
          <p className="showcase-date">Посажен: {formatDate(flower.plantDate)}</p>
        </div>

        <button className="showcase-close" onClick={onClose}>×</button>
      </div>
    </div>
  )
}

export default FlowerShowcase
