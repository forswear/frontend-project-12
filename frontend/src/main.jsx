import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './components/App.jsx'
import store from './slices/index.js'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import rollbarConfig from './rollbar.config.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
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
              theme="light"
            />
            <App />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  </StrictMode>
)
