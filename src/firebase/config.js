// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCgQ5adG0Up-XcRoTuiGFlff1c7yjmhGNg',
  authDomain: 'journal-app-b30f4.firebaseapp.com',
  projectId: 'journal-app-b30f4',
  storageBucket: 'journal-app-b30f4.appspot.com',
  messagingSenderId: '506449853157',
  appId: '1:506449853157:web:f591906d2ac90b3c38b20c',
  measurementId: 'G-T97VBM32BG'
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleAuthProvider = new GoogleAuthProvider()

export const analytics = getAnalytics(app)
