import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AddGuest.css'

function AddGuest({ addGuest }) {
  const [name, setName] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      addGuest(name.trim())
      setName('')
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
    }
  }

  return (
    <div className="add-guest-container">
      <h1 className="title">Добавить Гостя</h1>

      <form onSubmit={handleSubmit} className="add-guest-form">
        <div className="form-group">
          <label htmlFor="guest-name">Имя гостя</label>
          <input
            type="text"
            id="guest-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя..."
            className="guest-input"
            autoFocus
          />
        </div>

        <button type="submit" className="add-btn" disabled={!name.trim()}>
          Добавить
        </button>

        {showSuccess && (
          <div className="success-message">
            ✓ Гость успешно добавлен!
          </div>
        )}
      </form>

      <button onClick={() => navigate('/')} className="view-list-btn">
        Посмотреть список гостей
      </button>
    </div>
  )
}

export default AddGuest
