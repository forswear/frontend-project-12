import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { initI18n } from './i18n'
import App from './components/App'
import store from './slices'
import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css'
import Rollbar from 'rollbar'
import leoProfanity from 'leo-profanity'

const rollbar = new Rollbar({
  accessToken: 'db2977d78de306f3d8d17b9137c1f4bf',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const initializeApp = async () => {
  try {
    await initI18n()

    leoProfanity.add(leoProfanity.getDictionary('en'))
    leoProfanity.add(leoProfanity.getDictionary('ru'))

    window.Rollbar = rollbar

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
  } catch (error) {
    rollbar.error('Failed to initialize app', error)
    console.error('Application initialization failed:', error)
  }
}

initializeApp()
