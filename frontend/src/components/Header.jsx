import React from 'react'
import { Button, Navbar, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { userLogOut } from '../slices/authSlice.js'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Header = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userLogOut())
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
