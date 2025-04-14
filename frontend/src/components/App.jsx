import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './LoginPage.jsx'
import HomePage from './HomePage.jsx'
import NotFoundPage from './NotFoundPage.jsx' // Добавляем страницу 404

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} /> {/* Страница 404 */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
