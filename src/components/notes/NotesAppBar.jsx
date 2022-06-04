import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUpload } from '../../actions'

export const NotesAppBar = () => {
  const send = useDispatch()
  const { active } = useSelector(state => state.notes)
  const handleSave = () => {
    console.log(active)
    send(startSaveNote(active))
  }

  const handlePicture = () => {
    document.querySelector('#fileSelector').click()
  }

  const handleFileChange = e => {
    const file = e.target.files[0]
    if (file) {
      send(startUpload(file))
    }
  }
  return (
    <div className="notes__appbar">
      <span>28 de agosto 2020</span>

      <input type="file" name="file" id="fileSelector" hidden onChange={handleFileChange} />

      <div>
        <button className="btn" onClick={handlePicture}>
          Picture
        </button>

        <button className="btn" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  )
}
