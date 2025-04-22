import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { initI18n } from './i18n'
import App from './components/App'
import store from './slices'
import { initializeSocket } from './socket'
import { addNewChannel } from './slices/channelsSlice'
import { addNewMessage } from './slices/messagesSlice'
import { removeChannel } from './slices/channelsSlice'
import 'bootstrap/dist/css/bootstrap.min.css'

const initializeApp = async () => {
  await initI18n()

  const rootElement = document.getElementById('root')
  const root = createRoot(rootElement)

  const token = store.getState()?.auth?.user?.token

  if (token) {
    initializeSocket(token)
  }

  window.addEventListener('newChannel', (event) => {
    const payload = event.detail
    store.dispatch(addNewChannel(payload))
  })

  window.addEventListener('newMessage', (event) => {
    const payload = event.detail
    store.dispatch(addNewMessage(payload))
  })

  window.addEventListener('removeChannel', (event) => {
    const payload = event.detail
    store.dispatch(removeChannel(payload))
  })

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>
  )
}

initializeApp().catch((error) => {
  console.error('Application initialization failed:', error)
})
