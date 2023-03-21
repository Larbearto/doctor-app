import firestoreDatabase from '../firebase'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

export const BookDoctorAppointment = async (payload) => {
  try {
    await addDoc(collection(firestoreDatabase, 'appointments'), payload)
    return { success: true, message: 'Appointment booked successfully' }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const GetDoctorAppointmentsByDate = async (doctorId, date) => {
  try {
    const querySnapShot = await getDocs(
      query(
        collection(firestoreDatabase, 'appointments'),
        where('doctorId', '==', doctorId),
        where('date', '==', date)
      )
    )
    const data = []
    querySnapShot.forEach((doc) => {
      data.push(doc.data())
    })
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}
