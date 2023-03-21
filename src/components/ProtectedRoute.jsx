import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'

function ProtectedRoute({ children }) {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user) {
      navigate('/login')
    }
  }, [])

  return (
    <div className='layout p-2'>
      <div className='header p-2 flex justify-between items-center border-2 border-gray-200 shadow-xl rounded-md'>
        <h2 className='text-xl cursor-pointer text-green-800' onClick={() => navigate('/')}>
          <strong className='text-red-800'>Health </strong>Spot
        </h2>

        {user && (
          <div className='items-center flex gap-4'>
            <div className='flex gap-1 items-center'>
              <i className='ri-shield-user-line'></i>
              <h2 className='uppercase cursor-pointer' onClick={() => navigate('/profile')}>
                {user.name}
              </h2>
            </div>

            <i
              className='ri-login-circle-line'
              onClick={() => {
                localStorage.removeItem('user')
                navigate('/login')
              }}></i>
          </div>
        )}
      </div>
      <div className='content my-1'>{children}</div>
    </div>
  )
}

export default ProtectedRoute
