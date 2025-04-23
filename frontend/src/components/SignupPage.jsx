import { Form, Button, Container, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { API_BASE_URL } from '../api'
import { Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { userLogIn } from '../slices/authSlice.js'
import React from 'react'

const SignupPage = () => {
  const { t } = useTranslation()
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const validationSchema = yup.object({
    username: yup
      .string()
      .required(t('required_field'))
      .min(3, t('min_max_length', { min: 3, max: 20 }))
      .max(20, t('min_max_length', { min: 3, max: 20 })),
    password: yup
      .string()
      .required(t('required_field'))
      .min(6, t('min_length', { min: 6 })),
    confirmPassword: yup
      .string()
      .required(t('required_field'))
      .oneOf([yup.ref('password')], t('password_mismatch')),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null)
      try {
        const response = await axios.post(`${API_BASE_URL}signup`, {
          username: values.username,
          password: values.password,
        })

        const { token, username } = response.data
        dispatch(userLogIn({ username, token }))

        navigate('/')
      } catch (_error) {
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
          <h1 className="text-center mb-4">{t('signup_title')}</h1>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>{t('signup_username')}</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder={t('signup_username')}
                onChange={formik.handleChange}
                value={formik.values.username}
                isInvalid={formik.touched.username && !!formik.errors.username}
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
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>{t('confirm_password')}</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder={t('confirm_password')}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                isInvalid={
                  formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword
                }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}

            <Button className="w-100 mb-3" variant="primary" type="submit">
              {t('signup_button')}
            </Button>

            <div className="text-center">
              {t('have_account')} <Link to="/login">{t('login_link')}</Link>
            </div>
          </Form>
        </div>
      </Container>
    </div>
  )
}

export default SignupPage
