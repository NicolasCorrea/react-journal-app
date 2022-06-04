import { types } from '../types'

/**
 * {
 *  notes: [},
 *  active: {
 *    id: '',
 *    title: '',
 *    body: '',
 *    imageUrl: '',
 *    date: '',
 *  } || null,
 * }
 */

const initialState = {
  notes: [],
  active: null
}

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.notesAddNew:
      return {
        ...state,
        notes: [...state.notes, action.payload]
      }
    case types.notesActive:
      return {
        ...state,
        active: { ...action.payload }
      }
    case types.notesUpdate:
      return {
        ...state,
        notes: state.notes.map(note => (note.id === action.payload.id ? action.payload.note : note))
      }
    case types.notesDelete:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload.id),
        active: null
      }
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload]
      }
    case types.notesLogoutCleanUp:
      return {
        ...state,
        notes: [],
        active: null
      }
    default:
      return state
  }
}
