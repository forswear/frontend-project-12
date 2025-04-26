import { Button, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { getSocket } from '../../socket'
import { API_BASE_URL } from '../../api'
import EditChannelModal from '../../modals/EditChannelModal'
import RemoveChannelModal from '../../modals/RemoveChannelModal'
import React, { useState } from 'react'
import leoProfanity from 'leo-profanity'
import { toast } from 'react-toastify'

const RemovableChannel = ({ channel, isActive, onClick }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const localToken = useSelector((state) => state.auth.user.token)
  const socket = getSocket()
  const [showEditModal, setShowEditModal] = useState(false)
  const [showRemoveModal, setShowRemoveModal] = useState(false)
  const displayName = leoProfanity.clean(channel.name)

  const handleRenameChannel = () => {
    setShowEditModal(true)
  }

  const handleDeleteChannel = () => {
    setShowRemoveModal(true)
  }

  const saveEditedChannel = async (newName) => {
    try {
      const filteredName = leoProfanity.clean(newName)
      const authHeader = { headers: { Authorization: `Bearer ${localToken}` } }

      await axios.put(
        `${API_BASE_URL}channels/${channel.id}`,
        { name: filteredName },
        authHeader
      )

      dispatch({
        type: 'channels/renameChannel',
        payload: { id: channel.id, name: filteredName },
      })

      socket?.emit('renameChannel', {
        channelId: channel.id,
        name: filteredName,
      })

      toast.success(t('channel_renamed'))
      setShowEditModal(false)
    } catch (err) {
      console.error(err)
      toast.error(t('error_renaming_channel'))
    }
  }

  const confirmRemoveChannel = async () => {
    const channelId = channel.id
    const authHeader = { headers: { Authorization: `Bearer ${localToken}` } }
    try {
      await axios.delete(`${API_BASE_URL}channels/${channelId}`, authHeader)
      dispatch({
        type: 'channels/removeChannel',
        payload: { id: channel.id },
      })
      socket?.emit('removeChannel', { channelId })
    } catch (err) {
      console.error(err)
      toast.error(t('error_deleting_channel'))
    }
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
          #{displayName}
        </Button>
        <Dropdown align="end" drop="down" className="rounded-0">
          <Dropdown.Toggle
            variant={isActive ? 'primary' : 'light'}
            className={`rounded-0 border-start-0 ${
              isActive ? 'text-white' : ''
            }`}
          >
            <span className="visually-hidden">{t('channel_management')}</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handleDeleteChannel}>
              {t('delete_channel')}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleRenameChannel}>
              {t('rename_channel')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <RemoveChannelModal
        show={showRemoveModal}
        onHide={() => setShowRemoveModal(false)}
        onConfirm={confirmRemoveChannel}
        channelId={channel.id}
      />
      <EditChannelModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        channel={{ ...channel, name: displayName }}
        onSave={saveEditedChannel}
      />
    </>
  )
}

export default RemovableChannel
