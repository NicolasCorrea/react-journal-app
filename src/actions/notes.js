import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { db } from '../firebase/config'
import { fileUpload } from '../helpers'
import { loadNotes } from '../helpers/loadNotes'
import { types } from '../types'

export const startNewNote = () => {
  return async (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState()
    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }
    try {
      const noteRef = await addDoc(collection(db, `${uid}`, 'journal/notes'), newNote)
      dispatch(activeNote({ id: noteRef.id, note: newNote }))
      dispatch(addNote({ id: noteRef.id, ...newNote }))
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

export const startSetNotes = uid => {
  return async dispatch => {
    try {
      const notes = await loadNotes({ id: uid })
      dispatch(setNotes(notes))
    } catch (error) {
      console.log(error)
    }
  }
}

export const setNotes = notes => ({
  type: types.notesLoad,
  payload: notes
})

export const addNote = note => ({
  type: types.notesAddNew,
  payload: note
})

export const startSaveNote = note => {
  return async (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState()
    try {
      // remove undifined elements from note
      const cleanNote = { ...note }

      Object.keys(cleanNote).forEach(key => cleanNote[key] === undefined && delete cleanNote[key])

      const noteToUpdate = { ...cleanNote }
      delete noteToUpdate.id

      const noteRef = await doc(db, `${uid}`, 'journal/notes/', note.id)

      await updateDoc(noteRef, noteToUpdate)
      dispatch(updateNote(note.id, cleanNote))
      Swal.fire('Saved!', note.title, 'success')
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateNote = (id, note) => ({
  type: types.notesUpdate,
  payload: {
    id,
    note
  }
})

export const startUpload = file => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait',
      allowOutsideClick: false,
      onBeforeOpen: () => {
        Swal.showLoading()
      }
    })

    const fileUrl = await fileUpload(file)
    const newActiveNote = { ...activeNote, imageUrl: fileUrl }
    dispatch(startSaveNote(newActiveNote))

    console.log(fileUrl)
    Swal.close()
  }
}

export const startDeleteNote = note => {
  return async (dispatch, getState) => {
    const {
      auth: { uid }
    } = getState()
    try {
      await deleteDoc(doc(db, `${uid}`, 'journal/notes/', note.id))
      dispatch(deleteNote(note.id))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteNote = id => ({
  type: types.notesDelete,
  payload: {
    id
  }
})

export const notesLogoutCleanUp = () => ({
  type: types.notesLogoutCleanUp
})
