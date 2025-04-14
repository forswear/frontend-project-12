import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { selectCurrentToken } from '../slices/authSlice.js'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const localToken = useSelector(selectCurrentToken) // Используем Redux для получения токена
  const navigate = useNavigate()

  useEffect(() => {
    if (!localToken) {
      navigate('/login', { replace: true }) // Добавляем replace для предотвращения возврата
    }
  }, [localToken, navigate])

  return <h1>Welcome to Home Page</h1>
}

export default HomePage
