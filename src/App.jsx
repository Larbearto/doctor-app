import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Spinner from './components/Spinner'
import { useSelector } from 'react-redux'

function App() {
  const { loading } = useSelector((state) => state.loader)
  return (
    <div className='App'>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route
            path='/'
            element={
              <ProtectedRoute>
                <Home />
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
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
