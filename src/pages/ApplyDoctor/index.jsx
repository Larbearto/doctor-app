import { Button, Form, Row, Col, message } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ShowLoader } from '../../redux/loaderSlice'
import { AddDoctor, CheckIfDoctorAccountIsApplied } from '../../apicalls/doctors'
import { useEffect } from 'react'
import moment from 'moment'

function ApplyDoctor() {
  const [days, setDays] = useState([])
  const [alreadyApplied, setAlreadyApplied] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const onFinish = async (values) => {
    values.days = days
    try {
      dispatch(ShowLoader(true))
      const payload = {
        ...values,
        days,
        userId: JSON.parse(localStorage.getItem('user')).id,
        status: 'pending',
        role: 'doctor'
      }
      const response = await AddDoctor(payload)
      if (response.success) {
        message.success(response.message)
        navigate('/profile')
      } else {
        message.error(response.message)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
      console.log('Success:', values)
    }
  }

  const checkIfAlreadyApplied = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await CheckIfDoctorAccountIsApplied(
        JSON.parse(localStorage.getItem('user')).id
      )
      if (response.success) {
        setAlreadyApplied(true)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    checkIfAlreadyApplied()
  }, [])

  return (
    <div className=''>
      {!alreadyApplied && (
        <>
          {' '}
          <h2 className='bg-white p-2 uppercase'>Apply for a Doctor Account</h2>
          <hr />
          <Form layout='vertical' onFinish={onFinish} className='my-1'>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <h3 className='bg-white p-1 uppercase'>Personal Information</h3>
              </Col>

              {/* personal information */}
              <Col span={8}>
                <Form.Item
                  label='First Name'
                  name='firstName'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='text' />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label='Last Name'
                  name='lastName'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='text' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Email'
                  name='email'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='email' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Phone'
                  name='phone'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Website'
                  name='website'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='text' />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label='Address'
                  name='address'
                  rules={[{ required: true, message: 'Required' }]}>
                  <textarea type='text' />
                </Form.Item>
              </Col>

              <hr />
              <Col span={24}>
                <h3 className='bg-white p-1 uppercase'>Professional Information</h3>
              </Col>

              {/* professional information */}
              <Col span={8}>
                <Form.Item
                  label='Speciality'
                  name='speciality'
                  rules={[{ required: true, message: 'Required' }]}>
                  <select>
                    <option value='dermatologist'>Dermatologist</option>
                    <option value='cardiologist'>Cardiologist</option>
                    <option value='gynecologist'>Gynecologist</option>
                    <option value='pediatrician'>Pediatrician</option>
                    <option value='psychiatrist'>Psychiatrist</option>
                    <option value='neurologist'>Neurologist</option>
                    <option value='urologist'>Urologist</option>
                    <option value='orthopedic'>Orthopedic</option>
                  </select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Experience'
                  name='experience'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='number' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='Qualifications'
                  name='qualifications'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='text' />
                </Form.Item>
              </Col>

              <Col span={24}>
                <hr />
              </Col>

              {/* // working hours */}
              <Col span={24}>
                <h3 className='bg-white p-1 uppercase'>Work Hours</h3>
              </Col>

              <Col span={8}>
                <Form.Item
                  label='Start Time'
                  name='startTime'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='time' />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label='End Time'
                  name='endTime'
                  rules={[{ required: true, message: 'Required' }]}>
                  <input type='time' />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label='Fee' name='fee' rules={[{ required: true, message: 'Required' }]}>
                  <input type='number' />
                </Form.Item>
              </Col>

              <Col span={24}>
                <div className='flex gap-2'>
                  {weekdays.map((day, index) => (
                    <div key={index} className='flex flex-col gap-2'>
                      <label htmlFor={day}>{day}</label>
                      <input type='checkbox' name={day} />
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            <div className='flex justify-end gap-2'>
              <button className='border-2 bg-black text-white py-2 px-3 rounded-full' type='button'>
                Cancel
              </button>

              <button className='border-2 bg-black text-white py-2 px-3 rounded-full' type='submit'>
                Submit
              </button>
            </div>
          </Form>
        </>
      )}
      {alreadyApplied && (
        <div className='flex flex-col gap-2 items-center'>
          <h3 className='text-2xl'>
            You have already applied for this job, please wait for the admin to approve your
            request.
          </h3>
        </div>
      )}
    </div>
  )
}

export default ApplyDoctor
