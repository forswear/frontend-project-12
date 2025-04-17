import { Button, Navbar, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom' // Добавляем хук useNavigate
import { userLogOut } from '../slices/authSlice.js'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate() // Инициализируем useNavigate

  const handleLogout = () => {
    dispatch(userLogOut()) // Выполняем логаут
    navigate('/login', { replace: true }) // Редирект на страницу входа
  }

  return (
    <Navbar bg="light" variant="light" className="border-bottom p-2">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('hexlet_chat')}
        </Navbar.Brand>
        <Button variant="primary" onClick={handleLogout} className="float-end">
          {t('logout')}
        </Button>
      </Container>
    </Navbar>
  )
}

export default Header
