import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ShowLoader } from '../../redux/loaderSlice'
import { GetAllDoctors, UpdateDoctor } from '../../apicalls/doctors'
import { Table, message } from 'antd'

function DoctorsList() {
  const [doctors, setDoctors] = useState([])

  const dispatch = useDispatch()
  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetAllDoctors()
      dispatch(ShowLoader(false))
      if (response.success) {
        setDoctors(response.data)
        console.log(response.data)
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  const changeStatus = async (payload) => {
    try {
      dispatch(ShowLoader(true))
      const response = await UpdateDoctor(payload)
      dispatch(ShowLoader(false))
      if (response.success) {
        message.success(response.message)
        getData()
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      message.error(error.message)
      dispatch(ShowLoader(false))
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName'
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Specialty',
      dataIndex: 'specialty'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => {
        return text.toUpperCase()
      }
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => {
        if (record.status === 'pending') {
          return (
            <div className='flex gap-1'>
              <span
                className='underline cursor-pointer'
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: 'rejected'
                  })
                }>
                Reject
              </span>

              <span
                className='underline cursor-pointer'
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: 'approved'
                  })
                }>
                Approve
              </span>
            </div>
          )
        }

        if (record.status === 'approved') {
          return (
            <div className='flex gap-1'>
              <span
                className='underline cursor-pointer'
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: 'blocked'
                  })
                }>
                Block
              </span>
            </div>
          )
        }

        if (record.status === 'blocked') {
          return (
            <div className='flex gap-1'>
              <span
                className='underline cursor-pointer'
                onClick={() =>
                  changeStatus({
                    ...record,
                    status: 'approved'
                  })
                }>
                Unblock
              </span>
            </div>
          )
        }
      }
    }
  ]
  return (
    <div>
      <Table dataSource={doctors} columns={columns} />
    </div>
  )
}

export default DoctorsList
