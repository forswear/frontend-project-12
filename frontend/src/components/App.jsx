import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import HomePage from './HomePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import SignupPage from './SignupPage.jsx'
import { PATHS } from '../routes'
import { checkAuthStatus } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthStatus())
  }, [dispatch])
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PATHS.LOGIN} element={<LoginPage />} />
        <Route path={PATHS.HOME} element={<HomePage />} />
        <Route path={PATHS.SIGNUP} element={<SignupPage />} />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={PATHS.NOT_FOUND} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
