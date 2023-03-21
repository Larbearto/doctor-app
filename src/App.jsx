import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ApplyDoctor from './pages/ApplyDoctor'
import AdminIndex from './pages/Admin'
import BookAppointment from './pages/BookAppointment'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path='/applydoctor'
            element={
              <ProtectedRoute>
                <ApplyDoctor />
              </ProtectedRoute>
            }
          />

          <Route
            path='/profile'
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path='/bookappointment/:id'
            element={
              <ProtectedRoute>
                <BookAppointment />
              </ProtectedRoute>
            }
          />

          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <AdminIndex />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
