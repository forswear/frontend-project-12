import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import NotFoundPage from './NotFoundPage'
import SignupPage from './SignupPage'
import { PATHS } from '../routes'
import { useSelector } from 'react-redux'
import { initializeSocket, disconnectSocket } from '../socket'

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const token = useSelector((state) => state.auth.user.token)

  useEffect(() => {
    if (isAuthenticated && token) {
      initializeSocket(token)
    }

    return () => {
      if (isAuthenticated) {
        disconnectSocket()
      }
    }
  }, [isAuthenticated, token])

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
