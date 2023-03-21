import { Button, Form, Input } from 'antd'
import { CreateUser } from '../../apicalls/users'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { ShowLoader } from '../../redux/loaderSlice'

function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoader(true))
      const response = await CreateUser({
        ...values,
        role: 'user'
      })
      dispatch(ShowLoader(false))
      if (response.success) {
        toast.success(response.message)
        navigate('/login')
      } else {
        throw new Error(response.message)
      }
    } catch (error) {
      dispatch(ShowLoader(false))
      toast.error('Something went wrong')
    }
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      navigate('/')
    }
  }, [])

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='w-[400px] border-2 border-black p-2'>
        <h1 className='text-center'>Sign Up</h1>
        <Form layout='vertical' onFinish={onFinish}>
          <Form.Item name='name' label='Name'>
            <Input type='text' />
          </Form.Item>

          <Form.Item name='email' label='Email'>
            <Input type='email' />
          </Form.Item>

          <Form.Item name='password' label='Password'>
            <Input type='password' />
          </Form.Item>

          <button type='submit' className='contained-btn bg-black text-white p-2 rounded-xl w-full'>
            REGISTER
          </button>
        </Form>
        <div className='cursor-pointer pt-8'>
          <Link to='/login' className=' '>
            Already signed up? <strong>Log in</strong>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
