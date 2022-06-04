import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleteNote } from '../../actions'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
  const { active } = useSelector(state => state.notes)
  const send = useDispatch()
  const { id, title, body, values, handleInputChange, reset } = useForm(active)

  const handleDelete = () => {
    send(startDeleteNote(active))
  }

  useEffect(() => {
    if (id !== active.id) {
      reset(active)
    }
  }, [active, id, reset])

  useEffect(() => {
    send(activeNote({ id: values.id, note: { ...values } }))
  }, [values, send])
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          autoComplete="off"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          value={body}
          name="body"
          onChange={handleInputChange}
          placeholder="What happened today"
          className="notes__textarea"
        ></textarea>
        {active.imageUrl && (
          <div className="notes__image">
            <img
              src={active.imageUrl}
              alt="imagen"
            />
          </div>
        )}
      </div>

      <button className='btn btn-danger' onClick={handleDelete}>delete</button>
    </div>
  )
}
