import { Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { initializeSocket } from '../../socket'
import { API_BASE_URL } from '../../api'
import EditChannelModal from '../../modals/EditChannelModal'
import RemoveChannelModal from '../../modals/RemoveChannelModal'
import React, { useState } from 'react'

const RemovableChannel = ({ channel, isActive, onClick }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const localToken = useSelector((state) => state.auth.user.token)
  const socket = initializeSocket()

  const [showEditModal, setShowEditModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)

  const handleRenameChannel = () => {
    setShowEditModal(true)
  }

  const handleDeleteChannel = () => {
    setShowRemoveModal(true)
  }

  const saveEditedChannel = (newName) => {
    const channelId = channel.id
    const authHeader = { headers: { Authorization: `Bearer ${localToken}` } }
    axios
      .put(
        `${API_BASE_URL}channels/${channelId}`,
        { name: newName },
        authHeader
      )
      .then(() => {
        dispatch({
          type: 'channels/renameChannel',
          payload: { id: channel.id, name: newName },
        })
        toast.success(t('channel_renamed_successfully'))
      })
      .catch((err) => {
        console.error(err)
        toast.error(t('error_renaming_channel'))
      })
  }

  const confirmRemoveChannel = () => {
    const channelId = channel.id
    const authHeader = { headers: { Authorization: `Bearer ${localToken}` } }
    axios
      .delete(`${API_BASE_URL}channels/${channelId}`, authHeader)
      .then(() => {
        dispatch({
          type: 'channels/removeChannel',
          payload: { id: channel.id },
        })
        socket.emit('removeChannel', { channelId })
        toast.success(t('channel_deleted_successfully'))
      })
      .catch((err) => {
        console.error(err)
        toast.error(t('error_deleting_channel'))
      })
  }

  return (
    <>
      <div className="d-flex">
        <Button
          variant={isActive ? 'primary' : 'light'}
          onClick={onClick}
          className={`text-start flex-grow-1 rounded-0 border-end-0 ${
            isActive ? 'text-white' : ''
          }`}
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          #{channel.name}
        </Button>
        <Dropdown align="end" drop="down" className="rounded-0">
          <Dropdown.Toggle
            variant={isActive ? 'primary' : 'light'}
            className={`rounded-0 border-start-0 ${
              isActive ? 'text-white' : ''
            }`}
          />
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleRenameChannel}>
              {t('rename_channel')}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDeleteChannel}>
              {t('delete_channel')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <EditChannelModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        channel={channel}
        onSave={saveEditedChannel}
      />
      <RemoveChannelModal
        show={showRemoveModal}
        onHide={() => setShowRemoveModal(false)}
        onConfirm={confirmRemoveChannel}
      />
    </>
  )
}

export default RemovableChannel
