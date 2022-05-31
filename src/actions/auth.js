import Swal from 'sweetalert2'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth'
import { auth, googleAuthProvider } from '../firebase'
import { types } from '../types'
import { uiFinishLoading, uiStartLoading } from './ui'

export const login = ({ uid, displayName, email }) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
      email
    }
  }
}

export const startLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch(uiStartLoading())
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      dispatch(login(user))
      dispatch(uiFinishLoading())
    } catch (error) {
      dispatch(uiFinishLoading())
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
}

export const signUp = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, { displayName: name })
      dispatch(login({ uid: user.uid, displayName: user.displayName, email: user.email }))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
}

export const startLoginGoogle = () => {
  return async (dispatch) => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider)
      const { user } = result
      dispatch(login({ uid: user.uid, displayName: user.displayName, email: user.email }))
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    try {
      await auth.signOut()
      dispatch(logout())
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }
}

export const logout = () => {
  return {
    type: types.logout
  }
}
