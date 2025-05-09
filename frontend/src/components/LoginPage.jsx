import { Form, Button, Container, Alert, Navbar } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { userLogIn } from '../slices/authSlice.js'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { API_BASE_URL } from '../api'
import { useFormik } from 'formik'

const LoginPage = () => {
  const { t } = useTranslation()
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    onSubmit: async (values) => {
      setError(null)
      try {
        const response = await axios.post(`${API_BASE_URL}login`, values)
        const { token, username } = response.data
        dispatch(userLogIn({ username, token }))
        navigate('/')
      } catch (error) {
        console.error(
          'Ошибка при входе:',
          error.response?.data || error.message
        )
        setError(t('user_already_exists'))
      }
    },
  })

  return (
    <div className="vh-100 d-flex flex-column">
      <Navbar bg="light" variant="light" className="border-bottom p-2">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Hexlet Chat
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ flex: 1 }}
      >
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <h1 className="text-center mb-4">{t('login_title')}</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>{t('login_username')}</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder={t('login_username')}
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={!!formik.errors.username}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>{t('password')}</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder={t('password')}
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
              {t('login_button')}
            </Button>
            <div className="text-center">
              {t('no_account')}{' '}
              <Link to="/signup">{t('registration_link')}</Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export default LoginPage
