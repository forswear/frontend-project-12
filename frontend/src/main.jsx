// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { initI18n } from './i18n'
import App from './components/App'
import store from './slices'
import { initializeSocket } from './socket' // Добавляем импорт сокета
import { addNewChannel } from './slices/channelsSlice'
import { addNewMessage } from './slices/messagesSlice'
import { removeChannel } from './slices/channelsSlice' // Добавили импортируемый редюсер удаления канала
import 'bootstrap/dist/css/bootstrap.min.css'

const initializeApp = async () => {
  await initI18n() // Инициализация интернационализации

  const rootElement = document.getElementById('root')
  const root = createRoot(rootElement)

  const token = store.getState()?.auth?.user?.token // Получаем токен из состояния

  if (token) {
    initializeSocket(token) // Создаем сокет при наличии токена
  }

  // Регистрируем слушатели глобальных событий
  window.addEventListener('newChannel', (event) => {
    const payload = event.detail
    store.dispatch(addNewChannel(payload)) // Добавляем новый канал
  })

  window.addEventListener('newMessage', (event) => {
    const payload = event.detail
    store.dispatch(addNewMessage(payload)) // Добавляем новое сообщение
  })

  window.addEventListener('removeChannel', (event) => {
    const payload = event.detail
    store.dispatch(removeChannel(payload)) // Удаляем канал
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
