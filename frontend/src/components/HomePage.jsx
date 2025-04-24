import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Header from './Header'
import ChannelsList from './ChannelsList'
import ChatWindow from './ChatWindow'
import { addChannels } from '../slices/channelsSlice'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const getChannels = async (userToken) => {
  const response = await axios.get('/api/v1/channels', {
    headers: { Authorization: `Bearer ${userToken}` },
  })
  return response.data
}

const HomePage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.auth.user.token)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const channels = useSelector((state) => state.channels.channels)
  const [activeChannel, setActiveChannel] = useState(null)

  useEffect(() => {
    if (!isAuthenticated) {
      window.location.href = '/login'
      return
    }

    const fetchChannels = async () => {
      try {
        const channelsData = await getChannels(token)
        dispatch(addChannels(channelsData))
        setActiveChannel(channelsData[0])
      } catch (error) {
        console.error(error)
        if (error.response) {
          toast.error(t('error_loading_channels'))
        } else if (error.request) {
          toast.error(t('network_error'))
        } else {
          toast.error(t('unknown_error'))
        }
      }
    }

    fetchChannels()
  }, [dispatch, isAuthenticated, token, t])

  return (
    <Container fluid className="vh-100 d-flex flex-column p-0 overflow-hidden">
      <Header />
      <Row className="flex-grow-1 m-0">
        <Col md={3} className="bg-light p-3 border-end h-100 overflow-hidden">
          <ChannelsList
            channels={channels}
            activeChannel={activeChannel}
            onChannelClick={setActiveChannel}
          />
        </Col>
        <Col md={9} className="d-flex flex-column p-0 h-100 overflow-hidden">
          <ChatWindow activeChannel={activeChannel} />
        </Col>
      </Row>
    </Container>
  )
}

export default HomePage
