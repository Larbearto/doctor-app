// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBNBeEFPRnXe1b2dGEZwE96buXs7f2mXHc',
  authDomain: 'doctors-office-afd8c.firebaseapp.com',
  projectId: 'doctors-office-afd8c',
  storageBucket: 'doctors-office-afd8c.appspot.com',
  messagingSenderId: '563714424147',
  appId: '1:563714424147:web:db2ca992ddbb0f87aab5a6',
  measurementId: 'G-V77BS1NKT9'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export default db
