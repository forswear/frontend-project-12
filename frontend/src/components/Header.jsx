import React from 'react'
import { Button, Navbar, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogOut } from '../slices/authSlice.js'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

  const handleLogout = () => {
    dispatch(userLogOut())
    navigate('/login', { replace: true })
  }

  return (
    <Navbar bg="light" variant="light" className="border-bottom p-2">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('hexlet_chat')} {}
        </Navbar.Brand>
        {isAuthenticated ? (
          <Button
            variant="primary"
            onClick={handleLogout}
            className="float-end"
          >
            {t('logout')} {/* Перевод текста кнопки выхода */}
          </Button>
        ) : null}
      </Container>
    </Navbar>
  )
}

export default Header
