import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCm2gKeYejA6MgyJv6B9kKCr423czZ0Bzk",
  authDomain: "react-app-7459d.firebaseapp.com",
  projectId: "react-app-7459d",
  storageBucket: "react-app-7459d.appspot.com",
  messagingSenderId: "381787248602",
  appId: "1:381787248602:web:f4fa59eb0dd363e37612e3",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, db, googleAuthProvider };
