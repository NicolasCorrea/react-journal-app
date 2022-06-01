import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote } from '../../actions'

export const NotesAppBar = () => {
  const send = useDispatch()
  const { active } = useSelector(state => state.notes)
  const handleSave = () => {
    console.log(active)
    send(startSaveNote(active))
  }

  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <div>
        <button className="btn">Picture</button>

        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}
