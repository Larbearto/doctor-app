import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useSelector((state) => state.user)

  const navigate = useNavigate()
  const location = useLocation()

  const userMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line'
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-calendar-line'
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?.id}`,
      icon: 'ri-hospital-line'
    }
  ]

  const doctorMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line'
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-calendar-line'
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?.id}`,
      icon: 'ri-hospital-line'
    }
  ]

  const adminMenu = [
    {
      name: 'Home',
      path: '/',
      icon: 'ri-home-line'
    },
    {
      name: 'Appointments',
      path: '/appointments',
      icon: 'ri-calendar-line'
    },
    {
      name: 'Profile',
      path: `/doctor/profile/${user?.id}`,
      icon: 'ri-hospital-line'
    }
  ]

  const menuToBeRendered = user ? isAdmin : user?.isDoctor ? doctorMenu : userMenu

  const role = user?.isAdmin ? 'Admin' : user?.isDoctor ? 'Doctor' : 'User'

  return (
    <div className='main'>
      <div className='flex layout'>
        <div className='sidebar'>
          <div className='sidebarHeader'>
            <h1 className='logo'>SH</h1>
            <h1 className='role'>{role}</h1>
          </div>

          <div className='menu'>
            {menuToBeRendered.map((item) => {
              const isActive = location.pathname === menu.path
              return (
                <div className={`flex menuItem ${isActive && 'activeMenuItem'}`}>
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name} </Link>}
                </div>
              )
            })}

            <div
              className={`flex menuItem`}
              onClick={() => {
                localStorage.clear()
                navigate('/login')
              }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
