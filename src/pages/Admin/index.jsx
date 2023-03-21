import { Tabs } from 'antd'
import UsersList from './UsersList'
import DoctorsList from './DoctorsList'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ShowLoader } from '../../redux/loaderSlice'
import { GetUserById } from '../../apicalls/users'
import { useState } from 'react'
import { message } from 'antd'

function AdminIndex() {
  const [isAdmin, setIsAdmin] = useState(false)
  const user = JSON.parse(localStorage.getItem('user'))
  const dispatch = useDispatch()

  const checkIsAdmin = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetUserById(user.id)
      dispatch(ShowLoader(false))
      if (response.success && response.data.role === 'admin') {
        setIsAdmin(true)
      } else {
        throw new Error('You are not an admin')
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    checkIsAdmin()
  }, [])

  return (
    isAdmin && (
      <div>
        <Tabs>
          <Tabs.TabPane tab='Users' key='1'>
            <UsersList />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Doctors' key='2'>
            <DoctorsList />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  )
}

export default AdminIndex
