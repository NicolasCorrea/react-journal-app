import React from 'react'

export const JournalEntry = ({ id, title, body, date, imageUrl }) => {
  const newDate = new Date(date)
  return (
    <div className="journal__entry pointer">

      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage: 'url(https://earthsky.org/upl/2018/12/comet-wirtanen-Jack-Fusco-dec-2018-Anza-Borrego-desert-CA-e1544613895713.jpg)'
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">
          {title}
        </p>
        <p className="journal__entry-content">
          {body}
        </p>
      </div>

      <div className="journal__entry-date-box">
        <span>{newDate.toLocaleDateString(navigator.languages[0], { weekday: 'short' })}</span>
        <h4>{newDate.getDate()}</h4>
      </div>

    </div>
  )
}
