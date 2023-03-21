import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ShowLoader } from '../../redux/loaderSlice'
import { GetDoctorById } from '../../apicalls/doctors'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import moment from 'moment'
import { BookDoctorAppointment, GetDoctorAppointmentsByDate } from '../../apicalls/appointments'

function BookAppointment() {
  const [date, setDate] = useState('')
  const [doctor, setDoctor] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [bookedSlots, setBookedSlots] = useState([])

  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetDoctorById(id)
      dispatch(ShowLoader(false))
      if (response.success) {
        setDoctor(response.data)
        console.log(response.data)
      } else {
        message.error(response.message)
      }

      dispatch(ShowLoader(false))
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  const getSlotsData = () => {
    const day = moment(date).format('dddd')
    if (!doctor.days.includes(day)) {
      return <h3>Doctor is not available on {moment(date).format('MM-DD-YYYY')}</h3>
    }

    let startTime = moment(doctor.startTime, 'HH:mm')
    let endTime = moment(doctor.endTime, 'HH:mm')
    let slotDuration = 60 // in minutes
    const slots = []
    while (startTime < endTime) {
      // if (!bookedSlots?.find((slot) => slot.slot === startTime.format('HH:mm')))

      slots.push(startTime.format('HH:mm'))
      startTime.add(slotDuration, 'minutes')
    }
    return slots.map((slot) => {
      const isBooked = bookedSlots?.find((bookedSlot) => bookedSlot.slot === slot)
      return (
        <div
          className='bg-white p-1 border-2 rounded w-36 h-8 flex items-center justify-start cursor-pointer'
          onClick={() => setSelectedSlot(slot)}
          style={{
            border: selectedSlot === slot ? '3px solid blue' : '1px solid gray',
            backgroundColor: isBooked ? 'gray' : 'white',
            pointerEvents: isBooked ? 'none' : 'auto',
            cursor: isBooked ? 'not-allowed' : 'pointer',
            color: isBooked ? 'white' : 'black'
          }}>
          <span className=''>
            {moment(slot, 'HH:mm A').format('HH:mm A')} -{' '}
            {moment(slot, 'HH:mm A').add(slotDuration, 'minutes').format('HH:mm A')}
          </span>
        </div>
      )
    })
  }

  const onBookAppointment = async () => {
    try {
      dispatch(ShowLoader(true))
      const payload = {
        doctorId: doctor.id,
        userId: JSON.parse(localStorage.getItem('user')).id,
        date,
        slot: selectedSlot,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        userName: JSON.parse(localStorage.getItem('user')).name,
        bookedOn: moment().format('MM-DD-YYYY HH:mm a')
      }
      const response = await BookDoctorAppointment(payload)
      if (response.success) {
        message.success(response.message)
        navigate('/profile')
      } else {
        message.error(response.message)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  const getBookedSlots = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetDoctorAppointmentsByDate(id, date)
      dispatch(ShowLoader(false))
      if (response.success) {
        console.log(response.data)
        setBookedSlots(response.data)
      } else {
        message.error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [id])

  useEffect(() => {
    if (date) {
      getBookedSlots()
    }
  }, [date])

  return (
    doctor && (
      <div className='bg-white p-2 max-w-full w-full border-2 border-black'>
        <h1 className='text-2xl uppercase my-1'>
          <b>
            {doctor?.firstName} {doctor?.lastName}
          </b>
        </h1>
        <hr />

        <div className='flex flex-col gap-1 my-1 w-1/2'>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Specialty: </b>
            </h4>
            <h4>{doctor.speciality}</h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Experience : </b>
            </h4>
            <h4>{doctor.experience}</h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Email : </b>
            </h4>
            <h4>{doctor.email} Years</h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>phone : </b>
            </h4>
            <h4>{doctor.phone} </h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Fee : </b>
            </h4>
            <h4>${doctor.fee}/session</h4>
          </div>
          <div className='flex justify-between w-full'>
            <h4>
              <b>Days Available : </b>
            </h4>
            <h4>{doctor.days.join(',')}</h4>
          </div>
        </div>

        <hr />

        {/* Time Slots  */}
        <div className='flex flex-col gap-1 my-2 max-w-full w-full'>
          <div className='flex gap-2 w-[400px] items-end'>
            <div>
              <span>Select Date :</span>
              <input
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={moment().format('MM-DD-YYYY')}
              />
            </div>
          </div>

          <div className='flex flex-wrap gap-2 text-xs border items-center justify-start mt-5'>
            {date && getSlotsData()}
          </div>

          {selectedSlot && (
            <div className='flex gap-2 justify-center my-3'>
              <button
                onClick={() => navigate('/')}
                className='bg-red-500 rounded p-2 text-gray-200'>
                Cancel
              </button>
              <button onClick={onBookAppointment} className='bg-black p-2 rounded text-white'>
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    )
  )
}

export default BookAppointment
