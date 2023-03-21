import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ShowLoader } from '../../redux/loaderSlice'
import { GetAllUsers } from '../../apicalls/users'
import { Table } from 'antd'

function UsersList() {
  const [users, setUsers] = useState([])

  const dispatch = useDispatch()
  const getData = async () => {
    try {
      dispatch(ShowLoader(true))
      const response = await GetAllUsers()
      dispatch(ShowLoader(false))
      if (response.success) {
        setUsers(response.data)
        console.log(response.data)
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      message.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id'
    },
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => <span>{role.toUpperCase()}</span>
    },
    {
      title: 'Status',
      dataIndex: 'status'
    }
  ]
  return (
    <div>
      <Table columns={columns} dataSource={users} />
    </div>
  )
}

export default UsersList
