import { Modal, Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { channelNameValidationSchema } from '../utils/yupSchemas'

const EditChannelModal = ({ show, onHide, onSave }) => {
  const { t } = useTranslation()
  const [newName, setNewName] = useState('')

  const handleSubmit = () => {
    try {
      const validatedName = channelNameValidationSchema.validateSync(newName)
      onSave(validatedName)
      onHide()
    } catch (validationError) {
      alert(`Неверное имя канала: ${validationError.message}`)
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('edit_channel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="editChannelName">
            <Form.Label>{t('Переименовать канал')}</Form.Label>
            <Form.Control
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('cancel')}
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {t('Отправить')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditChannelModal
