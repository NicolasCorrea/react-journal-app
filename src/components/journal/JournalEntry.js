import React from 'react'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions'

export const JournalEntry = ({ id, title, body, date, imageUrl }) => {
  const send = useDispatch()
  const newDate = new Date(date)

  const handleEntryClick = () => {
    send(activeNote({ id, note: { title, body, date, imageUrl } }))
  }
  return (
    <div className="journal__entry pointer" onClick={handleEntryClick}>
      {imageUrl && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${imageUrl})`
          }}
        ></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{newDate.toLocaleDateString(navigator.languages[0], { weekday: 'short' })}</span>
        <h4>{newDate.getDate()}</h4>
      </div>
    </div>
  )
}
