import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import LoginPage from './LoginPage.jsx'
import HomePage from './HomePage.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
