import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase/config'
import { types } from '../types'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { auth: { uid } } = getState()
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    try {
      const noteRef = await addDoc(collection(db, `${uid}`, 'journal/notes'), newNote)
      dispatch(activeNote({ id: noteRef.id, note: newNote }))
    } catch (error) {
      console.log(error)
    }
  }
}

export const activeNote = ({ id, note }) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  }
})

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})
