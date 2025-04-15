import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { userLogOut } from '../slices/authSlice.js'

const Header = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(userLogOut())
  }

  return (
    <div className="bg-light border-bottom p-2">
      <Button variant="primary" onClick={handleLogout} className="float-end">
        Выйти
      </Button>
    </div>
  )
}

export default Header
