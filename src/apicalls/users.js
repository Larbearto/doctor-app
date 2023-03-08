import db from '../firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import CryptoJS from 'crypto-js'

export const CreateUser = async (payload) => {
  try {
    // check if user already exists using email
    const q = query(collection(db, 'users'), where('email', '==', payload.email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size > 0) {
      throw new Error('User already exists')
    }

    // encrypt password with hash password
    const hashedPassword = CryptoJS.AES.encrypt(payload.password, 'doctors-office').toString()
    payload.password = hashedPassword
    // create user

    const docRef = collection(db, 'users')
    const doc = await addDoc(docRef, payload)

    return {
      success: true,
      message: 'User created successfully'
    }
  } catch (error) {
    return error
  }
}

export const LoginUser = async (payload) => {
  try {
    // check if user already exists using email
    const q = query(collection(db, 'users'), where('email', '==', payload.email))
    const userSnapshots = await getDocs(q)
    if (userSnapshots.size === 0) {
      throw new Error('User does not exist')
    }

    // decrypt password with hash password
    const user = userSnapshots.docs[0].data()
    const bytes = CryptoJS.AES.decrypt(user.password, 'doctors-office')
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

    if (originalPassword !== payload.password) {
      throw new Error('Incorrect password')
    }

    return {
      success: true,
      message: 'User logged in successfully',
      data: user
    }
  } catch (error) {
    return error
  }
}
