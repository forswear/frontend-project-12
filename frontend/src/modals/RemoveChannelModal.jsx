import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const RemoveChannelModal = ({ show, onHide, onConfirm }) => {
  const { t } = useTranslation()

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Удалить канал')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('Уверены?')}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {t('cancel')}
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {t('Удалить')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default RemoveChannelModal
