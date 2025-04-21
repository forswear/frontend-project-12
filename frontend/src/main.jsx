// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { initI18n, i18nInstance } from './i18n'
import App from './components/App'
import store from './slices'
import { I18nextProvider } from 'react-i18next'
import 'bootstrap/dist/css/bootstrap.min.css'

const initializeApp = async () => {
  await initI18n()

  const rootElement = document.getElementById('root')
  const root = createRoot(rootElement)

  root.render(
    <StrictMode>
      <I18nextProvider i18n={i18nInstance}>
        <Provider store={store}>
          <App />
        </Provider>
      </I18nextProvider>
    </StrictMode>
  )
}

initializeApp().catch((error) => {
  console.error('Application initialization failed:', error)
})
