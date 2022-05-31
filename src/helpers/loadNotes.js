import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/config'

export const loadNotes = async ({ id }) => {
  const notesSnap = await getDocs(collection(db, `${id}`, 'journal/notes'))
  const notes = []
  notesSnap.forEach(note => {
    notes.push({
      id: note.id,
      ...note.data()
    })
  })
  return notes
}
