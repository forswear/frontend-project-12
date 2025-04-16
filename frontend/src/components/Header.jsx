import React from 'react'
import { Button, Navbar, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { userLogOut } from '../slices/authSlice.js'
import { Link } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userLogOut())
  }

  return (
    <Navbar bg="light" variant="light" className="border-bottom p-2">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        <Button variant="primary" onClick={handleLogout} className="float-end">
          Выйти
        </Button>
      </Container>
    </Navbar>
  )
}

export default Header
