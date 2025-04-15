import { useFormik } from 'formik'
import * as yup from 'yup'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { userLogIn } from '../slices/authSlice.js'

const registrationSchema = yup.object({
  username: yup
    .string()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup
    .string()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .required('Подтвердите пароль')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
})

const SignupPage = () => {
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { username: '', password: '', confirmPassword: '' },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      setError(null)
      try {
        const response = await axios.post('/api/v1/signup', {
          username: values.username,
          password: values.password,
        })
        const { username, token } = response.data
        dispatch(userLogIn({ username, token }))
        navigate('/')
      } catch (error) {
        setError('Такой пользователь уже существует')
      }
    },
  })

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h1 className="text-center mb-4">Регистрация</h1>
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
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Подтвердите пароль</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Подтвердите пароль"
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            isInvalid={!!formik.errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button className="w-100" variant="primary" type="submit">
          Зарегистрироваться
        </Button>
      </Form>
    </Container>
  )
}

export default SignupPage
