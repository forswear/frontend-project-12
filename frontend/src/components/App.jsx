import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './LoginPage.jsx'
import HomePage from './HomePage.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import SignupPage from './SignupPage.jsx'
import { PATHS } from '../routes'
import { useSelector } from 'react-redux'

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PATHS.HOME}
          element={
            isAuthenticated ? (
              <HomePage />
            ) : (
              <Navigate to={PATHS.LOGIN} replace />
            )
          }
        />
        <Route
          path={PATHS.LOGIN}
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={PATHS.HOME} replace />
            )
          }
        />
        <Route
          path={PATHS.SIGNUP}
          element={
            !isAuthenticated ? (
              <SignupPage />
            ) : (
              <Navigate to={PATHS.HOME} replace />
            )
          }
        />
        <Route path={PATHS.NOT_FOUND} element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to={PATHS.NOT_FOUND} replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
