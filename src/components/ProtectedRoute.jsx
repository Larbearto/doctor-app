import { useEffect } from 'react'
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
        <h2 className='text-xl cursor-pointer' onClick={() => navigate('/')}>
          <strong>Health Spot</strong>
        </h2>
        {user && (
          <div className='cursor-pointer flex gap-4'>
            <div className='flex gap-1 items-center'>
              <i className='ri-shield-user-line'></i>
              <h4 className='uppercase cursor-pointer' onClick={() => navigate('/profile')}>
                {user.name}
              </h4>
            </div>

            <i className='ri-login-circle-line'></i>
          </div>
        )}
      </div>
      <div className='content my-1'>{children}</div>
    </div>
  )
}

export default ProtectedRoute
