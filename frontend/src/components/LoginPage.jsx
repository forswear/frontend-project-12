import { useFormik } from 'formik'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { userLogIn } from '../slices/authSlice.js'
import React, { useState } from 'react'

const LoginPage = () => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setError(null)
      try {
        const response = await axios.post('/api/v1/login', values)
        const { token, username } = response.data
        dispatch(userLogIn({ username, token }))
        navigate('/')
      } catch (error) {
        setError('Неверные имя пользователя или пароль')
      }
    },
  })

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h1 className="text-center mb-4">Войти</h1>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder="Имя пользователя"
            onChange={formik.handleChange}
            value={formik.values.username}
            isInvalid={!!formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={formik.handleChange}
            value={formik.values.password}
            isInvalid={!!formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button className="w-100 mb-3" variant="primary" type="submit">
          Войти
        </Button>
        <div className="text-center">
          Нет аккаунта? <Link to="/signup">Регистрация</Link>
        </div>
      </Form>
    </Container>
  )
}

export default LoginPage
