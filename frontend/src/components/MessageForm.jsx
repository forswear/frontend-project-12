import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'

const MessageForm = () => {
  const formik = useFormik({
    initialValues: { message: '' },
  })

  return (
    <Form className="p-3 border-top">
      <Form.Group className="d-flex">
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="Сообщение..."
          style={{ resize: 'none', flexGrow: 1 }}
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
        />
        <Button variant="primary" className="ms-2" type="submit">
          Отправить
        </Button>
      </Form.Group>
    </Form>
  )
}

export default MessageForm
