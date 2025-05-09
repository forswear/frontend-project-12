import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import RemovableChannel from './channels/RemovableChannel.jsx'
import UnremovableChannel from './channels/UnremovableChannel.jsx'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { openModal } from '../slices/modalSlice'
import AddChannelModal from '../modals/AddChannelModal'

const ChannelList = ({ channels, activeChannel, onChannelClick }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const activeChannelRef = useRef(null)
  const { isModalOpen, modalType } = useSelector((state) => state.modal)

  useEffect(() => {
    if (activeChannelRef.current) {
      activeChannelRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [activeChannel])

  const handleAddChannel = () => {
    dispatch(openModal({ type: 'addChannel' }))
  }

  return (
    <>
      {channels.length ? (
        <div className="d-flex flex-column p-0" style={{ height: '91vh' }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">{t('channels')}</h4>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={handleAddChannel}
            >
              +
            </Button>
          </div>
          <ListGroup
            style={{ flex: '1 1 auto', overflowY: 'auto', minHeight: '0' }}
          >
            {channels.map((channel) => (
              <ListGroup.Item
                key={channel.id}
                ref={activeChannel?.id === channel.id ? activeChannelRef : null}
                active={channel.id === activeChannel?.id}
                className="p-0 border-0"
                action
              >
                {channel.removable ? (
                  <RemovableChannel
                    channel={channel}
                    isActive={channel.id === activeChannel?.id}
                    onClick={() => onChannelClick(channel)}
                  />
                ) : (
                  <UnremovableChannel
                    channel={channel}
                    isActive={channel.id === activeChannel?.id}
                    onClick={() => onChannelClick(channel)}
                  />
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      ) : (
        <p>{t('no_channels')}</p>
      )}
      {modalType === 'addChannel' && (
        <AddChannelModal
          showModal={isModalOpen}
          setActiveChannel={onChannelClick}
        />
      )}
    </>
  )
}

export default ChannelList
