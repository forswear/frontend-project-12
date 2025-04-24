import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { initI18n } from './i18n'
import App from './components/App'
import store from './slices'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'

const initializeApp = async () => {
  await initI18n()

  const rootElement = document.getElementById('root')
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <Provider store={store}>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </StrictMode>
  )
}

initializeApp().catch((error) => {
  console.error('Application initialization failed:', error)
})
