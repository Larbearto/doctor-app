import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GetAllDoctors } from '../../apicalls/doctors'
import { ShowLoader } from '../../redux/loaderSlice'
import { Col, Row, message } from 'antd'

function Home() {
  const [doctors, setDoctors] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetAllDoctors()
      if (response.success) {
        setDoctors(response.data)
      } else {
        message.error(response.message)
      }
      dispatch(ShowLoader(false))
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='flex flex-col w-full bg-gray-200 h-screen'>
      <div className='w-full flex justify-between'>
        <input
          placeholder='Search doctors'
          className='w-[400px] border-2 py-1 pl-2 border-gray-400 flex items-center justify-center'
        />

        <button
          className='outlined-btn  bg-black py-2 px-3 rounded-full text-white'
          onClick={() => navigate('/doctorapply')}>
          Apply Doctor
        </button>
      </div>

      <Row
        gutter={[16, 16]}
        className='my-1'>
        {doctors.map((doctor, index) => {
          return (
            <Col span={8}>
              <div
                key={index}
                className='flex-col w-full p-1 flex drop-shadow-lg shadow-gray-500 border  bg-white rounded gap-1 uppercase cursor-pointer'
                onClick={() => navigate(`/bookappointment/${doctor.id}`)}>
                <div className='flex justify-between w-full  '>
                  <h2 className='text-2xl w-full'>
                    {doctor.firstName} {doctor.lastName}
                  </h2>
                </div>
                <hr />
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
              </div>
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Home
