import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const localToken = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!localToken) {
      navigate('/login')
    }
  }, [localToken, navigate])

  return <h1>Home</h1>
}

export default HomePage
