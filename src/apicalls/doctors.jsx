import firestoreDatabase from '../firebase'
import { collection, addDoc, getDoc, setDoc, doc, getDocs, updateDoc } from 'firebase/firestore'
import { message } from 'antd'

export const AddDoctor = async (payload) => {
  // // check if field value is defined
  if (lastName === undefined) {
    console.error('this field value is undefined')
  }
  try {
    await setDoc(doc(firestoreDatabase, 'doctors', payload.userId), payload)

    // update user role
    await updateDoc(
      doc(firestoreDatabase, 'users', payload.userId),
      { role: 'doctor' },
      { merge: true }
    )
    return {
      success: true,
      message: 'Doctor added successfully, please wait for approval.'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const CheckIfDoctorAccountIsApplied = async (id) => {
  try {
    const doctors = await getDoc(
      query(collection(firestoreDatabase, 'doctors'), where('userId', '==', id))
    )

    if (doctors.size > 0) {
      return {
        success: true,
        message: 'Doctor account already applied'
      }
    }
    return {
      success: false,
      message: 'Doctor account not applied'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const GetAllDoctors = async () => {
  try {
    const doctors = await getDocs(collection(firestoreDatabase, 'doctors'))
    return {
      success: true,
      data: doctors.docs.map((doc) => {
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

export const UpdateDoctor = async (payload) => {
  try {
    await setDoc(doc(firestoreDatabase, 'doctors', payload.id), payload)
    return {
      success: true,
      message: 'Doctor updated successfully'
    }
  } catch (error) {
    return {
      success: false,
      message: error.message
    }
  }
}

export const GetDoctorById = async (id) => {
  try {
    const doctor = await getDoc(doc(firestoreDatabase, 'doctors', id))

    return {
      success: true,
      data: {
        ...doctor.data(),
        id: doctor.id
      }
    }
  } catch (error) {
    return error
  }
}
