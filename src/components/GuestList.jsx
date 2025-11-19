import './GuestList.css'

function GuestList({ guests, deleteGuest }) {
  return (
    <div className="guest-list-container">
      <div className="header">
        <h1 className="title">Список Гостей</h1>
        <div className="auto-update-badge">🔄 Автообновление</div>
      </div>

      {guests.length === 0 ? (
        <p className="empty-message">Пока нет гостей. Добавьте первого гостя!</p>
      ) : (
        <div className="table-wrapper">
          <table className="guest-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Время добавления</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr key={guest.id}>
                  <td>{index + 1}</td>
                  <td className="guest-name">{guest.name}</td>
                  <td className="guest-time">{guest.timestamp}</td>
                  <td>
                    <button
                      onClick={() => deleteGuest(guest.id)}
                      className="delete-btn"
                      aria-label="Удалить гостя"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="guest-count">
        Всего гостей: <strong>{guests.length}</strong>
      </div>
    </div>
  )
}

export default GuestList
