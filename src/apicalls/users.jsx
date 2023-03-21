import firestoreDatabase from '../firebase'
import { collection, addDoc, getDoc, getDocs, query, where, doc } from 'firebase/firestore'
import CryptoJS from 'crypto-js'

export const CreateUser = async (payload) => {
  try {
    // check if user already exists using email
    const q = query(collection(firestoreDatabase, 'users'), where('email', '==', payload.email))
    const querySnapshot = await getDocs(q)
    if (querySnapshot.size > 0) {
      throw new Error('User already exists')
    }

    // encrypt password with hash password
    const hashedPassword = CryptoJS.AES.encrypt(payload.password, 'doctors-office').toString()
    payload.password = hashedPassword
    // create user

    const docRef = collection(firestoreDatabase, 'users')
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
    const q = query(collection(firestoreDatabase, 'users'), where('email', '==', payload.email))
    const userSnapshots = await getDocs(q)
    if (userSnapshots.size === 0) {
      throw new Error('User does not exist')
    }

    // decrypt password with hash password
    const user = userSnapshots.docs[0].data()
    user.id = userSnapshots.docs[0].id
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

export const GetAllUsers = async () => {
  try {
    const users = await getDocs(collection(firestoreDatabase, 'users'))
    return {
      success: true,
      data: users.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const GetUserById = async (id) => {
  try {
    const user = await getDoc(doc(firestoreDatabase, 'users', id))

    return {
      success: true,
      data: {
        ...user.data(),
        id: user.id
      }
    }
  } catch (error) {
    return error
  }
}
