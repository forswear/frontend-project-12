import { Modal, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import leoProfanity from 'leo-profanity'

const ModalNewChat = ({ showModal, setShowModal, channels }) => {
  const { t } = useTranslation()
  const [disabled, setDisabled] = useState(false)
  const dispatch = useDispatch()

  const validationSchema = yup.object({
    newChannelName: yup
      .string()
      .required(t('required_field'))
      .min(3, t('min_max_length', { min: 3, max: 20 }))
      .max(20, t('min_max_length', { min: 3, max: 20 }))
      .test('unique-channel', t('required_field'), (value) => {
        return !channels.some((channel) => channel.name === value.trim())
      })
      .test('profanity-check', t('profanity_not_allowed'), (value) => {
        return !leoProfanity.check(value.trim())
      }),
  })

  const formik = useFormik({
    initialValues: { newChannelName: '' },
    validationSchema,
    onSubmit: async (values) => {
      setDisabled(true)
      const token = localStorage.getItem('token')

      // Фильтрация нецензурных слов в названии канала
      const filteredName = leoProfanity.clean(values.newChannelName.trim())

      try {
        await axios.post(
          '/api/v1/channels',
          { name: filteredName },
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
        <Modal.Title>{t('add_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="newChannelName">
            <Form.Control
              ref={inputRef}
              id="newChannelName"
              type="text"
              name="newChannelName"
              placeholder={t('channel_name')}
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
              {t('cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={disabled}>
              {t('submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalNewChat
