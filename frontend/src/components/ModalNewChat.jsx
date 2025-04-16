import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

const ModalNewChat = ({ showModal, setShowModal, channels }) => {
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()

  const validationSchema = yup.object({
    newChannelName: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .test('unique-channel', 'Должно быть уникальным', (value) => {
        return !channels.some((channel) => channel.name === value.trim())
      }),
  })

  const formik = useFormik({
    initialValues: { newChannelName: '' },
    validationSchema,
    onSubmit: async (values) => {
      setDisabled(true)
      const token = localStorage.getItem('token')
      try {
        await axios.post(
          '/api/v1/channels',
          { name: values.newChannelName },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      } catch (err) {
        console.error(err)
      } finally {
        formik.resetForm()
        setDisabled(false)
        setShowModal(false)
      }
    },
  })

  const inputRef = useRef(null)

  useEffect(() => {
    if (showModal) {
      inputRef.current.focus()
    }
  }, [showModal])

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="newChannelName">
            <Form.Control
              ref={inputRef}
              id="newChannelName"
              type="text"
              name="newChannelName"
              onChange={formik.handleChange}
              value={formik.values.newChannelName}
              isInvalid={!!formik.errors.newChannelName}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.newChannelName}
            </Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Отменить
            </Button>
            <Button variant="primary" type="submit" disabled={disabled}>
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalNewChat
