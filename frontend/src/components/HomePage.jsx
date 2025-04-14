import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addChannels } from '../slices/channelsSlice.js'
import { userLogOut } from '../slices/authSlice.js'
import ChannelList from './channelList.jsx'
import ChatWindow from './ChatWindow.jsx'

const getChannels = async (userToken) => {
  try {
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    })
    const channels = response.data
    return channels
  } catch (err) {
    console.log(err)
    throw err
  }
}

const HomePage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const localToken = localStorage.getItem('token')
  const channels = useSelector((state) => state.channels.channels)
  const [activeChannel, setActiveChannel] = useState(null)

  useEffect(() => {
    if (!localToken) {
      navigate('/login')
    } else {
      const fetchChannels = async () => {
        try {
          const channels = await getChannels(localToken)
          dispatch(addChannels(channels))
          setActiveChannel(channels[0])
        } catch (error) {
          console.log(error)
        }
      }
      fetchChannels()
    }
  }, [localToken, navigate, dispatch])

  const handleLogout = () => {
    dispatch(userLogOut())
    navigate('/login')
  }

  return (
    <div className="vh-100 d-flex flex-column">
      <header className="bg-light border-bottom p-2">
        <button
          className="btn btn-outline-danger float-end"
          onClick={handleLogout}
        >
          Выйти
        </button>
      </header>
      <main className="flex-grow-1 d-flex">
        <aside
          className="bg-light p-3 border-end flex-shrink-0"
          style={{ width: '250px' }}
        >
          <ChannelList
            channels={channels}
            activeChannel={activeChannel}
            onChannelClick={setActiveChannel}
          />
        </aside>
        <section className="d-flex flex-column flex-grow-1">
          {activeChannel ? (
            <ChatWindow activeChannel={activeChannel} />
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <p>Выберите канал</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default HomePage
